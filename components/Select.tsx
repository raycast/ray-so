import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import ChevronUpIcon from "assets/icons/chevron-up-16.svg";

import styles from "styles/Select.module.css";

type SelectPrimitiveRootProps = React.ComponentProps<
  typeof SelectPrimitive.Root
>;

export const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectPrimitiveRootProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger ref={forwardedRef} className={styles.trigger}>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className={styles.icon}>
          <ChevronUpIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={styles.content}>
          <SelectPrimitive.Viewport className={styles.viewport}>
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

Select.displayName = "Select";

type SelectPrimitiveItemProps = React.ComponentProps<
  typeof SelectPrimitive.Item
>;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectPrimitiveItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item {...props} ref={forwardedRef} className={styles.item}>
      {children}
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "SelectItem";
