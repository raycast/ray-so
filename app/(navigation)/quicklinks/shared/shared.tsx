"use client";

import { Quicklink } from "../quicklinks";
import React from "react";
import { nanoid } from "nanoid";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import copy from "copy-to-clipboard";

import { isTouchDevice } from "../utils/isTouchDevice";
import {
  ChevronDownIcon,
  CopyClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  StarsIcon,
} from "@raycast/icons";
import { extractQuicklinks } from "../utils/extractQuicklinks";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";

import styles from "../[[...slug]]/quicklinks.module.css";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { Toast, ToastTitle } from "../components/Toast";
import { NavigationActions } from "@/components/navigation";
import { InfoDialog } from "../components/InfoDialog";
import { Kbd, Kbds } from "@/components/kbd";

export function Shared({ quicklinks }: { quicklinks: Quicklink[] }) {
  const router = useRouter();

  const [copied, setCopied] = React.useState(false);
  const [actionsOpen, setActionsOpen] = React.useState(false);

  const [selectedQuicklinks, setSelectedQuicklinks] = React.useState([...quicklinks]);
  const isTouch = React.useMemo(() => (typeof window !== "undefined" ? isTouchDevice() : false), []);

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    {
      name: `${quicklinks.length} ${quicklinks.length > 1 ? "quicklinks" : "quicklink"} shared with you`,
      isTemplate: true,
      isShared: true,
      quicklinks: quicklinks,
      slug: "/shared",
      icon: StarsIcon,
    },
  ];

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelectedQuicklinks([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedQuicklinks = extractQuicklinks(added, categories);
    const removedQuicklinks = extractQuicklinks(removed, categories);

    setSelectedQuicklinks((prevQuicklinks) => {
      const quicklinks = [...prevQuicklinks];

      addedQuicklinks.forEach((quicklink) => {
        if (!quicklink) {
          return;
        }
        if (quicklinks.find((q) => q.id === quicklink.id)) {
          return;
        }
        quicklinks.push(quicklink);
      });

      removedQuicklinks.forEach((quicklink) => {
        return quicklinks.filter((s) => s?.id !== quicklink?.id);
      });

      return quicklinks;
    });
  };

  const handleDownload = React.useCallback(() => {
    downloadData(selectedQuicklinks);
  }, [selectedQuicklinks]);

  const handleCopyData = React.useCallback(() => {
    copyData(selectedQuicklinks);
    setCopied(true);
  }, [selectedQuicklinks]);

  const handleCopyUrl = React.useCallback(async () => {
    const url = makeUrl(selectedQuicklinks);
    let urlToCopy = url;
    const encodedUrl = encodeURIComponent(urlToCopy);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=quicklinks`).then((res) =>
      res.json(),
    );

    if (response.link) {
      urlToCopy = response.link;
    }

    copy(urlToCopy);
    setCopied(true);
  }, [selectedQuicklinks]);

  const handleAddToRaycast = React.useCallback(
    () => addToRaycast(router, selectedQuicklinks),
    [router, selectedQuicklinks],
  );

  const handleCopyText = React.useCallback((quicklink: Quicklink) => {
    copy(quicklink.link);
    setCopied(true);
  }, []);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, altKey } = event;

      if (key === "k" && metaKey) {
        if (selectedQuicklinks.length === 0) return;
        setActionsOpen((prevOpen) => {
          return !prevOpen;
        });
      }

      if (key === "d" && metaKey) {
        if (selectedQuicklinks.length === 0) return;
        event.preventDefault();
        handleDownload();
      }

      if (key === "Enter" && metaKey) {
        if (selectedQuicklinks.length === 0) return;
        event.preventDefault();
        handleAddToRaycast();
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (keyCode === 67 && metaKey && altKey) {
        if (selectedQuicklinks.length === 0) return;
        event.preventDefault();
        handleCopyData();
        setActionsOpen(false);
      }

      if (key === "a" && metaKey) {
        event.preventDefault();
        setSelectedQuicklinks([...quicklinks]);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [quicklinks, setActionsOpen, selectedQuicklinks, handleCopyData, handleDownload, handleAddToRaycast]);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  if (quicklinks.length === 0) {
    return;
  }

  return (
    <div>
      <NavigationActions>
        <div className="flex gap-2 sm:hidden">
          <Button variant="primary" disabled={selectedQuicklinks.length === 0} onClick={() => handleCopyUrl()}>
            <LinkIcon /> Copy URL to Share
          </Button>
        </div>
        <div className="sm:flex gap-2 hidden">
          <InfoDialog />
          <ButtonGroup>
            <Button variant="primary" disabled={selectedQuicklinks.length === 0} onClick={() => handleAddToRaycast()}>
              <PlusCircleIcon /> Add to Raycast
            </Button>

            <DropdownMenu open={actionsOpen} onOpenChange={setActionsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" disabled={selectedQuicklinks.length === 0} aria-label="Export options">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled={selectedQuicklinks.length === 0} onSelect={() => handleDownload()}>
                  <DownloadIcon /> Download JSON
                  <Kbds>
                    <Kbd>⌘</Kbd>
                    <Kbd>D</Kbd>
                  </Kbds>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedQuicklinks.length === 0} onSelect={() => handleCopyData()}>
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
      </NavigationActions>
      <Toast open={copied} onOpenChange={setCopied}>
        <ToastTitle className={styles.toastTitle}>
          <CopyClipboardIcon /> Copied to clipboard
        </ToastTitle>
      </Toast>
      <div className={styles.container}>
        {isTouch !== null && (
          <SelectionArea
            className="container pt-8"
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
            {categories.map((quicklinkGroup) => {
              return (
                <div key={quicklinkGroup.name} data-section-slug={quicklinkGroup.slug} style={{ outline: "none" }}>
                  <h2 className={styles.subtitle}>
                    <quicklinkGroup.icon /> {quicklinkGroup.name}
                  </h2>
                  <div className={styles.prompts}>
                    {quicklinkGroup.quicklinks.map((quicklink, index) => {
                      const isSelected = selectedQuicklinks.some(
                        (selectedQuicklink) => selectedQuicklink.id === quicklink.id,
                      );

                      return (
                        <ContextMenu.Root key={quicklink.id}>
                          <ContextMenu.Trigger>
                            <div
                              className={`${styles.item} selectable`}
                              key={quicklink.id}
                              data-selected={isSelected}
                              data-key={`${quicklinkGroup.slug}-${index}`}
                            >
                              <div className={styles.prompt}>
                                <span className={styles.name}>{quicklink.name}</span>
                              </div>
                            </div>
                          </ContextMenu.Trigger>
                          <ContextMenu.Portal>
                            <ContextMenu.Content className={styles.contextMenuContent}>
                              <ContextMenu.Item
                                className={styles.contextMenuItem}
                                onSelect={() => {
                                  if (isSelected) {
                                    return setSelectedQuicklinks((prevQuicklinks) =>
                                      prevQuicklinks.filter((prevQuicklink) => prevQuicklink.id !== quicklink.id),
                                    );
                                  }
                                  setSelectedQuicklinks((prevQuicklinks) => [...prevQuicklinks, quicklink]);
                                }}
                              >
                                {isSelected ? <MinusCircleIcon /> : <PlusCircleIcon />}
                                {isSelected ? "Deselect Quicklink" : "Select Quicklink"}
                              </ContextMenu.Item>
                              <ContextMenu.Item
                                className={styles.contextMenuItem}
                                onSelect={() => handleCopyText(quicklink)}
                              >
                                <CopyClipboardIcon /> Copy Quicklink Text{" "}
                              </ContextMenu.Item>
                            </ContextMenu.Content>
                          </ContextMenu.Portal>
                        </ContextMenu.Root>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </SelectionArea>
        )}
      </div>
    </div>
  );
}
