import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-100
  focus-visible:outline-none focus-visible:ring-1
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary:
          "bg-brand/15 text-brand hover:bg-brand/30 shadow-[inset_0_0_0_1px_#4d2a2a] hover:shadow-[inset_0_0_0_1px_#6d2d2d] focus-visible:ring-[#6d2d2d] focus-visible:shadow-[inset_0_0_0_1px_#6d2d2d]",
        secondary:
          "bg-gray-3 text-gray-11 hover:bg-gray-4 hover:text-gray-12 shadow-[inset_0_0_0_1px_var(--gray-5)] focus-visible:ring-gray-7 focus-visible:shadow-[inset_0_0_0_1px_var(--gray-7)]",
        transparent: "text-gray-11 hover:bg-gray-4 hover:text-gray-12 focus-visible:ring-gray-7 focus-visible:ring-2",
      },
      size: {
        medium: "h-[30px] rounded-md px-3 text-sm gap-1.5",
        large: "h-9 px-4 py-2 gap-1.5",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
