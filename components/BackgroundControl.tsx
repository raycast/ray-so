import { useAtom } from "jotai";
import React from "react";
import { showBackgroundAtom } from "../store";
import ControlContainer from "./ControlContainer";
import Toggle from "./Toggle";

const BackgroundControl: React.FC = () => {
  const [showBackground, setShowBackground] = useAtom(showBackgroundAtom);

  return (
    <ControlContainer title="Background">
      <Toggle
        checked={showBackground}
        onChange={(newValue) => {
          setShowBackground(newValue);
        }}
      />
    </ControlContainer>
  );
};

export default BackgroundControl;
