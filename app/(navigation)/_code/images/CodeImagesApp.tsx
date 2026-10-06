"use client";

import ExportButton from "@code/components/ExportButton";
import FormatButton from "@code/components/FormatCodeButton";
import { InfoDialog } from "@code/components/InfoDialog";
import { CodeWorkspace } from "../shared/CodeWorkspace";
import { ModeSwitcherButton } from "../shared/ModeSwitcherButton";

export function CodeImagesApp() {
  return (
    <CodeWorkspace
      actions={
        <>
          <InfoDialog mode="images" />
          <ModeSwitcherButton href="/videos" label="Code Videos" />
          <FormatButton />
          <ExportButton />
        </>
      }
    />
  );
}
