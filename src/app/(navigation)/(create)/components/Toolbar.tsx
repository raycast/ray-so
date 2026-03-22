"use client";

import { Button } from "@/components/ui/button";
import { CopyPlus, Plus, Trash2 } from "lucide-react";
import { Toolbar, ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAtomValue, useSetAtom } from "jotai";
import { createSlideAtom, deleteSlideAtom, duplicateSlideAtom, slidesAtom } from "../store/editor";

export default function ToolbarParticle() {
  const slides = useAtomValue(slidesAtom);
  const createSlide = useSetAtom(createSlideAtom);
  const duplicateSlide = useSetAtom(duplicateSlideAtom);
  const deleteSlide = useSetAtom(deleteSlideAtom);

  const onCreateSlide = () => {
    createSlide({
      id: crypto.randomUUID(),
      name: "New Slide",
      background: {},
      elements: [],
    });
  };

  return (
    <TooltipProvider>
      <Toolbar>
        <ToolbarGroup>
          {/* Delete */}
          {slides?.length > 1 && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label="Delete slide"
                    render={<Button size="icon-sm" variant="outline" onClick={deleteSlide} />}
                  >
                    <Trash2 className="text-accent-foreground" />
                  </ToolbarButton>
                }
              />
              <TooltipPopup sideOffset={8}>Delete</TooltipPopup>
            </Tooltip>
          )}
          {/* Duplicate */}
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Duplicate slide"
                  render={<Button size="icon-sm" variant="outline" onClick={duplicateSlide} />}
                >
                  <CopyPlus className="text-accent-foreground" />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Duplicate</TooltipPopup>
          </Tooltip>

          {/* Add Slide */}
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Add slide"
                  render={<Button size="icon-sm" variant="outline" onClick={onCreateSlide} />}
                >
                  <Plus className="text-accent-foreground" />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Add Slide</TooltipPopup>
          </Tooltip>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  );
}
