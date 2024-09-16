import { Quicklink } from "../quicklinks";

export function extractQuicklinks<T>(els: Element[], categories: { slug: string; quicklinks: Quicklink[] }[]) {
  const ids = els.map((v) => v.getAttribute("data-key"));

  const quicklinks = ids
    .map((id) => {
      if (!id) {
        return;
      }
      const allQuicklinks = categories.flatMap((category) => category.quicklinks);
      const quicklink = allQuicklinks.find((quicklink) => quicklink.id === id);
      return quicklink;
    })
    .filter(Boolean);

  return quicklinks;
}
