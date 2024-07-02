"use client";

import { Prompt } from "../prompts";
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
  Icons,
  LinkIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  StarsIcon,
} from "@raycast/icons";
import { extractPrompts } from "../utils/extractPrompts";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";

import styles from "../[[...slug]]/prompts.module.css";
import { ScrollArea } from "../components/ScrollArea";
import CreativityIcon from "../components/CreativityIcon";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Toast, ToastTitle } from "../components/Toast";
import { Metadata } from "next";
import { NavigationActions } from "@/components/navigation";

export function Shared({ prompts }: { prompts: Prompt[] }) {
  const router = useRouter();

  const [copied, setCopied] = React.useState(false);
  const [actionsOpen, setActionsOpen] = React.useState(false);

  const [selectedPrompts, setSelectedPrompts] = React.useState([...prompts]);
  const isTouch = React.useMemo(() => (typeof window !== "undefined" ? isTouchDevice() : false), []);

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = [
    {
      name: `${prompts.length} ${prompts.length > 1 ? "prompts" : "prompt"} shared with you`,
      isTemplate: true,
      isShared: true,
      prompts: prompts,
      slug: "/shared",
      icon: StarsIcon,
    },
  ];

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelectedPrompts([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedPrompts = extractPrompts(added, categories);
    const removedPrompts = extractPrompts(removed, categories);

    setSelectedPrompts((prevPrompts) => {
      const prompts = [...prevPrompts];

      addedPrompts.forEach((prompt) => {
        if (!prompt) {
          return;
        }
        if (prompts.find((p) => p.id === prompt.id)) {
          return;
        }
        prompts.push(prompt);
      });

      removedPrompts.forEach((prompt) => {
        return prompts.filter((s) => s?.id !== prompt?.id);
      });

      return prompts;
    });
  };

  const handleDownload = React.useCallback(() => {
    downloadData(selectedPrompts);
  }, [selectedPrompts]);

  const handleCopyData = React.useCallback(() => {
    copyData(selectedPrompts);
    setCopied(true);
  }, [selectedPrompts]);

  const handleCopyUrl = React.useCallback(async () => {
    const url = makeUrl(selectedPrompts);
    let urlToCopy = url;
    const encodedUrl = encodeURIComponent(urlToCopy);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=prompts`).then((res) =>
      res.json()
    );

    if (response.link) {
      urlToCopy = response.link;
    }

    copy(urlToCopy);
    setCopied(true);
  }, [selectedPrompts]);

  const handleAddToRaycast = React.useCallback(() => addToRaycast(router, selectedPrompts), [router, selectedPrompts]);

  const handleCopyText = React.useCallback((prompt: Prompt) => {
    copy(prompt.prompt);
    setCopied(true);
  }, []);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, altKey } = event;

      if (key === "k" && metaKey) {
        if (selectedPrompts.length === 0) return;
        setActionsOpen((prevOpen) => {
          return !prevOpen;
        });
      }

      if (key === "d" && metaKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleDownload();
      }

      if (key === "Enter" && metaKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleAddToRaycast();
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (keyCode === 67 && metaKey && altKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleCopyData();
        setActionsOpen(false);
      }

      if (key === "a" && metaKey) {
        event.preventDefault();
        setSelectedPrompts([...prompts]);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [prompts, setActionsOpen, selectedPrompts, handleCopyData, handleDownload, handleAddToRaycast]);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  if (prompts.length === 0) {
    return;
  }

  return (
    <div>
      <NavigationActions>
        <div className="flex gap-2 sm:hidden">
          <Button variant="primary" disabled={selectedPrompts.length === 0} onClick={() => handleCopyUrl()}>
            <LinkIcon /> Copy URL to Share
          </Button>
        </div>
        <div className="sm:flex gap-2 hidden">
          <ButtonGroup>
            <Button variant="primary" disabled={selectedPrompts.length === 0} onClick={() => handleAddToRaycast()}>
              <PlusCircleIcon /> Add to Raycast
            </Button>

            <DropdownMenu open={actionsOpen} onOpenChange={setActionsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" disabled={selectedPrompts.length === 0} aria-label="Export options">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleDownload()}>
                  <DownloadIcon /> Download JSON
                  <span className={styles.hotkeys}>
                    <kbd>⌘</kbd>
                    <kbd>D</kbd>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleCopyData()}>
                  <CopyClipboardIcon /> Copy JSON{" "}
                  <span className={styles.hotkeys}>
                    <kbd>⌘</kbd>
                    <kbd>⌥</kbd>
                    <kbd>C</kbd>
                  </span>
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
            {categories.map((promptGroup) => {
              return (
                <div key={promptGroup.name} data-section-slug={promptGroup.slug} style={{ outline: "none" }}>
                  <h2 className={styles.subtitle}>
                    <promptGroup.icon /> {promptGroup.name}
                  </h2>
                  <div className={styles.prompts}>
                    {promptGroup.prompts.map((prompt, index) => {
                      const Icon = prompt.icon in Icons ? Icons[prompt.icon] : StarsIcon;

                      const isSelected = selectedPrompts.some((selectedPrompt) => selectedPrompt.id === prompt.id);

                      return (
                        <ContextMenu.Root key={prompt.id}>
                          <ContextMenu.Trigger>
                            <div
                              className={`${styles.item} selectable`}
                              key={prompt.id}
                              data-selected={isSelected}
                              data-key={`${promptGroup.slug}-${index}`}
                            >
                              <div className={styles.promptTemplate}>
                                <ScrollArea>
                                  <pre
                                    className={styles.template}
                                    dangerouslySetInnerHTML={{
                                      __html: prompt.prompt.replace(
                                        /\{[^}]+\}/g,
                                        `<span class="${styles.placeholder}">$&</span>`
                                      ),
                                    }}
                                  ></pre>
                                </ScrollArea>
                              </div>
                              <div className={styles.prompt}>
                                <span className={styles.name}>
                                  <Icon />
                                  {prompt.title}
                                </span>
                                <CreativityIcon creativity={prompt.creativity} />
                              </div>
                            </div>
                          </ContextMenu.Trigger>
                          <ContextMenu.Portal>
                            <ContextMenu.Content className={styles.contextMenuContent}>
                              <ContextMenu.Item
                                className={styles.contextMenuItem}
                                onSelect={() => {
                                  if (isSelected) {
                                    return setSelectedPrompts((prevPrompts) =>
                                      prevPrompts.filter((prevPrompt) => prevPrompt.id !== prompt.id)
                                    );
                                  }
                                  setSelectedPrompts((prevPrompts) => [...prevPrompts, prompt]);
                                }}
                              >
                                {isSelected ? <MinusCircleIcon /> : <PlusCircleIcon />}
                                {isSelected ? "Deselect Prompt" : "Select Prompt"}
                              </ContextMenu.Item>
                              <ContextMenu.Item
                                className={styles.contextMenuItem}
                                onSelect={() => handleCopyText(prompt)}
                              >
                                <CopyClipboardIcon /> Copy Prompt Text{" "}
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
