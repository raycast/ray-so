"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cn } from "@/utils/cn";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@raycast/icons";
import { VariantProps, cva } from "class-variance-authority";

// ============================================================================
// Root
// ============================================================================

function Combobox<Value, Multiple extends boolean | undefined = false>({
  autoHighlight = true,
  ...props
}: ComboboxPrimitive.Root.Props<Value, Multiple>) {
  return <ComboboxPrimitive.Root autoHighlight={autoHighlight} {...props} />;
}

// ============================================================================
// Trigger
// ============================================================================

const triggerVariants = cva(
  `gap-1 flex w-full items-center whitespace-nowrap rounded-md text-sm font-normal transition-colors duration-100 overflow-hidden cursor-default
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
  },
);

export interface ComboboxTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger>, "className">,
    VariantProps<typeof triggerVariants> {
  className?: string;
  icon?: React.ElementType;
}

const ComboboxTrigger = React.forwardRef<React.ElementRef<typeof ComboboxPrimitive.Trigger>, ComboboxTriggerProps>(
  ({ className, variant, size = "medium", children, icon, ...props }, ref) => {
    const IconComponent = icon ?? ChevronDownIcon;
    return (
      <ComboboxPrimitive.Trigger ref={ref} className={cn(triggerVariants({ variant, size, className }))} {...props}>
        {children}
        <ComboboxPrimitive.Icon className="ml-auto">
          <IconComponent className="h-4 w-4 opacity-50" />
        </ComboboxPrimitive.Icon>
      </ComboboxPrimitive.Trigger>
    );
  },
);
ComboboxTrigger.displayName = "ComboboxTrigger";

// ============================================================================
// Input
// ============================================================================

const inputVariants = cva(`w-full bg-transparent text-inherit outline-none placeholder:text-gray-a8`, {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-sm",
      large: "text-base",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface ComboboxInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>, "className" | "size">,
    VariantProps<typeof inputVariants> {
  className?: string;
}

const ComboboxInput = React.forwardRef<React.ElementRef<typeof ComboboxPrimitive.Input>, ComboboxInputProps>(
  ({ className, size, ...props }, ref) => {
    return <ComboboxPrimitive.Input ref={ref} className={cn(inputVariants({ size, className }))} {...props} />;
  },
);
ComboboxInput.displayName = "ComboboxInput";

// ============================================================================
// Input Container (for standalone input with trigger button)
// ============================================================================

const inputContainerVariants = cva(
  `flex w-full items-center whitespace-nowrap rounded-md text-sm font-normal transition-colors duration-100 overflow-hidden
  focus-within:outline-none focus-within:ring-1
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        classic:
          "bg-gray-2 text-gray-a12 border border-gray-a4 hover:border-gray-a6 focus-within:border-gray-a6 ring-transparent",
        soft: "bg-gray-a3 text-gray-a12 border border-gray-a3 hover:border-gray-a5 focus-within:border-gray-a5 ring-transparent",
      },
      size: {
        small: "h-[24px] rounded-md px-2 text-sm gap-1",
        medium: "h-[30px] rounded-md px-2 text-sm gap-1",
        large: "h-9 px-3 py-2 gap-2",
      },
    },
    defaultVariants: {
      variant: "classic",
      size: "medium",
    },
  },
);

export interface ComboboxInputContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputContainerVariants> {
  icon?: React.ElementType;
}

const ComboboxInputContainer = React.forwardRef<HTMLDivElement, ComboboxInputContainerProps>(
  ({ className, variant, size = "medium", children, icon, ...props }, ref) => {
    const IconComponent = icon ?? ChevronDownIcon;
    return (
      <div ref={ref} className={cn(inputContainerVariants({ variant, size, className }))} {...props}>
        {children}
        <ComboboxPrimitive.Trigger className="ml-auto shrink-0 p-0 bg-transparent border-none cursor-default">
          <ComboboxPrimitive.Icon>
            <IconComponent className="h-4 w-4 opacity-50" />
          </ComboboxPrimitive.Icon>
        </ComboboxPrimitive.Trigger>
      </div>
    );
  },
);
ComboboxInputContainer.displayName = "ComboboxInputContainer";

// ============================================================================
// Value
// ============================================================================

function ComboboxValue<Value>({ children }: { children?: React.ReactNode | ((value: Value) => React.ReactNode) }) {
  return <ComboboxPrimitive.Value>{children}</ComboboxPrimitive.Value>;
}

// ============================================================================
// Content (Portal + Positioner + Popup with Search Input)
// ============================================================================

export interface ComboboxContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Popup>, "className"> {
  className?: string;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  searchPlaceholder?: string;
  showSearchIcon?: boolean;
}

