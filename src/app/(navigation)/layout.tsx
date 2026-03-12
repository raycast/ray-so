import React from "react";
import { cn } from "@/lib/utils";
import fonts from "@/components/fonts";
import CodeLayoutClient from "./layout.client";

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("h-screen flex flex-col", fonts)}>
      <main className="layout-fill">
        <CodeLayoutClient>{children}</CodeLayoutClient>
      </main>
    </div>
  );
}
