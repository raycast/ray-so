"use client";

import { Button } from "@/components/button";
import useHotkeys from "@/utils/useHotkeys";
import { DownloadIcon } from "@raycast/icons";
import { useState } from "react";
import { TypingExportDialog } from "@code/components/TypingExportDialog";

export function VideoExportButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  useHotkeys("ctrl+k,cmd+k", (event) => {
    event.preventDefault();
    setDialogOpen((open) => !open);
  });

  return (
    <>
      <Button onClick={() => setDialogOpen(true)} variant="primary" aria-label="Export as video">
        <DownloadIcon className="w-4 h-4" />
        Export <span className="hidden md:inline-block">Video</span>
      </Button>
      <TypingExportDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
