"use client";

import React from "react";
import { SelectionArea, SelectionEvent } from "@viselect/react";
import { useRouter } from "next/navigation";
import copy from "copy-to-clipboard";
import { SnippetsIcon } from "../components/Icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { Toast, ToastTitle } from "../components/Toast";
import { ScrollArea } from "@/components/scroll-area";
import { Button } from "@/components/button";
import { isTouchDevice } from "../utils/isTouchDevice";
import { getRaycastFlavor, getIsWindows } from "@/app/RaycastFlavor";
import styles from "../[[...slug]]/snippets.module.css";
import { ChevronDownIcon, CopyClipboardIcon, DownloadIcon, PlusCircleIcon } from "@raycast/icons";
import { extractSnippets } from "../utils/extractSnippets";
import { Snippet } from "../snippets";
import { ButtonGroup } from "@/components/button-group";
import { InfoDialog } from "../components/InfoDialog";
import { Kbd, Kbds } from "@/components/kbd";

export function Shared({ snippets }: { snippets: Snippet[] }) {
  const router = useRouter();

  const [copied, setCopied] = React.useState(false);

  const [actionsOpen, setActionsOpen] = React.useState(false);

  const [selectedSnippets, setSelectedSnippets] = React.useState([...snippets]);
  const isTouch = React.useMemo(() => (typeof window !== "undefined" ? isTouchDevice() : false), []);

  let gridCols = 1;
  switch (snippets.length) {
    case 1:
    case 2:
      gridCols = 2;
      break;
    case 3:
      gridCols = 3;
      break;
    case 4:
    case 5:
    case 6:
      gridCols = 4;
      break;
    default:
      gridCols = 4;
      break;
  }

  const categories = [
    {
      name: `${snippets.length} snippet${snippets.length > 1 ? "s" : ""} shared with you`,
      gridCols,
      isTemplate: true,
      isShared: true,
      snippets: snippets,
      slug: "/shared",
      icon: SnippetsIcon,
    },
  ];

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelectedSnippets([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedSnippets = extractSnippets(added, categories);
    const removedSnippets = extractSnippets(removed, categories);

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
        const keyword = snippet.keyword;
        return JSON.stringify({ name, text, keyword });
      })
      .join(",")}]`;
  }, [selectedSnippets]);

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
    setCopied(true);
  }, [makeSnippetImportData]);

  const handleAddToRaycast = React.useCallback(async () => {
    // For mobile, always use the standard 'raycast' scheme since iOS apps
    // are typically registered for 'raycast://' not 'raycastinternal://'
    if (isTouch) {
      const queryString = selectedSnippets
        .map((snippet) => {
          const { name, text, type } = snippet;
          const keyword = snippet.keyword;
          return `snippet=${encodeURIComponent(JSON.stringify({ name, text, keyword, type }))}`;
        })
        .join("&");
      const url = `raycast://snippets/import?${queryString}`;
      window.location.href = url;
    } else {
      const raycastProtocol = await getRaycastFlavor();
      const isWindows = await getIsWindows();

      if (isWindows) {
        const snippetsData = selectedSnippets.map((snippet) => {
          const { name, text, keyword, type } = snippet;
          return { name, text, keyword, type };
        });
        const context = encodeURIComponent(JSON.stringify(snippetsData));
        router.replace(`${raycastProtocol}://extensions/raycast/snippets/import-snippets?context=${context}`);
      } else {
        const queryString = selectedSnippets
          .map((snippet) => {
            const { name, text, type } = snippet;
            const keyword = snippet.keyword;
            return `snippet=${encodeURIComponent(JSON.stringify({ name, text, keyword, type }))}`;
          })
          .join("&");
        router.replace(`${raycastProtocol}://snippets/import?${queryString}`);
      }
    }
  }, [router, selectedSnippets, isTouch]);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, altKey } = event;

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

      if (key === "a" && metaKey) {
        event.preventDefault();
        setSelectedSnippets([...snippets]);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [snippets, setActionsOpen, selectedSnippets, handleCopyData, handleDownload, handleAddToRaycast]);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  if (snippets.length === 0) {
    return;
  }

  return (
    <div>
      <div className="h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10">
        <div className={styles.navControls}>
          <div className={styles.hiddenOnMobile}>
            <InfoDialog />
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
                <DropdownMenuContent>
                  <DropdownMenuItem disabled={selectedSnippets.length === 0} onSelect={() => handleDownload()}>
                    <DownloadIcon /> Download JSON
                    <Kbds>
                      <Kbd>⌘</Kbd>
                      <Kbd>D</Kbd>
                    </Kbds>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={selectedSnippets.length === 0} onSelect={() => handleCopyData()}>
                    <CopyClipboardIcon /> Copy JSON{" "}
                    <Kbds>
                      <Kbd>⌘</Kbd>
                      <Kbd>⌥</Kbd>
                      <Kbd>C</Kbd>
                    </Kbds>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <Toast open={copied} onOpenChange={setCopied}>
        <ToastTitle className={styles.toastTitle}>
          <CopyClipboardIcon /> Copied to clipboard
        </ToastTitle>
      </Toast>

      <div>
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
              {categories.map((snippetGroup) => {
                return (
                  <div key={snippetGroup.name} data-section-slug={snippetGroup.slug} style={{ outline: "none" }}>
                    <h2 className={styles.subtitle}>
                      <snippetGroup.icon /> {snippetGroup.name}
                    </h2>
                    <div className={styles.snippets} data-grid={snippetGroup.gridCols}>
                      {snippetGroup.snippets.map((snippet, index) => {
                        const keyword = snippet.keyword;

                        return (
                          <div
                            className={`${styles.item} selectable`}
                            key={snippet.id}
                            data-selected={selectedSnippets.some(
                              (selectedSnippet) => selectedSnippet?.id === snippet.id,
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

      {/* Floating Action Bar for Mobile */}
      {isTouch && selectedSnippets.length > 0 && (
        <div className={styles.floatingActionBar}>
          <button className={styles.floatingActionButton} data-variant="primary" onClick={handleAddToRaycast}>
            <PlusCircleIcon />
            Add to Raycast
          </button>
          <button className={styles.floatingActionButton} onClick={handleCopyData}>
            <CopyClipboardIcon />
            Copy JSON
          </button>
          <button className={styles.floatingActionButton} onClick={handleDownload}>
            <DownloadIcon />
            Download
          </button>
        </div>
      )}
    </div>
  );
}
