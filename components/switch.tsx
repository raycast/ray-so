"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/utils/cn";

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  color?: "blue" | "purple";
};

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, color, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        "inline-flex h-4 w-7 px-[3px] shrink-0 cursor-default items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-7 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#56c2ff] data-[state=unchecked]:bg-gray-7 duration-250",
        color === "purple" ? "data-[state=checked]:bg-purple" : "data-[state=checked]:bg-blue",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-2.5 w-2.5 rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0 duration-250"
        )}
      />
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
