"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IconName, RaycastLogoNegIcon } from "@raycast/icons";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import { Category, Quicklink, categories } from "../quicklinks";
import { extractQuicklinks } from "../utils/extractQuicklinks";
import { addQuicklinkToRaycast, addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";
import copy from "copy-to-clipboard";
import { isTouchDevice } from "../utils/isTouchDevice";
import styles from "./quicklinks.module.css";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  ChevronDownIcon,
  CopyClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MinusCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  StarsIcon,
  TrashIcon,
} from "@raycast/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { Toast, ToastTitle } from "../components/Toast";
import { ScrollArea } from "../components/ScrollArea";
import { Instructions } from "../components/Instructions";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenu from "@radix-ui/react-context-menu";
import CreativityIcon from "../components/CreativityIcon";
import { NavigationActions } from "@/components/navigation";
import { Kbd, Kbds } from "@/components/kbd";
import { InfoDialog } from "../components/InfoDialog";
import { IconComponent } from "../components/IconComponent";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Input } from "@/components/input";
import { cn } from "@/utils/cn";

export function Quicklinks() {
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });

  const router = useRouter();

  const [selectedQuicklinks, setselectedQuicklinks] = React.useState<Quicklink[]>([]);

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState<boolean>();

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!isTouch && !event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setselectedQuicklinks([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedQuicklinks = extractQuicklinks(added, categories);
    const removedQuicklinks = extractQuicklinks(removed, categories);

    setselectedQuicklinks((prevPrompts) => {
      const prompts = [...prevPrompts];

      addedQuicklinks.forEach((prompt) => {
        if (!prompt) {
          return;
        }
        if (prompts.find((p) => p.id === prompt.id)) {
          return;
        }
        prompts.push(prompt);
      });

      removedQuicklinks.forEach((prompt) => {
        return prompts.filter((s) => s?.id !== prompt?.id);
      });

      return prompts;
    });
  };

  const handleDownload = React.useCallback(() => {
    downloadData(selectedQuicklinks);
  }, [selectedQuicklinks]);

  const handleCopyData = React.useCallback(() => {
    copyData(selectedQuicklinks);
    setToastMessage("Copied to clipboard");
    setShowToast(true);
  }, [selectedQuicklinks]);

  const handleCopyUrl = React.useCallback(async () => {
    setToastMessage("Copying URL to clipboard...");
    setShowToast(true);

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
    setShowToast(true);
    setToastMessage("Copied URL to clipboard!");
  }, [selectedQuicklinks]);

  const handleCopyLink = React.useCallback((quicklink: Quicklink) => {
    copy(quicklink.link);
    setShowToast(true);
    setToastMessage("Copied to clipboard");
  }, []);

  const handleAddToRaycast = React.useCallback(
    () => addToRaycast(router, selectedQuicklinks),
    [router, selectedQuicklinks],
  );

  const handleAddQuicklinkToRaycast = React.useCallback(
    (quicklink: Quicklink) => {
      addQuicklinkToRaycast(router, quicklink);
    },
    [router],
  );

  React.useEffect(() => {
    setIsTouch(isTouchDevice());
    setEnableViewObserver(true);
  }, [isTouch, setIsTouch, setEnableViewObserver]);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, shiftKey, altKey } = event;

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

      if (key === "c" && metaKey && shiftKey) {
        event.preventDefault();
        handleCopyUrl();
        setActionsOpen(false);
      }

      if (key === "a" && metaKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setActionsOpen, selectedQuicklinks, handleCopyData, handleDownload, handleCopyUrl, handleAddToRaycast]);

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
                <DropdownMenuItem disabled={selectedQuicklinks.length === 0} onSelect={() => handleCopyUrl()}>
                  <LinkIcon /> Copy URL to Share{" "}
                  <Kbds>
                    <Kbd>⌘</Kbd>
                    <Kbd>⇧</Kbd>
                    <Kbd>C</Kbd>
                  </Kbds>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
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

                  {categories.map((category) => (
                    <NavItem key={category.slug} category={category} />
                  ))}
                </div>

                {selectedQuicklinks.length === 0 && <Instructions />}

                {selectedQuicklinks.length > 0 && (
                  <div>
                    <p className={styles.sidebarTitle}>Add to Raycast</p>

                    <Collapsible.Root>
                      <Collapsible.Trigger asChild>
                        <button className={styles.summaryTrigger}>
                          {selectedQuicklinks.length} {selectedQuicklinks.length > 1 ? "Quicklinks" : "Quicklink"}{" "}
                          selected
                          <ChevronDownIcon />
                        </button>
                      </Collapsible.Trigger>

                      <Collapsible.Content className={styles.summaryContent}>
                        {selectedQuicklinks.map((quicklink, index) => (
                          <div key={quicklink.id} className={styles.summaryItem}>
                            {quicklink.name}
                            <button
                              className={styles.summaryItemButton}
                              onClick={() => {
                                setselectedQuicklinks(
                                  selectedQuicklinks.filter(
                                    (selectedQuicklink) => selectedQuicklink.id !== quicklink.id,
                                  ),
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

                      <Button onClick={() => setselectedQuicklinks([])}>Clear selected</Button>
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
              className="pt-8"
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
              {categories.map((category) => {
                return (
                  <div
                    key={category.name}
                    data-section-slug={`/quicklinks${category.slug}`}
                    style={{
                      outline: "none",
                    }}
                    tabIndex={-1}
                  >
                    <h2 className={styles.subtitle}>
                      <category.iconComponent /> {category.name}
                    </h2>
                    <div className={styles.prompts}>
                      {category.quicklinks.map((quicklink, index) => {
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
                                data-key={`${category.slug}-${index}`}
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
                                  onSelect={() => handleAddQuicklinkToRaycast(quicklink)}
                                >
                                  <RaycastLogoNegIcon /> Add to Raycast
                                </ContextMenu.Item>
                                <ContextMenu.Item
                                  className={styles.contextMenuItem}
                                  onSelect={() => {
                                    if (isSelected) {
                                      return setselectedQuicklinks((prevQuicklinks) =>
                                        prevQuicklinks.filter((prevQuicklink) => prevQuicklink.id !== quicklink.id),
                                      );
                                    }
                                    setselectedQuicklinks((prevQuicklinks) => [...prevQuicklinks, quicklink]);
                                  }}
                                >
                                  {isSelected ? <MinusCircleIcon /> : <PlusCircleIcon />}
                                  {isSelected ? "Deselect Quicklink" : "Select Quicklink"}
                                </ContextMenu.Item>
                                <ContextMenu.Item
                                  className={styles.contextMenuItem}
                                  onSelect={() => handleCopyLink(quicklink)}
                                >
                                  <CopyClipboardIcon /> Copy Quicklink Link{" "}
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
    </div>
  );
}

function NavItem({ category }: { category: Category }) {
  const activeSection = useSectionInView();

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", `/quicklinks${category.slug}`);
      }}
      className={styles.sidebarNavItem}
      data-active={activeSection === `/quicklinks${category.slug}`}
    >
      {category.icon ? <category.iconComponent /> : <StarsIcon />}

      {category.name}
      <span className={styles.badge}>{category.quicklinks.length}</span>
    </a>
  );
}
