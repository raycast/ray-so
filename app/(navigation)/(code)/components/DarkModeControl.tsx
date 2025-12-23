import { useAtomValue, useSetAtom } from "jotai";
import React, { useCallback } from "react";
import { darkModeAtom, themeAtom, themeDarkModeAtom } from "../store/themes";
import useHotkeys from "../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";

const BackgroundControl: React.FC = () => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const setDarkMode = useSetAtom(darkModeAtom);
  const theme = useAtomValue(themeAtom);

  const hasLightMode = !!theme.syntax.light;
  const hasDarkMode = !!theme.syntax.dark;
  const canToggle = hasLightMode && hasDarkMode;

  const toggleDarkMode = useCallback(() => {
    if (canToggle) {
      setDarkMode((old) => !old);
    }
  }, [canToggle, setDarkMode]);

  useHotkeys("d", toggleDarkMode);

  return (
    <ControlContainer title="Dark mode">
      <Switch checked={darkMode} onCheckedChange={setDarkMode} disabled={!canToggle} />
    </ControlContainer>
  );
};

export default BackgroundControl;
