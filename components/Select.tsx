import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import classNames from "classnames";

import ChevronUpIcon from "../assets/icons/chevron-up-16.svg";

import styles from "../styles/Select.module.css";

type SelectPrimitiveRootProps = React.ComponentProps<typeof SelectPrimitive.Root>;

export const Select = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectPrimitiveRootProps>(
  ({ children, ...props }, forwardedRef) => {
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
            <SelectPrimitive.Viewport className={styles.viewport}>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

Select.displayName = "Select";

type SelectPrimitiveItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;

export const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectPrimitiveItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item {...props} ref={forwardedRef} className={styles.item}>
        {children}
      </SelectPrimitive.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={classNames(styles.separator, className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Group ref={ref} className={classNames(styles.group, className)} {...props} />
));
SelectGroup.displayName = SelectPrimitive.Group.displayName;

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={classNames(styles.label, className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
