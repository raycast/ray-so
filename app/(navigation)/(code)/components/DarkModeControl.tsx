import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { darkModeAtom } from "../store/themes";
import useHotkeys from "../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";

const BackgroundControl: React.FC = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const toggleDarkMode = useCallback(() => setDarkMode((old) => !old), [setDarkMode]);

  useHotkeys("d", toggleDarkMode);

  return (
    <ControlContainer title="Dark mode">
      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
    </ControlContainer>
  );
};

export default BackgroundControl;
