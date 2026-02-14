"use client";

import { useAtom } from "jotai";
import { diffModeAtom } from "../store";
import { Switch } from "@/components/switch";

export function DiffModeControl() {
  const [diffMode, setDiffMode] = useAtom(diffModeAtom);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="diff-mode" className="text-sm text-gray-11 cursor-default">
        Diff
      </label>
      <Switch id="diff-mode" checked={diffMode} onCheckedChange={setDiffMode} />
    </div>
  );
}
