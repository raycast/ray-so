// Adapted from Vlad's work for the WorkOS docs.

import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

interface Config {
  headerHeight: number;
  enabled: boolean;
}

export function useSectionInViewObserver({ headerHeight, enabled = false }: Config) {
  const defaultRootMargin = `-${headerHeight}px 0% -50% 0%`;
  const pathname = usePathname();
  const historyKey = React.useRef("");
  const animationFrame = React.useRef(0);
  const isPageReload = React.useRef(false);

  React.useEffect(() => {
    // Automatic scroll restoration messes up scroll position on load and how browser
    // forward/back buttons work with what we are hand-rolling for the section URLs.
    // We still need to do `window.scrollTo({ top: 0 })` to fully counter it though.
    window.history.scrollRestoration = "manual";

    let sections: NodeListOf<Element>;
    let sectionsInView: IntersectionObserverEntry[] = [];

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      let newEntryInView: IntersectionObserverEntry | undefined;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionsInView = [...sectionsInView.filter((view) => view.target !== entry.target), entry];
        } else {
          sectionsInView = sectionsInView.filter((view) => view.target !== entry.target);
        }
      });

      if (sectionsInView.length < 1) {
        return;
      }

      const fullyInView = sectionsInView.filter((view) => view.intersectionRatio === 1);

      // Sections fully in view get priority if there are any
      if (fullyInView.length > 0) {
        // get the top-most section fully in view (top is closest to zero)
        newEntryInView = fullyInView.reduce((previousCandidate, currentCandidate) =>
          previousCandidate.target.getBoundingClientRect().top > currentCandidate.target.getBoundingClientRect().top
            ? currentCandidate
            : previousCandidate,
        );
      } else {
        // get the section closest to the crossing border (top is closest to half-viewport mark)
        newEntryInView = sectionsInView.reduce((previousCandidate, currentCandidate) =>
          previousCandidate.target.getBoundingClientRect().top < currentCandidate.target.getBoundingClientRect().top
            ? currentCandidate
            : previousCandidate,
        );
      }

      const newSlug = newEntryInView ? (newEntryInView.target as HTMLElement).dataset.sectionSlug : undefined;

      // Avoid setting route if it hasn't changed
      if (newSlug && pathname !== newSlug) {
        const newUrl = newSlug;

        updateHistory(newUrl);
        dispatchEvent(new CustomEvent("sectionInViewChange", { detail: newUrl }));
      }
    };

    // Debounce `window.history.replaceState` because Safari may throw
    // a security error for too many history updates and stop accepting updates.
    const updateHistory = debounce(
      (newUrl: string) => {
        const newState = { ...window.history.state, as: newUrl, url: newUrl };
        window.history.replaceState(newState, "", newUrl);
      },
      120,
      {
        leading: true,
        trailing: true,
      },
    );

    const observer = {
      current: new IntersectionObserver(handleIntersect, {
        rootMargin: defaultRootMargin,
        threshold: [0, 1],
      }),
    };

    const adjustScroll = ({ shouldRestore } = { shouldRestore: true }) => {
      const section = document.querySelector<HTMLElement>(`[data-section-slug="${pathname}"]`);

      // Focus the section so AT announces the new content after navigation.
      section?.focus({ preventScroll: true });

      // Get latest state key if this was a page reload, or the current state key otherwise.
      const key = isPageReload.current ? undefined : window.history.state.key;
      const restoredScrollTop = getScrollHistory(key);
      console.log("restoredScrollTop", restoredScrollTop);

      if (shouldRestore && restoredScrollTop) {
        window.scrollTo({ top: 0 });
        window.scrollTo({ top: restoredScrollTop });
        return;
      }

      if (section) {
        // 1. If current section is the first section, this is the final scroll position we want.
        // 2. If not, we still need to reset scroll to top so that native scroll restoration doesn't mess things up.
        window.scrollTo({ top: 0 });

        const firstSection = document.querySelector("[data-section-slug]");

        // We'll do some elaborate calculations to determine where to scroll to depending on the resulting root margin
        if (section !== firstSection) {
          const sectionTop = section.getBoundingClientRect().top;
          const scrollY = Math.floor(window.scrollY);
          const sh = document.documentElement.scrollHeight;
          const ch = document.documentElement.clientHeight;
          const fh = getFooterHeight();

          let remainingScroll =
            (sh * (0.5 * ch - fh) + fh * (fh + scrollY + sectionTop - 0.5 * ch) - 0.5 * ch * (scrollY + sectionTop)) /
            (1.5 * ch - 2 * fh);

          remainingScroll = Math.max(remainingScroll, 0);

          // Is it less than half of the viewport height remaining to scroll?
          // If so, scroll to a place where section top will meet the root margin top
          if (fh + remainingScroll < 0.5 * ch) {
            window.scrollTo({ top: sh - ch - remainingScroll });
          } else {
            // But in most cases, we scroll to the section top minus some padding
            window.scrollTo({ top: sectionTop - 80 });
          }
        }
      }
    };

    // Get the total height of everything below the last section
    const getFooterHeight = () => {
      const sections = document.querySelectorAll("[data-section-slug]");
      const lastSection = sections[sections.length - 1];
      const sectionBottom = lastSection?.getBoundingClientRect().bottom ?? 0;
      const sh = document.documentElement.scrollHeight;
      const scrollY = Math.floor(window.scrollY);
      return sh - scrollY - sectionBottom;
    };

    // We'll check if you are scrolling close to the bottom of the document;
    // if so, gradually lower and collapse the root margin of where intersections are tracked.
    // This makes it so that the bottom-most sections can be reported as currently active. See more:
    // https://www.figma.com/file/P14gbzIrrPdkOqFPQv69i4/Active-Section-in-View?node-id=138%3A2450&t=zgvyG71TV8jiiN1X-1
    const handleScrollOrResize = () => {
      let rootMargin = defaultRootMargin;
      const scrollY = Math.floor(window.scrollY);
      const sh = document.documentElement.scrollHeight;
      const ch = document.documentElement.clientHeight;
      const fh = getFooterHeight();
      const remainingScroll = sh - scrollY - ch;

      // Start collapsing the root margin when 50% of the viewport height remains below the fold
      if (fh + remainingScroll < 0.5 * ch) {
        const speed = (ch - fh) / (0.5 * ch - fh);
        const rootMarginBottom = Math.max(0, fh + remainingScroll);
        const rootMarginBottomTravel = 0.5 * ch - rootMarginBottom;
        const rootMarginTopMin = Math.floor(rootMarginBottomTravel * speed);
        const rootMarginTop = Math.max(rootMarginTopMin, headerHeight);
        rootMargin = `${-1 * rootMarginTop}px 0% ${-1 * rootMarginBottom}px 0%`;
      }

      if (observer.current.rootMargin !== rootMargin) {
        sectionsInView.length = 0;
        observer.current.disconnect();
        observer.current = new IntersectionObserver(handleIntersect, {
          rootMargin,
          threshold: [0, 1],
        });
        sections?.forEach((section) => observer.current.observe(section));
      }
    };

    // const handleRouteChangeComplete = () => {
    //   historyKey.current = window.history.state.key;
    // };

    // const handleBeforeHistoryChange = () => {
    //   setScrollHistory(historyKey.current, window.scrollY);
    // };

    const handleBeforeUnload = () => {
      setScrollHistory(historyKey.current, window.scrollY);
    };

    if (!historyKey.current) {
      // set a different key if session state isn't empty?
      historyKey.current = window.history.state.key;
    }

    const adjustScrollRecursively = () => {
      // Adjust scroll every animation frame until it's cancelled
      animationFrame.current = requestAnimationFrame(() => {
        adjustScroll({ shouldRestore: true });
        adjustScrollRecursively();
      });
    };

    // If the router isn't ready, it's a fully fresh page load.
    // Start adjusting the scroll position if we are not doing that yet.
    if (!animationFrame.current) {
      adjustScrollRecursively();
    }

    const navigationEntry = window.performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    isPageReload.current = navigationEntry?.type === "reload";

    if (enabled) {
      // Cancel the last scheduled scroll adjustment
      cancelAnimationFrame(animationFrame.current);

      // Decide whether we should try to restore the original scroll position or refresh the scroll
      // to the current section coordinates (e.g. when clicking a link that goes to the current URL).
      // const wasRecursive = animationFrame.current !== 0;
      // const shallow = window.history.state.key === historyKey.current;
      // const shouldRestore = wasRecursive || !shallow;

      adjustScroll({ shouldRestore: false });
      sections = document.querySelectorAll("[data-section-slug]");
      sections?.forEach((section) => observer.current.observe(section));

      animationFrame.current = 0;
      isPageReload.current = false;

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("scroll", handleScrollOrResize);
      window.addEventListener("resize", handleScrollOrResize);
    }

    return () => {
      sectionsInView.length = 0;
      observer.current.disconnect();
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [pathname, enabled, headerHeight, defaultRootMargin]);
}

