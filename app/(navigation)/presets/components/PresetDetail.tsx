"use client";

import React from "react";
import copy from "copy-to-clipboard";
import clsx from "clsx";

import {
  CheckIcon,
  ChevronDownIcon,
  CopyClipboardIcon,
  DownloadIcon,
  Globe01Icon,
  ImageIcon,
  LinkIcon,
  PlusCircleIcon,
  XMarkCircleIcon,
} from "@raycast/icons";

import { PresetComponent } from "./Preset";
import { creativity as creativityString } from "./Preset";
import CreativityIcon from "./CreativityIcon";
import ModelIcon from "./ModelIcon";

import styles from "./PresetDetail.module.css";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { IconComponent } from "./Icons";
import { Preset } from "../presets";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";
import { useRouter } from "next/navigation";
import { Toast, ToastTitle, ToastViewport } from "./Toast";
import { NavigationActions } from "@/components/navigation";
import { InfoDialog } from "./InfoDialog";
import { Kbd } from "@/components/kbd";
import { AiModel } from "@/api/ai";
import { Extension } from "@/api/store";
import { getExtensionIdsFromString } from "@/utils/getExtensionIdsFromString";
import { AIExtension } from "@/components/ai-extension";

type PresetPageProps = {
  preset: Preset;
  relatedPresets: Preset[];
  models: AiModel[];
  extensions: Extension[];
};

