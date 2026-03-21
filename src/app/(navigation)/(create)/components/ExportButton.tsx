import React, { MouseEventHandler, useContext } from "react";
import { track } from "@vercel/analytics";

import ImageIcon from "../assets/icons/image-16.svg";
import ChevronDownIcon from "../assets/icons/chevron-down-16.svg";
import ClipboardIcon from "../assets/icons/clipboard-16.svg";

import { FrameContext } from "../store/context/frame";
import { derivedFlashMessageAtom, flashShownAtom } from "../store/flash";
import { fileNameAtom } from "../store";
import download from "../util/download";
import { toPng, toSvg, toBlob } from "../lib/image";

import useHotkeys from "../../../../utils/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { useAtom, useAtomValue } from "jotai";
import { EXPORT_SIZE_OPTIONS, exportSizeAtom } from "../store/image";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import { LANGUAGES } from "../util/languages";

import { DownloadIcon } from "@raycast/icons";
import { Kbd, Kbds } from "@/components/kbd";

import { Popover, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Group } from "@/components/ui/group";
import { LinkIcon, SparklesIcon } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { randomBytes } from "crypto";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download02Icon } from "@hugeicons/core-free-icons";

const ExportButton: React.FC = () => {
  const pngClipboardSupported = usePngClipboardSupported();
  const frameContext = useContext(FrameContext);
  const [, setFlashMessage] = useAtom(derivedFlashMessageAtom);
  const [, setFlashShown] = useAtom(flashShownAtom);
  const [customFileName, setCustomFileName] = useAtom(fileNameAtom);
  const fileName = customFileName.replaceAll(" ", "-") || "ray-so-export";
  const [exportSize, setExportSize] = useAtom(exportSizeAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const autoDetectLanguage = useAtomValue(autoDetectLanguageAtom);

  const randomNameGenerator = () => {
    return "IMAGE" + "-" + new Date().toISOString().split("T")[0];
  };

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

  const copyPng = async () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: "Copying PNG" });
    if (!frameContext?.current) {
      throw new Error("Couldn't find a frame to export");
    }

    const clipboardItem = new ClipboardItem({
      "image/png": toBlob(frameContext.current, {
        pixelRatio: exportSize,
      }).then((blob) => {
        if (!blob) {
          throw new Error("expected toBlob to return a blob");
        }
        return blob;
      }),
    });

    await navigator.clipboard.write([clipboardItem]);

    setFlashMessage({ icon: <ClipboardIcon />, message: "PNG Copied to clipboard!", timeout: 2000 });
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
      size: `${exportSize}x`,
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
    <Group aria-label="Export actions">
      <Button variant="outline" onClick={handleExportClick}>
        <HugeiconsIcon icon={Download02Icon} />
        Export
      </Button>
      <Popover>
        <PopoverTrigger render={<Button aria-label="Export options" size="icon" variant="outline" />}>
          <ChevronDownIcon aria-hidden="true" />
        </PopoverTrigger>

        <PopoverPopup className="w-80 max-w-[90vw]">
          <div className="mb-4">
            <PopoverTitle className="text-base">Export image</PopoverTitle>
            <PopoverDescription>Download or copy your code snippet as an image.</PopoverDescription>
          </div>

          <div className="flex flex-col gap-2">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Group className="w-full">
                <Input
                  placeholder="Untitled"
                  type="text"
                  value={fileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                />
                <Button variant="outline" onClick={() => setCustomFileName(randomNameGenerator())}>
                  <SparklesIcon />
                </Button>
              </Group>
              <FieldDescription>The name of the file that will be downloaded.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Size</FieldLabel>

              <Select
                items={EXPORT_SIZE_OPTIONS}
                value={exportSize.toString()}
                onValueChange={(value) => setExportSize(Number(value))}
              >
                <SelectTrigger>{EXPORT_SIZE_OPTIONS.find((size) => size.value === exportSize)?.label}</SelectTrigger>
                <SelectPopup>
                  {EXPORT_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size.value} value={size.value.toString()}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
              <FieldDescription>The size of the image that will be downloaded.</FieldDescription>
            </Field>
            <Separator />
            <Button variant="ghost" onClick={savePng}>
              <ImageIcon /> Save PNG
              <Kbds>
                <Kbd>⌘</Kbd>
                <Kbd>S</Kbd>
              </Kbds>
            </Button>

            <Button variant="ghost" onClick={saveSvg}>
              <ImageIcon /> Save SVG
              <Kbds>
                <Kbd>⌘</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>S</Kbd>
              </Kbds>
            </Button>

            {pngClipboardSupported && (
              <Button variant="ghost" onClick={copyPng}>
                <ClipboardIcon /> Copy Image
                <Kbds>
                  <Kbd>⌘</Kbd>
                  <Kbd>C</Kbd>
                </Kbds>
              </Button>
            )}
            <Button variant="ghost" onClick={copyUrl}>
              <LinkIcon /> Copy URL
              <Kbds>
                <Kbd>⌘</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>C</Kbd>
              </Kbds>
            </Button>
          </div>
        </PopoverPopup>
      </Popover>
    </Group>
  );
};

export default ExportButton;
