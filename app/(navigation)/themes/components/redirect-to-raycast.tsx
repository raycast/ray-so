"use client";
import React from "react";
import { Theme } from "@themes/lib/theme";
import { makeRaycastImportUrl } from "@themes/lib/url";

export function RedirectToRaycast({ theme }: { theme: Theme }) {
  React.useEffect(() => {
    console.log("Opening theme in Raycast from redirect");
    window.open(makeRaycastImportUrl(theme));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