export function PresetDetail({ preset, relatedPresets, models, extensions }: PresetPageProps) {
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [showCopied, setShowCopied] = React.useState(false);

  const modelObj = models?.find((m) => m.id === preset.model);
  const modelSupportsImageGen = modelObj?.abilities?.image_generation;
  const router = useRouter();

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  React.useEffect(() => {
    if (showCopied) {
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }
  }, [showCopied]);

  React.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  const handleAddToRaycast = React.useCallback(() => addToRaycast(router, preset), [router, preset]);

  const handleCopyInstructions = () => {
    copy(instructions);
    setShowCopied(true);
  };

  const handleDownload = React.useCallback(() => {
    downloadData(preset);
  }, [preset]);

  const handleCopyData = React.useCallback(() => {
    copyData(preset);
    setToastMessage("Copied to clipboard");
    setShowToast(true);
  }, [preset]);

  const handleCopyUrl = React.useCallback(async () => {
    setToastMessage("Copying URL to clipboard...");
    setShowToast(true);

    const url = makeUrl(preset);
    let urlToCopy = url;
    if (!preset.id) {
      const encodedUrl = encodeURIComponent(urlToCopy);
      const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=presets`).then((res) =>
        res.json(),
      );

      if (response.link) {
        urlToCopy = response.link;
      }
    }

    copy(urlToCopy);
    setShowToast(true);
    setToastMessage("Copied URL to clipboard!");
  }, [preset]);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, shiftKey, altKey } = event;

      if (key === "k" && metaKey) {
        if (!preset) return;
        setActionsOpen((prevOpen) => {
          return !prevOpen;
        });
      }

      if (key === "d" && metaKey) {
        if (!preset) return;
        event.preventDefault();
        handleDownload();
      }

      if (key === "Enter" && metaKey) {
        if (!preset) return;
        event.preventDefault();
        handleAddToRaycast();
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (keyCode === 67 && metaKey && altKey) {
        if (!preset) return;
        event.preventDefault();
        handleCopyData();
        setActionsOpen(false);
      }

      if (key === "c" && metaKey && shiftKey) {
        if (!preset) return;
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
  }, [setActionsOpen, preset, handleCopyData, handleDownload, handleCopyUrl, handleAddToRaycast]);

  if (!preset) {
    return null;
  }

  const {
    name,
    author,
    description,
    instructions,
    creativity,
    icon = "stars",
    model,
    web_search,
    image_generation,
  } = preset;

  const allTools = Array.from(new Set([...(preset.tools || [])]));

  return (
    <>
      <NavigationActions>
        <div className="flex gap-2 sm:hidden">
          <Button variant="primary" onClick={() => handleCopyUrl()}>
            <LinkIcon /> Copy URL to Share
          </Button>
        </div>
        <div className="sm:flex gap-2 hidden ">
          <InfoDialog />
          <ButtonGroup>
            <Button variant="primary" onClick={() => handleAddToRaycast()}>
              <PlusCircleIcon /> Add to Raycast
            </Button>

            <DropdownMenu open={actionsOpen} onOpenChange={setActionsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" aria-label="Export options">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleDownload()}>
                  <DownloadIcon /> Download JSON
                  <span className="inline-flex gap-1 items-center ml-auto pl-2">
                    <Kbd>⌘</Kbd>
                    <Kbd>D</Kbd>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleCopyData()}>
                  <CopyClipboardIcon /> Copy JSON{" "}
                  <span className="inline-flex gap-1 items-center ml-auto  pl-2">
                    <Kbd>⌘</Kbd>
                    <Kbd>⌥</Kbd>
                    <Kbd>C</Kbd>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleCopyUrl()}>
                  <LinkIcon /> Copy URL to Share{" "}
                  <span className="inline-flex gap-1 items-center ml-auto pl-2">
                    <Kbd>⌘</Kbd>
                    <Kbd>⇧</Kbd>
                    <Kbd>C</Kbd>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </NavigationActions>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.icon}>
            <IconComponent icon={icon} />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>
              {name}{" "}
              {author ? (
                <span className={styles.author}>
                  by{" "}
                  {author.link ? (
                    <a href={author.link} target="_blank" rel="noopener noreferrer">
                      {author.name}
                    </a>
                  ) : (
                    author.name
                  )}
                </span>
              ) : null}{" "}
            </h1>
            <h2 className={styles.description}>{description}</h2>
          </div>
        </header>
        <div className={styles.body}>
          {instructions ? (
            <div className={styles.instructions}>
              <div className={styles.instructionsInner}>
                <div className={styles.instructionsHeader}>
                  <h3 className={styles.compactTitle}>Instructions</h3>
                  <button className={styles.copyButton} onClick={handleCopyInstructions} data-copied={showCopied}>
                    <CheckIcon data-icon="check" className="w-4 h-4" />
                    <CopyClipboardIcon data-icon="copy" className="w-4 h-4" />
                  </button>
                </div>
                <pre className={styles.pre}>
                  {instructions.split(/(@[a-zA-Z0-9-]+\{id=[^}]+\})/).map((part, index) => {
                    const match = part.match(/@([a-zA-Z0-9-]+)\{id=([^}]+)\}/);
                    if (match) {
                      const extension = extensions.find((e) => e.id === match[2]);
                      return <AIExtension key={index} extension={extension} fallback={match[1]} />;
                    }
                    return (
                      <span
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: part.replace(/\{[^}]+\}/g, `<span class="${styles.placeholder}">$&</span>`),
                        }}
                      />
                    );
                  })}
                </pre>
              </div>
            </div>
          ) : null}
          <div className={clsx(styles.meta, styles.grid)}>
            <div className={styles.metaItem}>
              <h3 className={styles.compactTitle}>Model</h3>
              <div className={styles.metaContent}>
                <ModelIcon model={model} />
                {modelObj?.provider_name} {modelObj?.name}
                {modelObj?.in_better_ai_subscription && (
                  <Tooltip>
                    <TooltipTrigger>
                      <span className={styles.badge}>
                        <span>Advanced AI</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Requires Advanced AI add-on to Raycast Pro</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            {creativity ? (
              <div className={styles.metaItem}>
                <h3 className={styles.compactTitle}>Creativity</h3>
                <div className={styles.metaContent}>
                  <CreativityIcon creativity={creativity} />
                  {creativityString[creativity]?.[0]}
                </div>
              </div>
            ) : null}
            {(web_search === true || web_search === false) && (
              <div className={styles.metaItem}>
                <h3 className={styles.compactTitle}>Web Search</h3>
                <div className={styles.metaContent}>
                  {web_search ? <Globe01Icon /> : <XMarkCircleIcon />}
                  {web_search ? "On" : "Off"}
                </div>
              </div>
            )}
            {modelSupportsImageGen && (image_generation === true || image_generation === false) && (
              <div className={styles.metaItem}>
                <h3 className={styles.compactTitle}>Image Generation</h3>
                <div className={styles.metaContent}>
                  {image_generation ? <ImageIcon /> : <XMarkCircleIcon />}
                  {image_generation ? "On" : "Off"}
                </div>
              </div>
            )}
            {allTools && (
              <>
                {allTools.map((tool) => {
                  const extension = extensions.find((e) => e.id === tool.id);
                  const icon = extension?.icons.dark || extension?.icons.light;
                  return (
                    <div key={tool.id} className={styles.metaItem}>
                      <h3 className={styles.compactTitle}>AI Extension</h3>
                      <div className={styles.metaContent}>
                        {icon ? (
                          <img src={icon} alt={extension?.title} className={styles.metaIcon} width={16} height={16} />
                        ) : null}
                        <div className={styles.metaContent}>{extension?.title || tool.name}</div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        {relatedPresets && (
          <>
            <div className={styles.separator}></div>
            <div>
              <p className={styles.subtitle}>Explore more presets</p>
              <div className={styles.grid}>
                {relatedPresets.map((p) => (
                  <PresetComponent key={p.id} preset={p} models={models} extensions={extensions} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle>
          <CopyClipboardIcon /> {toastMessage}
        </ToastTitle>
      </Toast>
    </>
  );
}
