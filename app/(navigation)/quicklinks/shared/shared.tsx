"use client";

import { Quicklink } from "../quicklinks";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SelectionArea, SelectionEvent } from "@viselect/react";
import copy from "copy-to-clipboard";

import { isTouchDevice } from "../utils/isTouchDevice";
import { ChevronDownIcon, CopyClipboardIcon, DownloadIcon, LinkIcon, PlusCircleIcon } from "@raycast/icons";
import { extractQuicklinks } from "../utils/extractQuicklinks";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";

import styles from "../[[...slug]]/quicklinks.module.css";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { NavigationActions } from "@/components/navigation";
import { InfoDialog } from "../components/InfoDialog";
import { Kbd, Kbds } from "@/components/kbd";
import { QuicklinkComponent } from "../components/quicklink";
import { toast } from "@/components/toast";
import { shortenUrl } from "@/utils/common";
import { getRaycastFlavor } from "@/app/RaycastFlavor";

export function Shared({ quicklinks }: { quicklinks: Quicklink[] }) {
  const router = useRouter();

  const initialCategories = useMemo(
    () => [
      {
        name: `${quicklinks.length} ${quicklinks.length > 1 ? "quicklinks" : "quicklink"} shared with you`,
        isTemplate: true,
        isShared: true,
        quicklinks: quicklinks,
        slug: "/shared",
        icon: LinkIcon,
      },
    ],
    [quicklinks],
  );

  const [raycastProtocol, setRaycastProtocol] = React.useState("");

  React.useEffect(() => {
    async function fetchRaycastProtocol() {
      const protocol = await getRaycastFlavor();
      setRaycastProtocol(protocol);
    }
    fetchRaycastProtocol();
  }, []);

  const [categories, setCategories] = React.useState(initialCategories);
  useEffect(() => {
    const flavoredCategories = initialCategories.map((category) => {
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
  }, [initialCategories, raycastProtocol]);

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

  const [actionsOpen, setActionsOpen] = React.useState(false);

  const [selectedQuicklinkIds, setSelectedQuicklinkIds] = React.useState<string[]>([]);
  const selectedQuicklinks = categories.flatMap((category) => {
    return category.quicklinks.filter((quicklink) => selectedQuicklinkIds.includes(quicklink.id));
  });

  const isTouch = React.useMemo(() => (typeof window !== "undefined" ? isTouchDevice() : false), []);

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
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [quicklinks, setActionsOpen, selectedQuicklinks, handleCopyData, handleDownload, handleAddToRaycast]);

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
                          key={quicklink.name}
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
  );
}