export function useSectionInView() {
  const router = useRouter();
  const pathname = usePathname();
  const [sectionInView, setSectionInView] = React.useState<string>();

  React.useEffect(() => {
    setSectionInView(pathname);

    const handleSectionInViewChange = (event: CustomEvent<string>) => {
      setSectionInView(event.detail);
    };

    addEventListener("sectionInViewChange", handleSectionInViewChange as (event: Event) => void);

    return () => {
      removeEventListener("sectionInViewChange", handleSectionInViewChange as (event: Event) => void);
    };
  }, [router, pathname]);

  return sectionInView;
}

interface ScrollHistoryEntry {
  key: string;
  value: number;
}

// Store scroll restoration history in session storage so it works even when reloading or restoring the tab.
function setScrollHistory(key: string, value: number) {
  const str = window.sessionStorage.getItem("@workos/scroll-restoration");
  const arr: ScrollHistoryEntry[] = str ? JSON.parse(str) : [];
  const index = arr.findIndex((entry) => entry.key === key);

  // Remove item with a matching key
  if (index !== -1) {
    arr.splice(index, 1);
  }

  // Push the new item last into the history stack
  arr.push({ key, value });

  window.sessionStorage.setItem("@workos/scroll-restoration", JSON.stringify(arr));
}

function getScrollHistory(key?: string): number | undefined {
  const str = window.sessionStorage.getItem("@workos/scroll-restoration");
  const arr: ScrollHistoryEntry[] = str ? JSON.parse(str) : [];

  // Return last scroll history value if key isn't supplied
  if (key === undefined) {
    return arr[arr.length - 1]?.value;
  }

  return arr.find((entry) => entry.key === key)?.value;
}
