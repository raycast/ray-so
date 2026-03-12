import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import React from "react";
import { cn } from "@/lib/utils";
import EditorProvider from "./store/providers/editor";

export default function CodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative layout-fill">
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[20px_20px]",
            "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <EditorProvider>{children}</EditorProvider>
      </div>
    </>
  );
}
