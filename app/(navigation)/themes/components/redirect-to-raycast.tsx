"use client";
import React from "react";
import { Theme } from "@themes/lib/theme";
import { BuildTypes, makeRaycastImportUrl } from "@themes/lib/url";

export function RedirectToRaycast({ theme, build }: { theme: Theme; build?: BuildTypes }) {
  React.useEffect(() => {
    console.log("Opening theme in Raycast from redirect");
    window.open(makeRaycastImportUrl(theme, build));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
