"use client";
import React from "react";
import copy from "copy-to-clipboard";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, PlusCircleIcon, PlusIcon } from "@raycast/icons";
import { useRaycastTheme } from "@themes/components/raycast-theme-provider";
import { isTouchDevice } from "@themes/lib/isTouchDevice";
import { BuildTypes, makeRaycastImportUrl } from "@themes/lib/url";

export function AddToRaycast() {
  const [isTouch, setIsTouch] = React.useState<boolean | null>(null);
  const [showActions, setShowActions] = React.useState(false);
  const { activeTheme } = useRaycastTheme();

  const handleCopyTheme = React.useCallback(() => {
    if (!activeTheme) return;
    const { slug, ...theme } = activeTheme;
    copy(JSON.stringify(theme, null, 2));
  }, [activeTheme]);

  const handleCopyUrl = React.useCallback(async () => {
    if (!activeTheme) return;
    const { slug } = activeTheme;

    const url = `https://themes.ray.so/${slug}`;
    // Copying the base URL before copying the shortened URL
    // Because we don't have a loading state while the URL is being shortened
    // So... yeah, it's a bit of a hack
    copy(url);
    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=themes`).then((res) =>
      res.json()
    );

    if (response.error) {
      console.error(response.error);
      return;
    }

    copy(response.link);
  }, [activeTheme]);

  const handleDownload = React.useCallback(() => {
    if (!activeTheme) return;
    const { slug, ...theme } = activeTheme;
    const encodedThemeData = encodeURIComponent(JSON.stringify(theme, null, 2));
    const jsonString = `data:text/json;chatset=utf-8,${encodedThemeData}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${theme.name}.json`;
    link.click();
  }, [activeTheme]);

  const handleAddToRaycast = React.useCallback(() => {
    if (!activeTheme) return;
    const queryParams = new URLSearchParams(window.location.search);
    const build = (queryParams.get("build") ?? undefined) as BuildTypes | undefined;

    console.log("Opening theme in Raycast from button");
    window.open(makeRaycastImportUrl(activeTheme, build));
  }, [activeTheme]);

  React.useEffect(() => {
    setIsTouch(isTouchDevice());
  }, [isTouch, setIsTouch]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        setShowActions((prev) => !prev);
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (event.keyCode === 67 && event.metaKey && event.altKey) {
        event.preventDefault();
        handleCopyTheme();
      }

      if (event.key === "c" && event.metaKey && event.shiftKey) {
        event.preventDefault();
        handleCopyUrl();
      }

      if (event.key === "d" && event.metaKey) {
        event.preventDefault();
        handleDownload();
      }

      if (event.key === "Enter" && event.metaKey) {
        event.preventDefault();
        handleAddToRaycast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCopyTheme, handleCopyUrl, handleDownload, handleAddToRaycast]);

  return !isTouch ? (
    <span className="inline-flex items-center text-sm font-medium shadow-[0px_0px_29px_10px_rgba(0,0,0,0.03)] dark:shadow-[0px_0px_29px_10px_rgba(255,255,255,.06)] rounded-md">
      <Button className="flex-1 rounded-tl-md rounded-bl-md" onClick={() => handleAddToRaycast()}>
        <PlusCircleIcon /> Add to Raycast
      </Button>

      <DropdownMenu.Root open={showActions} onOpenChange={setShowActions}>
        <DropdownMenu.Trigger asChild>
          <Button className="ml-[-1px] rounded-tr-md rounded-br-md">
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            className={`rounded-md z-20 p-1 min-w-[200px] backdrop-blur-[6px] text-sm leading-[22px] 
            text-black/60 
            dark:text-white
            bg-white/50 
            dark:bg-neutral-700/40
            shadow-[0px_0px_0px_1px_rgba(0,0,0,0.2),0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)] 
            dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.2),0px_10px_38px_-10px_rgba(22,23,24,0.35),_0px_10px_20px_-15px_rgba(22,23,24,0.2)] 
            `}
          >
            <Item onSelect={() => handleDownload()}>
              Download JSON
              <Shortcut keys={["⌘", "D"]} />
            </Item>
            <Item onSelect={() => handleCopyTheme()}>
              Copy JSON
              <Shortcut keys={["⌘", "⌥", "C"]} />
            </Item>
            <Item onSelect={() => handleCopyUrl()}>
              Copy URL to share
              <Shortcut keys={["⌘", "⇧", "C"]} />
            </Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  ) : null;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...rest }, ref) => (
  <button
    {...rest}
    ref={ref}
    className={`h-[30px] flex items-center gap-2 px-4 outline-none
        bg-white/10
        dark:bg-black/10
        hover:bg-white/50 
        dark:hover:bg-black/50 
        shadow-[inset_0px_0px_0px_1px_#737373,0px_0px_29px_10px_rgba(0,0,0,0.06)] 
        focus:shadow-[inset_0px_0px_0px_1px_#737373,0px_0px_0px_1px_#737373] 
        dark:shadow-[inset_0px_0px_0px_1px_#484848] 
        dark:focus:shadow-[inset_0px_0px_0px_1px_#484848,0px_0px_0px_1px_#484848] 
        ${className}`}
  >
    {children}
  </button>
));

Button.displayName = "Button";

function Item({ children, onSelect }: { children: React.ReactNode; onSelect: () => void }) {
  return (
    <DropdownMenu.Item
      className="flex justify-between gap-3 rounded pl-2 pr-1 py-1 outline-none 
      data-[highlighted]:bg-black/10 
      dark:data-[highlighted]:bg-white/10 
      
      cursor-default"
      onSelect={onSelect}
    >
      {children}
    </DropdownMenu.Item>
  );
}

function Shortcut({ keys }: { keys: string[] }) {
  return (
    <div className="inline-flex gap-1">
      {keys.map((key) => (
        <kbd
          key={key}
          className="bg-black/10 dark:bg-white/10 text-sm text-black dark:text-white/60 h-[20px] w-[24px] rounded items-center justify-center flex font-medium"
        >
          {key}
        </kbd>
      ))}
    </div>
  );
}
