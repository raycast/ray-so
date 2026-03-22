"use client";

import React, { CSSProperties } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/utils/cn";

type ScrollAreaPrimitiveRootProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root>;

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaPrimitiveRootProps
>(({ children, className }, forwardedRef) => (
  <ScrollAreaPrimitive.Root className={cn("overflow-hidden w-full h-full rounded", className)} ref={forwardedRef}>
    <ScrollAreaPrimitive.Viewport className="w-full h-full rounded-inherit">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      className="flex p-[3px] touch-none transition-colors duration-160 ease-out select-none w-[10px]"
      orientation="vertical"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-white/10 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-full before:min-w-[44px] before:h-full before:min-h-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar
      className="flex flex-col p-[3px] touch-none transition-colors duration-160 ease-out select-none h-[10px]"
      orientation="horizontal"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-white/10 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-full before:min-w-[44px] before:h-full before:min-h-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = "ScrollArea";
