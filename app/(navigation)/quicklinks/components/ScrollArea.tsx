"use client";

import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import styles from "./ScrollArea.module.css";

type ScrollAreaPrimitiveRootProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root>;

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaPrimitiveRootProps
>(({ children }, forwardedRef) => (
  <ScrollAreaPrimitive.Root className={styles.root} ref={forwardedRef}>
    <ScrollAreaPrimitive.Viewport className={styles.viewport}>{children}</ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar className={styles.scrollbar} orientation="vertical">
      <ScrollAreaPrimitive.Thumb className={styles.thumb} />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar className={styles.scrollbar} orientation="horizontal">
      <ScrollAreaPrimitive.Thumb className={styles.thumb} />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = "ScrollArea";
