import React, { MouseEventHandler, useContext, useState } from "react";
import { track } from "@vercel/analytics";

import ImageIcon from "../assets/icons/image-16.svg";
import LinkIcon from "../assets/icons/link-16.svg";
import ChevronDownIcon from "../assets/icons/chevron-down-16.svg";
import ChevronRightIcon from "../assets/icons/chevron-right-16.svg";
import ClipboardIcon from "../assets/icons/clipboard-16.svg";
import ArrowsExpandingIcon from "../assets/icons/arrows-expanding-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import { derivedFlashMessageAtom, flashShownAtom } from "../store/flash";
import { fileNameAtom } from "../store";
import download from "../util/download";
import { toPng, toSvg, toBlob } from "../../../../lib/image";

import styles from "./ExportButton.module.css";
import useHotkeys from "../util/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import { EXPORT_SIZE_OPTIONS, SIZE_LABELS, exportSizeAtom } from "../store/image";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import { LANGUAGES } from "../util/languages";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { DropdownMenuItemIndicator } from "@radix-ui/react-dropdown-menu";
import { DownloadIcon } from "@raycast/icons";

const ExportButton: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pngClipboardSupported = usePngClipboardSupported();
  const frameContext = useContext(FrameContext);
  const [, setFlashMessage] = useAtom(derivedFlashMessageAtom);
  const [, setFlashShown] = useAtom(flashShownAtom);
  const customFileName = useAtomValue(fileNameAtom);
  const fileName = customFileName.replaceAll(" ", "-") || "ray-so-export";
  const [exportSize, setExportSize] = useAtom(exportSizeAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const autoDetectLanguage = useAtomValue(autoDetectLanguageAtom);

  const savePng = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    setFlashMessage({ icon: <ImageIcon />, message: "Exporting PNG" });

    const dataUrl = await toPng(frameContext.current, {
      pixelRatio: exportSize,
    });

    download(dataUrl, `${fileName}.png`);

    setFlashShown(false);
  };

  const copyPng = () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: "Copying PNG" });

    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": new Promise((resolve) => {
          if (!frameContext?.current) {
            throw new Error("Couldn't find a frame to export");
          }

          toBlob(frameContext.current, {
            pixelRatio: exportSize,
          }).then((blob) => {
            if (!blob) {
              throw new Error("expected toBlob to return a blob");
            }

            resolve(blob);

            setFlashMessage({ icon: <ClipboardIcon />, message: "PNG Copied to clipboard!", timeout: 2000 });
          });
        }),
      }),
    ]);
  };

  const saveSvg = async () => {
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    setFlashMessage({ icon: <ImageIcon />, message: "Exporting SVG" });

    const dataUrl = await toSvg(frameContext.current);
    download(dataUrl, `${fileName}.svg`);

    setFlashShown(false);
  };

  const dropdownHandler: (handler: () => void) => (event: Event) => void = (handler) => {
    return (event) => {
      event.preventDefault();
      handler();
      setDropdownOpen(false);
    };
  };

  const handleExportClick: MouseEventHandler = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.hash.replace("#", "?"));
    track("Export", {
      theme: params.get("theme") || "candy",
      background: params.get("background") || "true",
      darkMode: params.get("darkMode") || "true",
      padding: params.get("padding") || "64",
      language: Object.keys(LANGUAGES).find((key) => LANGUAGES[key].name === selectedLanguage?.name) || "auto",
      autoDetectLanguage: autoDetectLanguage.toString(),
      title: params.get("title") || "untitled",
      width: params.get("width") || "auto",
      size: SIZE_LABELS[exportSize],
    });
    savePng();
  };

  const copyUrl = async () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: "Copying URL" });

    const url = window.location.toString();
    let urlToCopy = url;

    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(`/api/shorten-url?url=${encodedUrl}&ref=codeImage`).then((res) => res.json());

    if (response.link) {
      urlToCopy = response.link;
    }

    navigator.clipboard.writeText(urlToCopy);

    setFlashMessage({ icon: <ClipboardIcon />, message: "URL Copied to clipboard!", timeout: 2000 });
  };

  useHotkeys("ctrl+s,cmd+s", (event) => {
    event.preventDefault();
    savePng();
  });
  useHotkeys("ctrl+c,cmd+c", (event) => {
    if (pngClipboardSupported) {
      event.preventDefault();
      copyPng();
    }
  });
  useHotkeys("ctrl+shift+c,cmd+shift+c", (event) => {
    event.preventDefault();
    copyUrl();
  });
  useHotkeys("ctrl+shift+s,cmd+shift+s", (event) => {
    event.preventDefault();
    saveSvg();
  });

  return (
    <>
      <ButtonGroup>
        <Button onClick={handleExportClick} variant="primary" aria-label="Export as PNG">
          <DownloadIcon className="w-4 h-4" />
          Export Image
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary" aria-label="See other export options">
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem onSelect={dropdownHandler(savePng)}>
              <ImageIcon /> Save PNG
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={dropdownHandler(saveSvg)}>
              <ImageIcon /> Save SVG
            </DropdownMenuItem>
            {pngClipboardSupported && (
              <DropdownMenuItem onSelect={dropdownHandler(copyPng)}>
                <ClipboardIcon /> Copy Image
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={dropdownHandler(copyUrl)}>
              <LinkIcon /> Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger value={SIZE_LABELS[exportSize]}>
                <ArrowsExpandingIcon /> Size
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={8}>
                <DropdownMenuRadioGroup value={exportSize.toString()}>
                  {EXPORT_SIZE_OPTIONS.map((size) => (
                    <DropdownMenuRadioItem key={size} value={size.toString()} onSelect={() => setExportSize(size)}>
                      {SIZE_LABELS[size]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      {/* <div className={styles.container}>
      <button onClick={handleExportClick} className={styles.button} aria-label="Export as PNG">
        Export
      </button>

      <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenu.Trigger asChild>
          <button className={classNames(styles.button, styles.small)} aria-label="See other export options">
            <ChevronDownIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.dropdown} sideOffset={12} side={"bottom"} align="end">
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className={classNames(styles.option, styles.subTrigger)}>
                <ArrowsExpandingIcon /> Size
                <div className={styles.rightSlot}>
                  {SIZE_LABELS[exportSize]} <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent className={styles.dropdown} sideOffset={8} alignOffset={-5}>
                  <DropdownMenu.RadioGroup value={exportSize.toString()} className={styles.radioGroup}>
                    {EXPORT_SIZE_OPTIONS.map((size) => (
                      <DropdownMenu.RadioItem
                        key={size}
                        value={size.toString()}
                        className={styles.option}
                        onSelect={() => setExportSize(size)}
                      >
                        <DropdownMenu.ItemIndicator className={styles.indicator} />
                        {SIZE_LABELS[size]}
                      </DropdownMenu.RadioItem>
                    ))}
                  </DropdownMenu.RadioGroup>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator className={styles.separator} />
            <DropdownMenu.Item onSelect={dropdownHandler(savePng)} className={styles.option}>
              <ImageIcon />
              Save PNG
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={dropdownHandler(saveSvg)} className={styles.option}>
              <ImageIcon />
              Save SVG
            </DropdownMenu.Item>
            {pngClipboardSupported && (
              <DropdownMenu.Item onSelect={dropdownHandler(copyPng)} className={styles.option}>
                <ClipboardIcon />
                Copy Image
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item onSelect={dropdownHandler(copyUrl)} className={styles.option}>
              <LinkIcon />
              Copy URL
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div> */}
    </>
  );
};

export default ExportButton;
