"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import styles from "./Dialog.module.css";
import { ScrollArea } from "./ScrollArea";
import { XMarkCircleIcon } from "@raycast/icons";

type DialogPrimitiveContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  centered?: boolean;
};

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogPrimitiveContentProps
>(({ children, showCloseButton, centered, className, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={styles.overlay} />
    <DialogPrimitive.Content
      {...props}
      className={styles.content + " " + className}
      data-centered={centered}
      ref={forwardedRef}
    >
      <ScrollArea>
        <div className={styles.inner}>
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close className={styles.close}>
              <XMarkCircleIcon width={24} height={24} />
            </DialogPrimitive.Close>
          )}
        </div>
      </ScrollArea>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = "Dialog";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;
