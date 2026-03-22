import React from "react";
import { cn } from "@/utils/cn";
import fonts from "@/fonts/global";
import CodeLayoutClient from "./layout.client";
import c from "@/fonts/editor";
import FrameContextProvider from "./(create)/store/context/frame";
import EditorProvider from "./(create)/store/providers/editor";

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <FrameContextProvider>
      <EditorProvider>
        <div className={cn("h-screen flex flex-col", fonts, c)}>
          <main className="layout-fill">
            <CodeLayoutClient>{children}</CodeLayoutClient>
          </main>
        </div>
      </EditorProvider>
    </FrameContextProvider>
  );
}
