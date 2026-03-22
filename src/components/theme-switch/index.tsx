"use client";

import { useTheme } from "next-themes";
import { useId, useState } from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { LayerMask01Icon } from "@hugeicons/core-free-icons";

export default function ThemeSwitch() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const [system, setSystem] = useState(false);

  const smartToggle = () => {
    /* The smart toggle by @nrjdalal */
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme === "system") {
      setTheme(prefersDarkScheme ? "light" : "dark");
      setSystem(false);
    } else if ((theme === "light" && !prefersDarkScheme) || (theme === "dark" && prefersDarkScheme)) {
      setTheme(theme === "light" ? "dark" : "light");
      setSystem(false);
    } else {
      setTheme("system");
      setSystem(true);
    }
  };

  return (
    <Button className="relative size-8" onClick={smartToggle} size="icon" title="Toggle theme" variant="outline">
      <HugeiconsIcon className="-rotate-45 size-4" icon={LayerMask01Icon} strokeWidth={2} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
