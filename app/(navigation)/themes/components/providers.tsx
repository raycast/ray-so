"use client";
import { LastVisitedThemeProvider } from "@themes/components/navigation-history";
import { RaycastThemeProvider } from "@themes/components/raycast-theme-provider";
import { Theme } from "@themes/lib/theme";

export function Providers({ children, themes }: { children: React.ReactNode; themes: Theme[] }) {
  return (
    <RaycastThemeProvider>
      <LastVisitedThemeProvider themes={themes}>{children}</LastVisitedThemeProvider>
    </RaycastThemeProvider>
  );
}
