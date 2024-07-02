"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import { useRouter } from "next/navigation";
import copy from "copy-to-clipboard";
import { Select, SelectItem, SelectContent, SelectItemText, SelectTrigger, SelectValue } from "@/components/select";
import { SnippetsIcon } from "../components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/dropdown-menu";
import { Toast, ToastTitle } from "../components/Toast";
import { ScrollArea } from "../components/ScrollArea";
import { Button } from "@/components/button";
import * as Collapsible from "@radix-ui/react-collapsible";
import { isTouchDevice } from "../utils/isTouchDevice";

import styles from "./snippets.module.css";
import { Instructions } from "../components/Instructions";
import {
  ChevronDownIcon,
  CogIcon,
  CopyClipboardIcon,
  DownloadIcon,
  LinkIcon,
  PlusCircleIcon,
  RaycastLogoNegIcon,
  TrashIcon,
} from "@raycast/icons";
import { extractSnippets } from "../utils/extractSnippets";
import { IconComponent } from "../components/IconComponent";
import { Category, Snippet, snippetGroups } from "../snippets";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";
import { BASE_URL } from "@/utils/common";
import { NavigationActions } from "@/components/navigation";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/dialog";
import { ButtonGroup } from "@/components/button-group";

const raycastProtocolForEnvironments = {
  development: "raycastinternal",
  production: "raycast",
  test: "raycastinternal",
};
const raycastProtocol = raycastProtocolForEnvironments[process.env.NODE_ENV];

const modifiers = ["!", ":", "_", "__", "-", "@", "@@", "$", ";", ";;", "/", "//", "none"] as const;

type Modifiers = (typeof modifiers)[number];

