"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/utils/cn";
import { ChevronDownIcon, ChevronUpIcon } from "@raycast/icons";
import { VariantProps, cva } from "class-variance-authority";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectItemText = SelectPrimitive.ItemText;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {
  icon?: React.ElementType;
}

const triggerVariants = cva(
  `gap-1 flex w-full items-center whitespace-nowrap rounded-md text-sm font-normal transition-colors duration-100 overflow-hidden
  focus-visible:outline-none focus-visible:ring-1
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        classic:
          "bg-gray-2 text-gray-a12 border border-gray-a4 hover:border-gray-a6 focus-within:border-gray-a6 ring-transparent",
        soft: "bg-gray-a3 text-gray-a12 border border-gray-a3 hover:border-gray-a5 focus-within:border-gray-a5 ring-transparent",
      },
      size: {
        small: "h-[24px] rounded-md px-2 text-sm",
        medium: "h-[30px] rounded-md px-2 text-sm",
        large: "h-9 px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "classic",
      size: "medium",
    },
  }
);

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  ({ className, variant, size = "medium", children, icon, ...props }, ref) => {
    const IconComponent = icon ?? ChevronDownIcon;
    return (
      <SelectPrimitive.Trigger ref={ref} className={cn(triggerVariants({ variant, size, className }))} {...props}>
        {children}
        <SelectPrimitive.Icon className="ml-auto">
          <IconComponent className="h-4 w-4 opacity-50 " />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "item-aligned", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        `relative z-50 max-h-96 min-w-[6rem] overflow-hidden rounded-md border border-gray-4 bg-panel shadow-lg`,
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs text-gray-8", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      `h-[29px] gap-2 relative flex w-full cursor-default select-none items-center rounded py-1.5 pl-2 pr-8 text-sm outline-none transition-colors 
      focus:bg-gray-a2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      text-gray-10 data-[state=checked]:bg-gray-a3 focus:data-[state=checked]:bg-gray-a3 data-[state=checked]:text-gray-12`,
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-4", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectItemText,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
