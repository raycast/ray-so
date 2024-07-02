import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { Children, InputHTMLAttributes } from "react";

const inputVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal transition-colors duration-100 overflow-hidden
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
        medium: "h-[30px] rounded-md px-2 text-sm gap-2",
        large: "h-9 px-3 py-2 gap-3",
      },
    },
    defaultVariants: {
      variant: "classic",
      size: "medium",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <label className={cn(inputVariants({ variant, size, className }))}>
        <input ref={ref} className="outline-none w-full bg-transparent text-inherit" {...props} />
        {children}
      </label>
    );
  }
);
Input.displayName = "Input";

type SlotProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right";
};

const InputSlot = React.forwardRef<HTMLDivElement, SlotProps>(({ className, side = "right", ...props }, ref) => {
  return (
    <div
      className={cn(
        "shrink-0 text-gray-a10",
        side === "right" && "-order-none",
        side === "left" && "-order-1",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

InputSlot.displayName = "InputSlot";

export { Input, inputVariants, InputSlot };
