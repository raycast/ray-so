"use client";

import FormatButton from "@code/components/FormatCodeButton";
import { InfoDialog } from "@code/components/InfoDialog";
import { CodeWorkspace } from "../shared/CodeWorkspace";
import { ModeSwitcherButton } from "../shared/ModeSwitcherButton";
import { VideoExportButton } from "./VideoExportButton";

export function CodeVideosApp() {
  return (
    <CodeWorkspace
      actions={
        <>
          <InfoDialog mode="videos" />
          <ModeSwitcherButton href="/" label="Code Images" />
          <FormatButton />
          <VideoExportButton />
        </>
      }
    />
  );
}
