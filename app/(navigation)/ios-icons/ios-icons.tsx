"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { DownloadIcon, CheckIcon, ChevronDownIcon, Info02Icon } from "@raycast/icons";
import { Button } from "@/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { NavigationActions } from "@/components/navigation";
import { InstallGuideDialog } from "./install-guide-dialog";

type ThemeKey = "default" | "dark" | "clearLight" | "clearDark";

type IconFeature = {
  id: string;
  label: string;
  themes: Partial<Record<ThemeKey, string>>;
};

const THEME_LABELS: Record<ThemeKey, string> = {
  default: "Default",
  dark: "Dark",
  clearLight: "Clear Light",
  clearDark: "Clear Dark",
};

function keyFor(id: string, theme: ThemeKey) {
  return `${id}:${theme}`;
}

function fileNameFromPath(src: string) {
  return src.split("/").pop() ?? "ios-icon.png";
}

export function IosIcons({ icons }: { icons: IconFeature[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [installGuideOpen, setInstallGuideOpen] = useState(false);
  const [installGuideSession, setInstallGuideSession] = useState(0);

  const openInstallGuide = useCallback(() => {
    setInstallGuideSession((s) => s + 1);
    setInstallGuideOpen(true);
  }, []);

  const allEntries = useMemo(() => {
    const entries: { id: string; theme: ThemeKey; src: string; label: string }[] = [];

    for (const icon of icons) {
      for (const theme of Object.keys(THEME_LABELS) as ThemeKey[]) {
        const src = icon.themes[theme];
        if (!src) {
          continue;
        }

        entries.push({
          id: icon.id,
          theme,
          src,
          label: `${icon.label} (${THEME_LABELS[theme]})`,
        });
      }
    }

    return entries;
  }, [icons]);

  const selectedEntries = allEntries.filter((entry) => selected.has(keyFor(entry.id, entry.theme)));

  const toggle = (id: string, theme: ThemeKey) => {
    const key = keyFor(id, theme);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(allEntries.map((entry) => keyFor(entry.id, entry.theme))));
  };

  const selectAllByTheme = (theme: ThemeKey) => {
    setSelected(
      new Set(allEntries.filter((entry) => entry.theme === theme).map((entry) => keyFor(entry.id, entry.theme))),
    );
  };

  const clearSelection = () => {
    setSelected(new Set());
  };

  const saveSelected = async () => {
    if (selectedEntries.length === 0 || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const files = await Promise.all(
        selectedEntries.map(async ({ src }) => {
          const response = await fetch(src);
          const blob = await response.blob();
          return new File([blob], fileNameFromPath(src), { type: blob.type || "image/png" });
        }),
      );

      if (navigator.share && navigator.canShare?.({ files })) {
        await navigator.share({
          files,
          title: "Raycast iOS Shortcut Icons",
          text: "Save these icon images to Photos.",
        });
        return;
      }

      if (files.length === 1) {
        const file = files[0]!;
        const url = URL.createObjectURL(file);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = file.name;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        return;
      }

      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      const zipAnchor = document.createElement("a");
      zipAnchor.href = zipUrl;
      zipAnchor.download = "raycast-ios-shortcut-icons.zip";
      document.body.appendChild(zipAnchor);
      zipAnchor.click();
      zipAnchor.remove();
      URL.revokeObjectURL(zipUrl);
    } catch {
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-50px)] bg-gray-1 text-gray-12">
      <NavigationActions className="hidden md:flex">
        <Button variant="transparent" className="gap-2" onClick={openInstallGuide}>
          <Info02Icon className="w-4 h-4" />
          Install guide
        </Button>
        <Button onClick={saveSelected} disabled={selectedEntries.length === 0 || isSaving} variant="primary">
          <DownloadIcon className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : `Save Selected (${selectedEntries.length})`}</span>
        </Button>
      </NavigationActions>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-8 pb-28 md:px-8 md:py-10 md:pb-10">
        <div className="mb-6 md:mb-8">
          <h1 className="text-[30px] md:text-[36px] leading-tight font-semibold tracking-tight">iOS App Icons</h1>
          <p className="mt-2 text-[15px] text-gray-10 max-w-[760px]">
            Pick one or more icons, then tap save to save to your camera roll. From there you can follow the guide to
            add them to your Home Screen with Apple Shortcuts.
          </p>
          <button
            type="button"
            onClick={openInstallGuide}
            className="mt-3 text-left text-[15px] font-medium text-gray-12 underline underline-offset-2 hover:text-gray-11 md:hidden"
          >
            Install guide
          </button>
        </div>

        <div className="sticky top-[58px] z-20 rounded-xl border border-gray-5 bg-gray-2/95 backdrop-blur px-3 py-3 md:px-4 md:py-3 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2 md:gap-3">
              <div className="flex items-center">
                <Button variant="secondary" onClick={selectAll} className="rounded-r-none md:rounded-md">
                  Select All
                </Button>
                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" iconOnly className="rounded-l-none border-l border-gray-6">
                        <ChevronDownIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onSelect={() => selectAllByTheme("default")}>
                        Select all default
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => selectAllByTheme("dark")}>Select all dark</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => selectAllByTheme("clearLight")}>
                        Select all clear light
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => selectAllByTheme("clearDark")}>
                        Select all clear dark
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="hidden md:flex flex-wrap items-center gap-2">
                {(Object.keys(THEME_LABELS) as ThemeKey[]).map((theme) => (
                  <Button key={theme} variant="secondary" onClick={() => selectAllByTheme(theme)}>
                    {THEME_LABELS[theme]}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={clearSelection}
              disabled={selectedEntries.length === 0}
              className="shrink-0"
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {icons.map((icon) => (
            <article key={icon.id} className="rounded-2xl border border-gray-5 bg-gray-2 p-4 md:p-5">
              <h2 className="text-[20px] font-medium mb-5 text-left">{icon.label}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 md:gap-x-5 md:gap-y-6">
                {(Object.keys(THEME_LABELS) as ThemeKey[]).map((theme) => {
                  const src = icon.themes[theme];
                  if (!src) {
                    return null;
                  }

                  const selectedKey = keyFor(icon.id, theme);
                  const isSelected = selected.has(selectedKey);

                  return (
                    <button
                      key={selectedKey}
                      type="button"
                      onClick={() => toggle(icon.id, theme)}
                      className="group relative px-3 py-4 text-center transition-all select-none"
                      aria-pressed={isSelected}
                    >
                      <div
                        className={`relative mx-auto aspect-square w-full max-w-[136px] rounded-[30px] bg-gray-1 ${
                          isSelected
                            ? "ring-2 ring-brand ring-offset-2 ring-offset-gray-2"
                            : "ring-1 ring-gray-6 group-hover:ring-gray-7"
                        }`}
                      >
                        <div className="absolute inset-0 overflow-hidden rounded-[30px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                          <Image
                            src={src}
                            alt={`${icon.label} ${THEME_LABELS[theme]} icon`}
                            fill
                            className="object-cover select-none"
                            draggable={false}
                          />
                        </div>
                        {isSelected ? (
                          <span className="absolute right-2.5 top-2.5 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand bg-brand text-white">
                            <CheckIcon className="h-3.5 w-3.5" />
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-3 space-y-0.5">
                        <p className="text-[14px] leading-tight font-medium text-gray-12">{icon.label}</p>
                        <p className="text-[12px] leading-tight text-gray-10">{THEME_LABELS[theme]}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <InstallGuideDialog key={installGuideSession} open={installGuideOpen} onOpenChange={setInstallGuideOpen} />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-5 bg-gray-2/95 p-3 backdrop-blur md:hidden">
        <Button
          onClick={saveSelected}
          disabled={selectedEntries.length === 0 || isSaving}
          variant="primary"
          className="h-11 w-full text-base"
        >
          <DownloadIcon className="w-5 h-5" />
          <span>{isSaving ? "Saving..." : `Save Selected (${selectedEntries.length})`}</span>
        </Button>
      </div>
    </div>
  );
}
