"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";
import { SelectionArea, SelectionEvent } from "@viselect/react";
import { Category, Quicklink, categories as originalCategories } from "../quicklinks";
import { extractQuicklinks } from "../utils/extractQuicklinks";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";
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
  MagnifyingGlassIcon,
  PlusCircleIcon,
  StarsIcon,
  TrashIcon,
} from "@raycast/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { ScrollArea } from "@/components/scroll-area";
import { Instructions } from "../components/Instructions";
import * as Collapsible from "@radix-ui/react-collapsible";
import { NavigationActions } from "@/components/navigation";
import { Kbd, Kbds } from "@/components/kbd";
import { InfoDialog } from "../components/InfoDialog";
import { QuicklinkComponent } from "../components/quicklink";
import { shortenUrl } from "@/utils/common";
import { toast } from "@/components/toast";
import { Input, InputSlot } from "@/components/input";
import { getRaycastFlavor } from "@/app/RaycastFlavor";

export function Quicklinks() {
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });
  const [search, setSearch] = React.useState("");

  const [raycastProtocol, setRaycastProtocol] = React.useState("");

  React.useEffect(() => {
    async function fetchRaycastProtocol() {
      const protocol = await getRaycastFlavor();
      setRaycastProtocol(protocol);
    }
    fetchRaycastProtocol();
  }, []);

  const [categories, setCategories] = React.useState<Category[]>(originalCategories);

  useEffect(() => {
    const flavoredCategories = originalCategories.map((category) => {
      return {
        ...category,
        quicklinks: category.quicklinks.map((quicklink) => {
          return {
            ...quicklink,
            link: quicklink.link
              .replace("raycast://", `${raycastProtocol}://`)
              .replace("raycastinternal://", `${raycastProtocol}://`),
          };
        }),
      };
    });
    setCategories(flavoredCategories);
  }, [raycastProtocol]);

  const updateQuicklink = (updatedQuicklink: Quicklink) => {
    const updatedCategories = categories.map((category) => {
      const updatedQuicklinks = category.quicklinks.map((quicklink) => {
        if (quicklink.id === updatedQuicklink.id) {
          return updatedQuicklink;
        }
        return quicklink;
      });

      return {
        ...category,
        quicklinks: updatedQuicklinks,
      };
    });

    setCategories(updatedCategories);
  };

  const filteredQuicklinks = categories.flatMap((category) => {
    return category.quicklinks.filter((quicklink) => quicklink.name.toLowerCase().includes(search.toLowerCase()));
  });

  const [selectedQuicklinkIds, setSelectedQuicklinkIds] = React.useState<string[]>([]);

  const router = useRouter();
  const selectedQuicklinks = categories.flatMap((category) => {
    return category.quicklinks.filter((quicklink) => selectedQuicklinkIds.includes(quicklink.id));
  });

  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState<boolean>();

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!isTouch && !event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelectedQuicklinkIds([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedQuicklinks = extractQuicklinks(added, categories);
    const removedQuicklinks = extractQuicklinks(removed, categories);

    setSelectedQuicklinkIds((prevQuicklinkIds) => {
      let quicklinkIds = [...prevQuicklinkIds];

      addedQuicklinks.forEach((quicklink) => {
        if (!quicklink) {
          return;
        }
        if (quicklinkIds.includes(quicklink.id)) {
          return;
        }
        quicklinkIds.push(quicklink.id);
      });

      removedQuicklinks.forEach((quicklink) => {
        quicklinkIds = quicklinkIds.filter((s) => s !== quicklink?.id);
      });

      return quicklinkIds;
    });
  };

  const handleDownload = React.useCallback(() => {
    downloadData(selectedQuicklinks);
  }, [selectedQuicklinks]);

  const handleCopyData = React.useCallback(() => {
    copyData(selectedQuicklinks);
    toast.success("Copied to clipboard!");
  }, [selectedQuicklinks]);

  const handleCopyUrl = React.useCallback(async () => {
    const url = makeUrl(selectedQuicklinks);
    toast.promise(
      shortenUrl(url, "quicklinks").then((urlToCopy) => {
        if (urlToCopy === null) return null;

        copy(urlToCopy);
        return "Copied URL to clipboard!";
      }),
      {
        loading: "Copying URL to clipboard...",
        success: "Copied URL to clipboard!",
        error: "Failed to copy URL to clipboard",
      },
    );
  }, [selectedQuicklinks]);

  const handleAddToRaycast = React.useCallback(
    () => addToRaycast(router, selectedQuicklinks),
    [router, selectedQuicklinks],
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
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setActionsOpen, selectedQuicklinks, handleCopyData, handleDownload, handleCopyUrl, handleAddToRaycast]);

  const filteredCategories = categories.filter((c) => {
    if (!search) return true;
    return c.quicklinks.some((q) => q.name.toLowerCase().includes(search.toLowerCase()));
  });

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

      <div className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <ScrollArea>
              <div className={styles.sidebarContent}>
                <div className={styles.sidebarNav}>
                  <Input
                    type="search"
                    placeholder="Search quicklinks…"
                    variant="soft"
                    className="mb-6 flex"
                    size="large"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  >
                    <InputSlot side="left">
                      <MagnifyingGlassIcon className="w-3.5 h-3.5" />
                    </InputSlot>
                  </Input>
                  {filteredCategories.length ? <p className={styles.sidebarTitle}>Categories</p> : null}

                  {filteredCategories.map((category) => {
                    const categoryWithFilteredQuicklinks = {
                      ...category,
                      quicklinks: category.quicklinks.filter((q) =>
                        q.name.toLowerCase().includes(search.toLowerCase()),
                      ),
                    };

                    return <NavItem key={category.slug} category={categoryWithFilteredQuicklinks} />;
                  })}
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
                                setSelectedQuicklinkIds(
                                  selectedQuicklinkIds.filter(
                                    (selectedQuicklinkId) => selectedQuicklinkId !== quicklink.id,
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

                      <Button onClick={() => setSelectedQuicklinkIds([])}>Clear selected</Button>
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
                touch: false,
                range: !isTouch,
                singleTap: {
                  allow: true,
                  intersect: "native",
                },
              }}
            >
              {filteredQuicklinks.length === 0 && (
                <div className="flex justify-center flex-col items-center py-[180px] gap-4">
                  <LinkIcon className="w-6 h-6 text-gray-10" />
                  <p className="text-gray-12 font-medium text-sm text-center ">No Quicklinks found</p>
                  <Button variant="secondary" onClick={() => setSearch("")}>
                    Clear search
                  </Button>
                </div>
              )}
              {categories
                .filter((c) => {
                  if (!search) return true;
                  return c.quicklinks.some((q) => q.name.toLowerCase().includes(search.toLowerCase()));
                })
                .map((category) => {
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
                        {category.quicklinks
                          .filter((q) => {
                            if (!search) return true;
                            return q.name.toLowerCase().includes(search.toLowerCase());
                          })
                          .map((quicklink, index) => {
                            const isSelected = selectedQuicklinkIds.includes(quicklink.id);
                            const setIsSelected = (value: boolean) => {
                              if (isSelected) {
                                return setSelectedQuicklinkIds((prevQuicklinkIds) =>
                                  prevQuicklinkIds.filter((prevQuicklinkId) => prevQuicklinkId !== quicklink.id),
                                );
                              }
                              setSelectedQuicklinkIds((prevQuicklinkIds) => [...prevQuicklinkIds, quicklink.id]);
                            };
                            return (
                              <QuicklinkComponent
                                key={quicklink.id}
                                quicklink={quicklink}
                                updateQuicklink={updateQuicklink}
                                isSelected={isSelected}
                                setIsSelected={setIsSelected}
                              />
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
