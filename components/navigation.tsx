"use client";

import { cn } from "@/utils/cn";

export function Navigation() {
  return (
    <nav className="flex items-center gap-3 h-[50px] pl-4 pr-5 bg-gray-2 text-white w-full fixed z-10">
      <div className={cn("flex items-center gap-3 transition-transform ease-in-out")}>
        <h1 className="text-2xl font-bold">Tech Stacker</h1>
      </div>
    </nav>
  );
}

export function NavigationActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10 left-44",
        className,
      )}
    >
      {children}
    </div>
  );
}
