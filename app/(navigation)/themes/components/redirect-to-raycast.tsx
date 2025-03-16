"use client";
import React from "react";
import { Theme } from "@themes/lib/theme";
import { makeRaycastImportUrl } from "@themes/lib/url";

export function RedirectToRaycast({ theme }: { theme: Theme }) {
  React.useEffect(() => {
    async function openImportUrl() {
      console.log("Opening theme in Raycast from redirect");
      const importUrl = await makeRaycastImportUrl(theme);
      window.open(importUrl);
    }
    openImportUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
