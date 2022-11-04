import { useAtom } from "jotai";
import React from "react";
import { darkModeAtom } from "../store/themes";
import ControlContainer from "./ControlContainer";
import Toggle from "./Toggle";

const BackgroundControl: React.FC = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <ControlContainer title="Dark mode">
      <Toggle
        checked={darkMode}
        onChange={(newValue) => {
          setDarkMode(newValue);
        }}
      />
    </ControlContainer>
  );
};

export default BackgroundControl;
