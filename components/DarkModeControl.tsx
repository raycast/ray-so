import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { darkModeAtom } from "../store/themes";
import useHotkeys from "../util/useHotkeys";
import ControlContainer from "./ControlContainer";
import Toggle from "./Toggle";

const BackgroundControl: React.FC = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const toggleDarkMode = useCallback(() => setDarkMode((old) => !old), [setDarkMode]);

  useHotkeys("d", toggleDarkMode);

  return (
    <ControlContainer title="Dark mode">
      <Toggle checked={darkMode} onCheckedChange={setDarkMode} />
    </ControlContainer>
  );
};

export default BackgroundControl;
