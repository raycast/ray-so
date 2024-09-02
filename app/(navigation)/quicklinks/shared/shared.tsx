"use client";

import { Quicklink } from "../quicklinks";
import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { useRouter } from "next/navigation";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import copy from "copy-to-clipboard";

import { isTouchDevice } from "../utils/isTouchDevice";
import {
  ChevronDownIcon,
  CopyClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MinusCircleIcon,
  PencilIcon,
  PlusCircleIcon,
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
import { Input } from "@/components/input";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { IconComponent } from "../components/IconComponent";
import { cn } from "@/utils/cn";

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
      icon: LinkIcon,
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
                      let domain = "";
                      if (quicklink?.icon?.link || quicklink.link.startsWith("https")) {
                        const url = new URL(quicklink?.icon?.link || quicklink.link);
                        domain = url.hostname.replace("www.", "");
                      }

                      return (
                        <ContextMenu.Root key={quicklink.id}>
                          <ContextMenu.Trigger>
                            <div
                              className={`${styles.item} selectable overflow-hidden group`}
                              data-selected={isSelected}
                              data-key={`${quicklinkGroup.slug}-${index}`}
                            >
                              <div className="w-full flex flex-col space-between h-full">
                                <div className="flex-1">
                                  <div className="flex w-8 h-8 flex-shrink-0 items-center justify-center border border-dashed border-white/20 rounded bg-gradient-radial from-[#171717] to-black text-gray-12 transition-colors duration-150 mb-2 group-hover:text-gray-12">
                                    {quicklink?.icon?.name ? (
                                      <IconComponent icon={quicklink.icon.name} />
                                    ) : (
                                      <img
                                        src={`https://api.ray.so/favicon?url=%5C${domain}&size=64`}
                                        width={16}
                                        className={cn(
                                          `grayscale rounded overflow-hidden contrast-150 group-hover:grayscale-0`,
                                          quicklink?.icon?.invert && "invert",
                                        )}
                                      />
                                    )}
                                  </div>
                                  <p className="text-[15px] text-gray-12 mb-1 font-medium">{quicklink.name}</p>
                                  <p className="text-[13px] text-gray-11">{quicklink.description}</p>
                                </div>
                                <Dialog>
                                  <DialogTrigger
                                    onClick={(event) => event.stopPropagation()}
                                    className="border-t border-gray-4 group-hover:border-[#2A1E48] -mx-4 px-4 -mb-4 h-[28px] flex items-center mt-3 pb-[3px] overflow-hidden text-left w-[calc(100%+32px)] group/footer gap-1 outline-purple rounded-b-xl"
                                  >
                                    <span className="text-xxs whitespace-nowrap overflow-hidden text-ellipsis w-full block group-hover/footer:text-white transition-colors duration-150">
                                      {quicklink.link}
                                    </span>
                                    <span className="opacity-0 group-hover:opacity-100 group-hover/footer:text-white rounded-sm w-4 h-4 flex items-center justify-center shrink-0 -mr-2 transition-colors duration-150">
                                      <PencilIcon className="w-3" />
                                    </span>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogTitle>Edit Quicklink</DialogTitle>
                                    <form className="flex flex-col gap-4">
                                      <label>
                                        <span className="block text-sm text-gray-11 mb-2">Name</span>
                                        <Input
                                          type="text"
                                          defaultValue={quicklink.name}
                                          size="large"
                                          className="w-full"
                                        />
                                      </label>
                                      <label>
                                        <span className="block text-sm text-gray-11 mb-2">Link</span>
                                        <Input
                                          type="text"
                                          defaultValue={quicklink.link}
                                          size="large"
                                          className="w-full"
                                        />
                                      </label>
                                      <label>
                                        <span className="block text-sm text-gray-11 mb-2">Open with</span>
                                        <Input
                                          type="text"
                                          value={quicklink.openWith || "Default"}
                                          size="large"
                                          className="w-full"
                                        />
                                        <p className="text-xs text-gray-10 mt-2">
                                          Type the application name exactly like it shows up in Finder
                                        </p>
                                      </label>
                                      <div className="flex justify-end">
                                        <div className="flex gap-2">
                                          <DialogClose asChild>
                                            <Button variant="secondary">Cancel</Button>
                                          </DialogClose>
                                          <DialogClose asChild>
                                            <Button type="submit" variant="primary">
                                              Save
                                            </Button>
                                          </DialogClose>
                                        </div>
                                      </div>
                                    </form>
                                  </DialogContent>
                                </Dialog>
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