const ComboboxContent = React.forwardRef<React.ElementRef<typeof ComboboxPrimitive.Popup>, ComboboxContentProps>(
  (
    {
      className,
      sideOffset = 4,
      align = "start",
      searchPlaceholder = "Search…",
      showSearchIcon = false,
      children,
      ...props
    },
    ref,
  ) => (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        positionMethod="fixed"
        className="z-50 outline-none"
      >
        <ComboboxPrimitive.Popup
          ref={ref}
          className={cn(
            `relative min-w-[6rem] overflow-hidden rounded-md border border-gray-4 bg-panel shadow-lg
            origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-100
            data-[starting-style]:scale-95 data-[starting-style]:opacity-0
            data-[ending-style]:scale-95 data-[ending-style]:opacity-0`,
            className,
          )}
          {...props}
        >
          {children}
          <div className="border-t border-gray-4 flex items-center gap-2 px-3">
            {showSearchIcon && (
              <div className="flex items-center justify-center w-4 h-4">
                <MagnifyingGlassIcon className="h-3.5 w-3.5 opacity-50 relative left-px" />
              </div>
            )}
            <ComboboxPrimitive.Input
              placeholder={searchPlaceholder}
              className="w-[150px] h-8 text-sm bg-transparent outline-none placeholder:text-gray-a8"
            />
          </div>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  ),
);
ComboboxContent.displayName = "ComboboxContent";

// ============================================================================
// List
// ============================================================================

export interface ComboboxListProps<Value>
  extends Omit<React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.List>, "className" | "children"> {
  className?: string;
  children?: React.ReactNode | ((item: Value, index: number) => React.ReactNode);
}

function ComboboxList<Value>({ className, children, ...props }: ComboboxListProps<Value>) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        "p-1 overflow-y-auto max-h-[min(20rem,calc(var(--available-height)-3rem))] outline-none overscroll-contain scroll-py-1",
        className,
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.List>
  );
}

// ============================================================================
// Group
// ============================================================================

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group>
>(({ className, ...props }, ref) => <ComboboxPrimitive.Group ref={ref} className={cn("", className)} {...props} />);
ComboboxGroup.displayName = "ComboboxGroup";

// ============================================================================
// GroupLabel
// ============================================================================

const ComboboxGroupLabel = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.GroupLabel>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.GroupLabel ref={ref} className={cn("px-2 py-1.5 text-xs text-gray-8", className)} {...props} />
));
ComboboxGroupLabel.displayName = "ComboboxGroupLabel";

// ============================================================================
// Item
// ============================================================================

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Item
    ref={ref}
    className={cn(
      `h-[29px] gap-2 relative flex w-full cursor-default select-none items-center rounded py-1.5 pl-2 pr-8 text-sm outline-none transition-colors 
      data-[highlighted]:bg-gray-a2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      text-gray-10 data-[selected]:bg-gray-a3 data-[highlighted]:data-[selected]:bg-gray-a3 data-[selected]:text-gray-12`,
      className,
    )}
    {...props}
  >
    {children}
  </ComboboxPrimitive.Item>
));
ComboboxItem.displayName = "ComboboxItem";

// ============================================================================
// ItemText (for custom rendering inside items)
// ============================================================================

const ComboboxItemText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn("flex items-center", className)} {...props} />,
);
ComboboxItemText.displayName = "ComboboxItemText";

// ============================================================================
// ItemIndicator
// ============================================================================

const ComboboxItemIndicator = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.ItemIndicator>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.ItemIndicator ref={ref} className={cn("", className)} {...props} />
));
ComboboxItemIndicator.displayName = "ComboboxItemIndicator";

// ============================================================================
// Separator
// ============================================================================

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-4", className)} {...props} />
));
ComboboxSeparator.displayName = "ComboboxSeparator";

// ============================================================================
// Empty
// ============================================================================

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Empty
    ref={ref}
    className={cn("px-2 py-4 text-center text-sm text-gray-8 empty:hidden -mb-2", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = "ComboboxEmpty";

// ============================================================================
// useFilter hook re-export
// ============================================================================

const useComboboxFilter = ComboboxPrimitive.useFilter;

// ============================================================================
// Exports
// ============================================================================

export {
  Combobox,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxInputContainer,
  ComboboxValue,
  ComboboxContent,
  ComboboxList,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxItemText,
  ComboboxItemIndicator,
  ComboboxSeparator,
  ComboboxEmpty,
  useComboboxFilter,
  triggerVariants as comboboxTriggerVariants,
  inputContainerVariants as comboboxInputContainerVariants,
};
