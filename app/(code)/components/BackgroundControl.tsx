import { useAtom } from "jotai";
import React from "react";
import { showBackgroundAtom } from "../store";
import useHotkeys from "../util/useHotkeys";
import ControlContainer from "./ControlContainer";
import Toggle from "./Toggle";

const BackgroundControl: React.FC = () => {
  const [showBackground, setShowBackground] = useAtom(showBackgroundAtom);

  useHotkeys("b", () => {
    setShowBackground((old) => !old);
  });

  return (
    <ControlContainer title="Background">
      <Toggle checked={showBackground} onCheckedChange={setShowBackground} />
    </ControlContainer>
  );
};

export default BackgroundControl;
