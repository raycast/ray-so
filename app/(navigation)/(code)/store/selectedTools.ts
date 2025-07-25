import { atom } from "jotai";
import { Tool } from "@/app/lib/tools";

// Atom to store selected tools
export const selectedToolsAtom = atom<Tool[]>([]);

// Atom to add a tool to the selection
export const addToolAtom = atom(null, (get, set, tool: Tool) => {
  const currentTools = get(selectedToolsAtom);
  // Only add if not already selected
  if (!currentTools.find((t) => t.id === tool.id)) {
    set(selectedToolsAtom, [...currentTools, tool]);
  }
});

// Atom to remove a tool from the selection
export const removeToolAtom = atom(null, (get, set, toolId: number) => {
  const currentTools = get(selectedToolsAtom);
  set(
    selectedToolsAtom,
    currentTools.filter((t) => t.id !== toolId),
  );
});

// Atom to clear all selected tools
export const clearSelectedToolsAtom = atom(null, (get, set) => {
  set(selectedToolsAtom, []);
});
