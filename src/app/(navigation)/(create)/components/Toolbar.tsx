"use client";

import { Copy, CopyPlus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Toolbar, ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useEditor from "../store/hooks/use-editor";
import { useSelection } from "../store/hooks/use-selection";

export default function ToolbarParticle() {
  const { slideId, selectSlide } = useSelection();
  const { createSlide, duplicateSlide, deleteSlide, state } = useEditor();

  const handleAddSlide = () => {
    createSlide({
      id: crypto.randomUUID(),
      name: "New Slide",
      background: {},
      elements: [],
    });
  };

  const handleDuplicateSlide = () => {
    if (!slideId) return;
    duplicateSlide(slideId);
  };

  const handleDeleteSlide = () => {
    if (!slideId) return;

    const nextSlideId = Object.values(state.slides).find((slide) => slide.id !== slideId)?.id;
    deleteSlide(slideId);
    // Automaticaly selct next slide after deletion
    selectSlide(nextSlideId!);
  };

  return (
    <TooltipProvider>
      <Toolbar>
        <ToolbarGroup>
          {/* Delete */}
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Delete slide"
                  render={<Button size="icon-sm" variant="outline" onClick={handleDeleteSlide} />}
                >
                  <Trash2 className="text-accent-foreground" />
                </ToolbarButton>
              }
            />
            <TooltipPopup sideOffset={8}>Delete</TooltipPopup>
          </Tooltip>

          {/* Duplicate */}
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Duplicate slide"
                  render={<Button size="icon-sm" variant="outline" onClick={handleDuplicateSlide} />}
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
                  render={<Button size="icon-sm" variant="outline" onClick={handleAddSlide} />}
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
