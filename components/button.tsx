import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-100 overflow-hidden
  focus-visible:outline-none focus-visible:ring-1 hover:cursor-default
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary:
          "bg-brand/15 text-brand hover:bg-brand/30 shadow-[inset_0_0_0_1px_#4d2a2a] hover:shadow-[inset_0_0_0_1px_#6d2d2d] focus-visible:ring-[#6d2d2d] focus-visible:shadow-[inset_0_0_0_1px_#6d2d2d]",
        secondary:
          "bg-gray-a3 text-gray-a11 hover:bg-gray-a4 hover:text-gray-12 shadow-[inset_0_0_0_1px_var(--gray-a2)] focus-visible:ring-gray-a7 focus-visible:shadow-[inset_0_0_0_1px_var(--gray-a7)]",
        transparent:
          "text-gray-a11 hover:bg-gray-a4 hover:text-gray-12 focus-visible:ring-gray-a7 focus-visible:ring-2",
      },
      size: {
        medium: "h-[30px] rounded-md px-3 text-sm gap-1.5",
        large: "h-9 px-4 py-2 gap-1.5",
      },
      iconOnly: {
        true: "p-0",
      },
    },
    compoundVariants: [
      {
        size: "medium",
        iconOnly: true,
        className: "w-[30px] h-[30px]",
      },
      {
        size: "large",
        iconOnly: true,
        className: "w-9 h-9",
      },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "medium",
      iconOnly: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className, iconOnly }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
