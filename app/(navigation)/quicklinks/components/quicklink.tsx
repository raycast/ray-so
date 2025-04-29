import * as ContextMenu from "@radix-ui/react-context-menu";
import { categories, type Quicklink } from "../quicklinks";
import { IconComponent } from "./IconComponent";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/dialog";
import {
  CopyClipboardIcon,
  LinkIcon,
  MinusCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  RaycastLogoNegIcon,
} from "@raycast/icons";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { toast } from "@/components/toast";
import styles from "./quicklink.module.css";
import { cn } from "@/utils/cn";
import React from "react";
import copy from "copy-to-clipboard";
import { makeUrl, addQuicklinkToRaycast } from "../utils/actions";

import { shortenUrl } from "@/utils/common";
import { useRouter } from "next/navigation";
import { isValidLink } from "../utils/isValidLink";

type QuicklinkComponentProps = {
  quicklink: Quicklink;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  updateQuicklink: (quicklink: Quicklink) => void;
};

export function QuicklinkComponent({ quicklink, isSelected, setIsSelected, updateQuicklink }: QuicklinkComponentProps) {
  const router = useRouter();
  const [imgError, setImgError] = React.useState(false);

  let domain = "";
  const iconLink = quicklink?.icon?.link || quicklink.link;
  if (isValidLink(iconLink)) {
    const url = new URL(iconLink);
    domain = url.hostname.replace("www.", "");
  }

  const handleCopyLink = React.useCallback(() => {
    copy(quicklink.link);
    toast.success("Copied to clipboard!");
  }, [quicklink.link]);

  const handleCopyUrl = React.useCallback(async () => {
    const url = makeUrl([quicklink]);
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
  }, [quicklink]);

  const handleAddQuicklinkToRaycast = React.useCallback(
    (quicklink: Quicklink) => {
      addQuicklinkToRaycast(router, quicklink);
    },
    [router],
  );

  const closeButton = React.useRef<HTMLButtonElement>(null);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const openWith = formData.get("openWith") as string;

    updateQuicklink({
      ...quicklink,
      name,
      description,
      link,
      openWith,
      isEdited: true,
    });

    closeButton.current?.click();
  };

  return (
    <ContextMenu.Root key={quicklink.id}>
      <ContextMenu.Trigger>
        <div
          className={`${styles.item} selectable overflow-hidden group`}
          data-selected={isSelected}
          data-key={quicklink.id}
        >
          <div className="w-full flex flex-col space-between h-full">
            <div className="flex-1">
              <div className="flex w-8 h-8 flex-shrink-0 items-center justify-center border border-dashed border-white/20 rounded bg-gradient-radial from-[#171717] to-black text-gray-12 transition-colors duration-150 mb-2 group-hover:text-gray-12">
                {!isValidLink(iconLink) ? (
                  <IconComponent icon={quicklink?.icon?.name || "link"} />
                ) : imgError ? (
                  <IconComponent icon="link" />
                ) : (
                  <img
                    src={`https://api.ray.so/favicon?url=%5C${domain}&size=64`}
                    alt="logo"
                    width={16}
                    height={16}
                    className={cn(
                      `grayscale rounded overflow-hidden contrast-150 group-hover:grayscale-0`,
                      quicklink?.icon?.invert && "invert",
                    )}
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
              <p className="text-[15px] text-gray-12 mb-1 font-medium line-clamp-2">{quicklink.name}</p>
              {quicklink.description && (
                <p className="text-[13px] text-gray-11 mb-1 last:mb-0 line-clamp-3">{quicklink.description}</p>
              )}
              {quicklink.author && (
                <p className="text-[13px] text-gray-11">
                  <span className="text-gray-10">by </span>
                  {quicklink.author.link ? (
                    <a
                      href={quicklink.author.link}
                      onPointerDown={(e) => e.preventDefault()}
                      className="text-gray-10 hover:text-gray-11 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {quicklink.author.name}
                    </a>
                  ) : (
                    <span className="text-gray-10">{quicklink.author.name}</span>
                  )}
                </p>
              )}
            </div>
            <Dialog>
              <DialogTrigger
                onPointerDown={(e) => e.preventDefault()}
                className="border-t border-gray-4 group-hover:border-[#2A1E48] -mx-4 px-4 -mb-4 h-[28px] flex items-center mt-3 pb-[3px] overflow-hidden text-left w-[calc(100%+32px)] group/footer gap-1 outline-purple rounded-b-xl"
              >
                <span
                  className={`whitespace-nowrap overflow-hidden text-ellipsis w-full block transition-colors duration-150 text-xxs 
                     ${quicklink.isEdited ? "text-purple " : "group-hover/footer:text-white"}
                  `}
                >
                  {quicklink.link}
                </span>
                <span
                  className={cn(
                    quicklink.isEdited
                      ? "text-purple"
                      : "opacity-0 group-hover:opacity-100 group-hover/footer:text-white",
                    "rounded-sm w-4 h-4 flex items-center justify-center shrink-0 -mr-2 transition-colors duration-150",
                  )}
                >
                  <PencilIcon className="w-3" />
                </span>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Edit Quicklink</DialogTitle>
                <DialogDescription className="-mt-2">
                  Make temporary changes before adding it to Raycast. e.g. changing dynamic parameters or the preferred
                  app to open with.
                </DialogDescription>
                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                  <label>
                    <span className="block text-sm text-gray-11 mb-2">Name</span>
                    <Input type="text" name="name" defaultValue={quicklink.name} size="large" className="w-full" />
                  </label>
                  {quicklink.description && (
                    <label>
                      <span className="block text-sm text-gray-11 mb-2">Description</span>
                      <Input
                        type="text"
                        name="description"
                        defaultValue={quicklink.description}
                        size="large"
                        className="w-full"
                      />
                    </label>
                  )}
                  <label>
                    <span className="block text-sm text-gray-11 mb-2">Link</span>
                    <Input type="text" name="link" defaultValue={quicklink.link} size="large" className="w-full" />
                  </label>
                  <label>
                    <span className="block text-sm text-gray-11 mb-2">Open with</span>
                    <Input
                      type="text"
                      name="openWith"
                      defaultValue={quicklink.openWith || "Default"}
                      size="large"
                      className="w-full"
                    />
                    <p className="text-xs text-gray-10 mt-2">
                      Type the application name exactly like it shows up in Finder
                    </p>
                  </label>
                  <div className="flex justify-end">
                    <div className="flex gap-2 flex-row-reverse">
                      <Button type="submit" variant="primary">
                        Save
                      </Button>
                      <DialogClose asChild ref={closeButton}>
                        <Button variant="secondary">Cancel</Button>
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
          <ContextMenu.Item className={styles.contextMenuItem} onSelect={() => handleAddQuicklinkToRaycast(quicklink)}>
            <RaycastLogoNegIcon /> Add to Raycast
          </ContextMenu.Item>
          <ContextMenu.Item className={styles.contextMenuItem} onSelect={() => setIsSelected(!isSelected)}>
            {isSelected ? <MinusCircleIcon /> : <PlusCircleIcon />}
            {isSelected ? "Deselect Quicklink" : "Select Quicklink"}
          </ContextMenu.Item>
          <ContextMenu.Item className={styles.contextMenuItem} onSelect={() => handleCopyUrl()}>
            <LinkIcon /> Copy URL to Share
          </ContextMenu.Item>
          <ContextMenu.Item className={styles.contextMenuItem} onSelect={() => handleCopyLink()}>
            <CopyClipboardIcon /> Copy Quicklink Link
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
