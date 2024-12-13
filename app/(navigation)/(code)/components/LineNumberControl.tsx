import { useAtom } from "jotai";
import React, { useCallback } from "react";
import useHotkeys from "../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";
import { showLineNumbersAtom } from "../store";

const LineNumberControl: React.FC = () => {
  const [showLineNumber, setShowLineNumber] = useAtom(showLineNumbersAtom);

  const toggleShowLineNumber = useCallback(() => setShowLineNumber((old) => !old), [setShowLineNumber]);

  useHotkeys("n", toggleShowLineNumber);

  return (
    <ControlContainer title="Line number">
      <Switch checked={showLineNumber} onCheckedChange={setShowLineNumber} />
    </ControlContainer>
  );
};

export default LineNumberControl;
