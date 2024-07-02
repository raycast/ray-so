"use client";

import React from "react";
import { Theme } from "@themes/lib/theme";

type LastVisitedThemeContextType = {
  previousActiveTheme: Theme | undefined;
  setPreviousActiveTheme: (theme: Theme | undefined) => void;
};

export const LastVisitedThemeContext = React.createContext<LastVisitedThemeContextType>({
  previousActiveTheme: undefined,
  setPreviousActiveTheme: () => {},
});

export function LastVisitedThemeProvider({ children }: { children: React.ReactNode; themes: Theme[] }) {
  const [previousActiveTheme, setPreviousActiveTheme] = React.useState<Theme | undefined>(undefined);

  return (
    <LastVisitedThemeContext.Provider value={{ previousActiveTheme, setPreviousActiveTheme }}>
      {children}
    </LastVisitedThemeContext.Provider>
  );
}

export function useLastVisitedTheme() {
  const { previousActiveTheme, setPreviousActiveTheme } = React.useContext(LastVisitedThemeContext);
  return { previousActiveTheme, setPreviousActiveTheme };
}