export function getStaticPaths() {
  const paths = snippetGroups.map((snippet) => ({
    params: { slug: [snippet.slug.replace("/", "")] },
  }));

  return {
    paths: [
      ...paths,
      {
        params: { slug: [] },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: { snippet: {} },
  };
}

export default function Snippets() {
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });

  const router = useRouter();

  const [selectedSnippets, setSelectedSnippets] = React.useState<Snippet[]>([]);

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const [startMod, setStartMod] = React.useState<Modifiers>("!");
  const [endMod, setEndMod] = React.useState<Modifiers>("none");
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState<boolean>();

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!isTouch && !event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelectedSnippets([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedSnippets = extractSnippets(added, snippetGroups);
    const removedSnippets = extractSnippets(removed, snippetGroups);

    setSelectedSnippets((prevSnippets) => {
      const snippets = [...prevSnippets];

      addedSnippets.forEach((snippet) => {
        if (!snippet) {
          return;
        }
        if (snippets.find((p) => p.id === snippet.id)) {
          return;
        }
        snippets.push(snippet);
      });

      removedSnippets.forEach((snippet) => {
        return snippets.filter((s) => s?.id !== snippet?.id);
      });

      return snippets;
    });
  };

  const makeSnippetImportData = React.useCallback(() => {
    return `[${selectedSnippets
      .map((snippet) => {
        const { name, text } = snippet;
        const keyword =
          snippet.type === "spelling"
            ? snippet.keyword
            : addModifiersToKeyword({
                keyword: snippet.keyword,
                start: startMod,
                end: endMod,
              });
        return JSON.stringify({ name, text, keyword });
      })
      .join(",")}]`;
  }, [selectedSnippets, startMod, endMod]);

  const makeQueryString = React.useCallback(() => {
    const queryString = selectedSnippets
      .map((snippet) => {
        const { name, text, type } = snippet;
        const keyword =
          snippet.type === "spelling"
            ? snippet.keyword
            : addModifiersToKeyword({
                keyword: snippet.keyword,
                start: startMod,
                end: endMod,
              });
        return `snippet=${encodeURIComponent(JSON.stringify({ name, text, keyword, type }))}`;
      })
      .join("&");
    return queryString;
  }, [selectedSnippets, startMod, endMod]);

  const handleDownload = React.useCallback(() => {
    const encodedSnippetsData = encodeURIComponent(makeSnippetImportData());
    const jsonString = `data:text/json;chatset=utf-8,${encodedSnippetsData}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "snippets.json";
    link.click();
  }, [makeSnippetImportData]);

  const handleCopyData = React.useCallback(() => {
    copy(makeSnippetImportData());
    setToastMessage("Copied to clipboard");
    setShowToast(true);
  }, [makeSnippetImportData]);

  const handleCopyUrl = React.useCallback(async () => {
    setToastMessage("Copying URL to clipboard...");
    setShowToast(true);
    const url = `${BASE_URL}/snippets/shared?${makeQueryString()}`;
    let urlToCopy = url;
    const encodedUrl = encodeURIComponent(urlToCopy);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=snippets`).then((res) =>
      res.json()
    );

    if (response.link) {
      urlToCopy = response.link;
    }

    copy(urlToCopy);
    setShowToast(true);
    setToastMessage("Copied URL to clipboard!");
  }, [makeQueryString]);

  const handleAddToRaycast = React.useCallback(
    () => router.replace(`${raycastProtocol}://snippets/import?${makeQueryString()}`),
    [router, makeQueryString]
  );

  React.useEffect(() => {
    setIsTouch(isTouchDevice());
    setEnableViewObserver(true);
  }, [isTouch, setIsTouch]);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, shiftKey, altKey } = event;

      if (key === "k" && metaKey) {
        if (selectedSnippets.length === 0) return;
        setActionsOpen((prevOpen) => {
          return !prevOpen;
        });
      }

      if (key === "d" && metaKey) {
        if (selectedSnippets.length === 0) return;
        event.preventDefault();
        handleDownload();
      }

      if (key === "Enter" && metaKey) {
        if (selectedSnippets.length === 0) return;
        event.preventDefault();
        handleAddToRaycast();
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (keyCode === 67 && metaKey && altKey) {
        if (selectedSnippets.length === 0) return;
        event.preventDefault();
        handleCopyData();
        setActionsOpen(false);
      }

      if (key === "c" && metaKey && shiftKey) {
        event.preventDefault();
        handleCopyUrl();
        setActionsOpen(false);
      }

      if (key === "," && metaKey && shiftKey) {
        event.preventDefault();
        setActionsOpen(false);
        setAboutOpen(false);
        setSettingsOpen((prevOpen) => !prevOpen);
      }

      if (key === "/" && metaKey) {
        event.preventDefault();
        setActionsOpen(false);
        setSettingsOpen(false);
        setAboutOpen((prevOpen) => !prevOpen);
      }

      if (key === "a" && metaKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [
    setActionsOpen,
    setAboutOpen,
    selectedSnippets,
    handleCopyData,
    handleDownload,
    handleCopyUrl,
    handleAddToRaycast,
  ]);

  React.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  return (
    <div>
      <NavigationActions>
        <div className={styles.navControls}>
          {!isTouch ? (
            <>
              <KeyboardShortcuts />
              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <CogIcon /> Configure Modifiers
                  </Button>
                </DialogTrigger>
                <DialogContent size="medium">
                  <DialogTitle>Configure Modifiers</DialogTitle>
                  <DialogDescription>
                    Modifiers are used as prefixes and suffixes for your snippets' keyword. If you wish to customize
                    them, you can do so below.
                  </DialogDescription>
                  <div className={styles.modifierControls}>
                    <span className={styles.modifierInput}>
                      Start Modifier
                      <Select value={startMod} onValueChange={(newValue: Modifiers) => setStartMod(newValue)}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {modifiers.map((mod) => (
                            <SelectItem key={mod} value={mod}>
                              <SelectItemText>{mod}</SelectItemText>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </span>
                    <span className={styles.modifierInput}>
                      End Modifier
                      <Select value={endMod} onValueChange={(newValue: Modifiers) => setEndMod(newValue)}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {modifiers.map((mod) => (
                            <SelectItem key={mod} value={mod}>
                              <SelectItemText>{mod}</SelectItemText>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </span>
                  </div>
                </DialogContent>
              </Dialog>
              <ButtonGroup>
                <Button variant="primary" disabled={selectedSnippets.length === 0} onClick={() => handleAddToRaycast()}>
                  <PlusCircleIcon /> Add to Raycast
                </Button>

                <DropdownMenu open={actionsOpen} onOpenChange={setActionsOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="primary" disabled={selectedSnippets.length === 0} aria-label="Export options">
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled={selectedSnippets.length === 0} onSelect={() => handleDownload()}>
                      <DownloadIcon /> Download JSON
                      <span className={styles.hotkeys}>
                        <kbd>⌘</kbd>
                        <kbd>D</kbd>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={selectedSnippets.length === 0} onSelect={() => handleCopyData()}>
                      <CopyClipboardIcon /> Copy JSON{" "}
                      <span className={styles.hotkeys}>
                        <kbd>⌘</kbd>
                        <kbd>⌥</kbd>
                        <kbd>C</kbd>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={selectedSnippets.length === 0} onSelect={() => handleCopyUrl()}>
                      <LinkIcon /> Copy URL to Share{" "}
                      <span className={styles.hotkeys}>
                        <kbd>⌘</kbd>
                        <kbd>⇧</kbd>
                        <kbd>C</kbd>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </>
          ) : (
            <Button variant="primary" disabled={selectedSnippets.length === 0} onClick={() => handleCopyUrl()}>
              <LinkIcon /> Copy URL to Share
            </Button>
          )}
        </div>
      </NavigationActions>

      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle className={styles.toastTitle}>
          <CopyClipboardIcon /> {toastMessage}
        </ToastTitle>
      </Toast>

      <div className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <ScrollArea>
              <div className={styles.sidebarContent}>
                <div className={styles.sidebarNav}>
                  <p className={styles.sidebarTitle}>Categories</p>

                  {snippetGroups.map((snippetGroup) => (
                    <NavItem key={snippetGroup.slug} snippetGroup={snippetGroup} />
                  ))}
                </div>

                {selectedSnippets.length === 0 && <Instructions />}

                {selectedSnippets.length > 0 && (
                  <div>
                    <p className={styles.sidebarTitle}>Add to Raycast</p>

                    <Collapsible.Root>
                      <Collapsible.Trigger asChild>
                        <button className={styles.summaryTrigger}>
                          {selectedSnippets.length} {selectedSnippets.length > 1 ? "Snippets" : "Snippet"} selected
                          <ChevronDownIcon />
                        </button>
                      </Collapsible.Trigger>

                      <Collapsible.Content className={styles.summaryContent}>
                        {selectedSnippets.map((snippet, index) => (
                          <div key={snippet.name + index} className={styles.summaryItem}>
                            {snippet.name}
                            <button
                              className={styles.summaryItemButton}
                              onClick={() => {
                                setSelectedSnippets(
                                  selectedSnippets.filter((selectedSnippet) => selectedSnippet.id !== snippet.id)
                                );
                              }}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        ))}
                      </Collapsible.Content>
                    </Collapsible.Root>

                    <div className={styles.summaryControls}>
                      <Button onClick={handleAddToRaycast} variant="primary">
                        Add to Raycast
                      </Button>

                      <Button onClick={() => setSelectedSnippets([])}>Clear selected</Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className={styles.container}>
          {isTouch !== null && (
            <SelectionArea
              className="container"
              onStart={onStart}
              onMove={onMove}
              selectables=".selectable"
              features={{
                // Disable support for touch devices
                touch: isTouch ? false : true,
                range: true,
                singleTap: {
                  allow: true,
                  intersect: "native",
                },
              }}
            >
              {snippetGroups.map((snippetGroup) => {
                return (
                  <div
                    key={snippetGroup.name}
                    data-section-slug={`/snippets${snippetGroup.slug}`}
                    style={{
                      outline: "none",
                    }}
                    tabIndex={-1}
                  >
                    <h2 className={styles.subtitle}>
                      <IconComponent icon={snippetGroup.icon} /> {snippetGroup.name}
                    </h2>
                    <div className={styles.snippets} data-grid={snippetGroup.gridCols}>
                      {snippetGroup.snippets.map((snippet, index) => {
                        const keyword =
                          snippet.type === "spelling"
                            ? snippet.keyword
                            : addModifiersToKeyword({
                                keyword: snippet.keyword,
                                start: startMod,
                                end: endMod,
                              });

                        return (
                          <div
                            className={`${styles.item} selectable`}
                            key={snippet.id}
                            data-selected={selectedSnippets.some(
                              (selectedSnippet) => selectedSnippet.id === snippet.id
                            )}
                            data-key={`${snippetGroup.slug}-${index}`}
                          >
                            <div className={styles.snippet}>
                              {snippet.type === "symbol" || snippet.type === "unicode" ? (
                                <span className={styles.text} data-type={snippet.type}>
                                  {snippet.text}
                                </span>
                              ) : (
                                <ScrollArea>
                                  <pre className={styles.template}>{snippet.text}</pre>
                                </ScrollArea>
                              )}
                            </div>
                            <span className={styles.name}>{snippet.name}</span>
                            {snippet.keyword && <span className={styles.keyword}>{keyword}</span>}
                          </div>
                        );
                      })}
                    </div>
                    {snippetGroup.gridCols === 1 && <hr className={styles.divider} />}
                  </div>
                );
              })}
            </SelectionArea>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ snippetGroup }: { snippetGroup: Category }) {
  const activeSection = useSectionInView();

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", `/snippets${snippetGroup.slug}`);
      }}
      className={styles.sidebarNavItem}
      data-active={activeSection === `/snippets${snippetGroup.slug}`}
    >
      {snippetGroup.icon ? <IconComponent icon={snippetGroup.icon} /> : <SnippetsIcon />}

      {snippetGroup.name}
      <span className={styles.badge}>{snippetGroup.snippets.length}</span>
    </a>
  );
}

function addModifiersToKeyword({ keyword, start, end }: { keyword: string; start: Modifiers; end: Modifiers }) {
  if (!keyword) return keyword;
  return `${start === "none" ? "" : start}${keyword}${end === "none" ? "" : end}`;
}
