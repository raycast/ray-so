"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import { Category, Prompt, categories } from "../prompts";
import { extractPrompts } from "../utils/extractPrompts";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";
import copy from "copy-to-clipboard";
import { isTouchDevice } from "../utils/isTouchDevice";
import styles from "./prompts.module.css";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  AtSymbolIcon,
  ChevronDownIcon,
  CopyClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  StarsIcon,
  TrashIcon,
} from "@raycast/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { Toast, ToastTitle } from "../components/Toast";
import { ScrollArea } from "@/components/scroll-area";
import { Instructions } from "../components/Instructions";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenu from "@radix-ui/react-context-menu";
import CreativityIcon from "../components/CreativityIcon";
import { NavigationActions } from "@/components/navigation";
import { Kbd, Kbds } from "@/components/kbd";
import { InfoDialog } from "../components/InfoDialog";
import { AiModel } from "@/api/ai";
import { Tooltip, TooltipContent } from "@/components/tooltip";
import { TooltipTrigger } from "@/components/tooltip";
import { Extension } from "@/api/store";
import { AIExtension } from "@/components/ai-extension";

type Props = {
  models: AiModel[];
  extensions: Extension[];
};

export function Prompts({ models, extensions }: Props) {
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });

  const router = useRouter();

  const [selectedPrompts, setSelectedPrompts] = React.useState<Prompt[]>([]);

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState<boolean>();

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!isTouch && !event?.ctrlKey && !event?.metaKey) {
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
    setToastMessage("Copied to clipboard");
    setShowToast(true);
  }, [selectedPrompts]);

  const handleCopyUrl = React.useCallback(async () => {
    setToastMessage("Copying URL to clipboard...");
    setShowToast(true);

    const url = makeUrl(selectedPrompts);
    let urlToCopy = url;
    const encodedUrl = encodeURIComponent(urlToCopy);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=prompts`).then((res) =>
      res.json(),
    );

    if (response.link) {
      urlToCopy = response.link;
    }

    copy(urlToCopy);
    setShowToast(true);
    setToastMessage("Copied URL to clipboard!");
  }, [selectedPrompts]);

  const handleCopyText = React.useCallback((prompt: Prompt) => {
    copy(prompt.prompt);
    setShowToast(true);
    setToastMessage("Copied to clipboard");
  }, []);

  const handleAddToRaycast = React.useCallback(() => addToRaycast(router, selectedPrompts), [router, selectedPrompts]);

  React.useEffect(() => {
    setIsTouch(isTouchDevice());
    setEnableViewObserver(true);
  }, [isTouch, setIsTouch, setEnableViewObserver]);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, shiftKey, altKey } = event;

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
  }, [setActionsOpen, selectedPrompts, handleCopyData, handleDownload, handleCopyUrl, handleAddToRaycast]);

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
          <Button variant="primary" disabled={selectedPrompts.length === 0} onClick={() => handleCopyUrl()}>
            <LinkIcon /> Copy URL to Share
          </Button>
        </div>
        <div className="sm:flex gap-2 hidden">
          <InfoDialog />
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
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleDownload()}>
                  <DownloadIcon /> Download JSON
                  <Kbds>
                    <Kbd>⌘</Kbd>
                    <Kbd>D</Kbd>
                  </Kbds>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleCopyData()}>
                  <CopyClipboardIcon /> Copy JSON{" "}
                  <Kbds>
                    <Kbd>⌘</Kbd>
                    <Kbd>⌥</Kbd>
                    <Kbd>C</Kbd>
                  </Kbds>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleCopyUrl()}>
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

                {selectedPrompts.length === 0 && <Instructions />}

                {selectedPrompts.length > 0 && (
                  <div>
                    <p className={styles.sidebarTitle}>Add to Raycast</p>

                    <Collapsible.Root>
                      <Collapsible.Trigger asChild>
                        <button className={styles.summaryTrigger}>
                          {selectedPrompts.length} {selectedPrompts.length > 1 ? "Prompts" : "Prompt"} selected
                          <ChevronDownIcon />
                        </button>
                      </Collapsible.Trigger>

                      <Collapsible.Content className={styles.summaryContent}>
                        {selectedPrompts.map((prompt, index) => (
                          <div key={prompt.title + index} className={styles.summaryItem}>
                            {prompt.title}
                            <button
                              className={styles.summaryItemButton}
                              onClick={() => {
                                setSelectedPrompts(
                                  selectedPrompts.filter((selectedPrompt) => selectedPrompt.id !== prompt.id),
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

                      <Button onClick={() => setSelectedPrompts([])}>Clear selected</Button>
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
                    data-section-slug={`/prompts${category.slug}`}
                    style={{
                      outline: "none",
                    }}
                    tabIndex={-1}
                  >
                    <h2 className={styles.subtitle}>
                      <category.iconComponent /> {category.name}
                    </h2>
                    <div className={styles.prompts}>
                      {category.prompts.map((prompt, index) => {
                        const isSelected = selectedPrompts.some((selectedPrompt) => selectedPrompt.id === prompt.id);
                        const model = models?.find((m) => m.id === prompt.model);
                        const hasAIExtensions = prompt.prompt.includes("{id=") && prompt.prompt.includes("@");
                        return (
                          <ContextMenu.Root key={prompt.id}>
                            <ContextMenu.Trigger>
                              <div
                                className={`${styles.item} selectable group`}
                                data-selected={isSelected}
                                data-key={`${category.slug}-${index}`}
                              >
                                <div className={styles.promptTemplate}>
                                  <ScrollArea>
                                    <pre className={styles.template}>
                                      {prompt.prompt.split(/(@[a-zA-Z0-9-]+\{id=[^}]+\})/).map((part, index) => {
                                        const match = part.match(/@([a-zA-Z0-9-]+)\{id=([^}]+)\}/);
                                        if (match) {
                                          const extension = extensions.find((e) => e.id === match[2]);
                                          return (
                                            <AIExtension
                                              variant="secondary"
                                              key={index}
                                              extension={extension}
                                              fallback={match[1]}
                                            />
                                          );
                                        }
                                        return (
                                          <span
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                              __html: part.replace(
                                                /\{[^}]+\}/g,
                                                `<span class="${styles.placeholder}">$&</span>`,
                                              ),
                                            }}
                                          />
                                        );
                                      })}
                                    </pre>
                                  </ScrollArea>
                                </div>
                                <div className={styles.prompt}>
                                  <span className={styles.name}>
                                    <prompt.iconComponent />
                                    {prompt.title}
                                    {prompt.author ? (
                                      <span className={styles.promptAuthor}>
                                        by{" "}
                                        {prompt.author.link ? (
                                          <a href={prompt.author.link} target="_blank" rel="noopener noreferrer">
                                            {prompt.author.name}
                                          </a>
                                        ) : (
                                          prompt.author.name
                                        )}
                                      </span>
                                    ) : null}
                                  </span>
                                  {prompt.model ? (
                                    <span
                                      className={styles.promptModel}
                                      title={`${model?.provider_name} ${model?.name}`}
                                    >
                                      {model?.name}
                                    </span>
                                  ) : null}
                                  {prompt.creativity ? <CreativityIcon creativity={prompt.creativity} /> : null}

                                  {hasAIExtensions ? (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.99999 0.996506C3.99811 0.721968 3.77497 0.499996 3.49999 0.5C3.22501 0.500004 3.00188 0.721983 3.00001 0.996522L2.99991 1.0002C2.99974 1.00529 2.99933 1.01507 2.99834 1.02884C2.99636 1.05657 2.99216 1.09943 2.98337 1.15219C2.96539 1.26007 2.93037 1.39626 2.8653 1.5264C2.80121 1.65458 2.71293 1.76755 2.58986 1.8496C2.46992 1.92956 2.28752 2 2 2C1.72386 2 1.5 2.22386 1.5 2.5C1.5 2.77614 1.72386 3 2 3C2.28751 3 2.4699 3.07044 2.58984 3.1504C2.71291 3.23245 2.80119 3.34542 2.86529 3.47361C2.93036 3.60375 2.96539 3.73995 2.98337 3.84782C2.99216 3.90058 2.99636 3.94345 2.99834 3.97117C2.99933 3.98495 2.99974 3.99472 2.99991 3.99981L3.00001 4.00349C3.00189 4.27803 3.22502 4.5 3.5 4.5C3.77498 4.5 3.99811 4.27803 3.99999 4.00349L4.00009 3.99981C4.00026 3.99472 4.00068 3.98495 4.00166 3.97117C4.00364 3.94345 4.00784 3.90058 4.01663 3.84782C4.03461 3.73995 4.06964 3.60375 4.13471 3.47361C4.19881 3.34542 4.28709 3.23245 4.41016 3.1504C4.5301 3.07044 4.71249 3 5 3C5.27614 3 5.5 2.77614 5.5 2.5C5.5 2.22386 5.27614 2 5 2C4.71249 2 4.5301 1.92956 4.41016 1.8496C4.28709 1.76755 4.19881 1.65458 4.13471 1.52639C4.06964 1.39625 4.03461 1.26005 4.01663 1.15218C4.00784 1.09942 4.00364 1.05655 4.00166 1.02883C4.00068 1.01505 4.00017 1.00462 4 0.999528L3.99999 0.996506ZM8.6 4.59788L8.6 4.59945L8.6005 4.61819C8.60109 4.63602 8.60237 4.66494 8.60512 4.70335C8.61062 4.78036 8.62191 4.89431 8.64496 5.03261C8.69154 5.31207 8.78357 5.6755 8.96166 6.03167C9.13857 6.38549 9.39451 6.72106 9.76719 6.96952C10.1361 7.21547 10.655 7.4 11.4 7.4C11.7314 7.4 12 7.66863 12 8C12 8.33137 11.7314 8.6 11.4 8.6C10.655 8.6 10.1361 8.78453 9.76719 9.03048C9.39451 9.27894 9.13857 9.61451 8.96166 9.96833C8.78357 10.3245 8.69154 10.6879 8.64496 10.9674C8.62191 11.1057 8.61062 11.2196 8.60512 11.2967C8.60237 11.3351 8.60109 11.364 8.6005 11.3818L8.60003 11.3999C8.59973 11.731 8.33119 12 8 12C7.66933 12 7.40114 11.7325 7.4 11.4021L7.39997 11.3999L7.3995 11.3818C7.39891 11.364 7.39763 11.3351 7.39488 11.2967C7.38938 11.2196 7.37809 11.1057 7.35504 10.9674C7.30846 10.6879 7.21643 10.3245 7.03834 9.96833C6.86143 9.61451 6.60549 9.27894 6.23281 9.03048C5.86388 8.78453 5.34501 8.6 4.6 8.6C4.26863 8.6 4 8.33137 4 8C4 7.66863 4.26863 7.4 4.6 7.4C5.34504 7.4 5.86392 7.21547 6.23285 6.96952C6.60554 6.72106 6.86148 6.3855 7.03838 6.03168C7.21646 5.67551 7.30848 5.31208 7.35505 5.03263C7.3781 4.89432 7.38939 4.78038 7.39489 4.70336C7.39763 4.66496 7.39891 4.63604 7.3995 4.61821L7.39997 4.6001L7.4 4.59828C7.40054 4.26736 7.66895 4.00001 7.99999 4C8.33066 3.99999 8.59886 4.26748 8.6 4.59788ZM8 1C7.58579 1 7.25 1.33579 7.25 1.75C7.25 2.16421 7.58579 2.5 8 2.5H11.125C12.4367 2.5 13.5 3.56332 13.5 4.875V11.125C13.5 12.4367 12.4367 13.5 11.125 13.5H4.875C3.56332 13.5 2.5 12.4367 2.5 11.125V8V6.69792C2.5 6.2837 2.16421 5.94792 1.75 5.94792C1.33579 5.94792 1 6.2837 1 6.69792V8V11.125C1 13.2651 2.7349 15 4.875 15H11.125C13.2651 15 15 13.2651 15 11.125V4.875C15 2.7349 13.2651 1 11.125 1H8Z"
                                            fill="currentColor"
                                          />
                                        </svg>
                                      </TooltipTrigger>
                                      <TooltipContent>Includes AI Extensions</TooltipContent>
                                    </Tooltip>
                                  ) : null}
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
                                        prevPrompts.filter((prevPrompt) => prevPrompt.id !== prompt.id),
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
    </div>
  );
}

function NavItem({ category }: { category: Category }) {
  const activeSection = useSectionInView();

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", `/prompts${category.slug}`);
      }}
      className={styles.sidebarNavItem}
      data-active={activeSection === `/prompts${category.slug}`}
    >
      {category.icon ? <category.iconComponent /> : <StarsIcon />}

      {category.name}
      <span className={styles.badge}>{category.prompts.length}</span>
    </a>
  );
}
