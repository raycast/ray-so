"use client";

import React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

import styles from "./Toast.module.css";

type ToastPrimitiveRootProps = React.ComponentProps<typeof ToastPrimitive.Root>;

export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastPrimitiveRootProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <ToastPrimitive.Root {...props} className={styles.root} ref={forwardedRef}>
        {children}
      </ToastPrimitive.Root>
    );
  }
);
Toast.displayName = "Toast";

type ToastPrimitiveViewportProps = React.ComponentProps<typeof ToastPrimitive.Viewport>;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastPrimitiveViewportProps
>((props, forwardedRef) => {
  return <ToastPrimitive.Viewport {...props} className={styles.viewport} ref={forwardedRef} />;
});
ToastViewport.displayName = "ToastViewport";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastTitle = ToastPrimitive.Title;
