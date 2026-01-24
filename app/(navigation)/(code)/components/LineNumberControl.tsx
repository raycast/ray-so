import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useCallback } from "react";
import useHotkeys from "../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";
import { showLineNumbersAtom } from "../store";
import { themeAtom, themeLineNumbersAtom } from "../store/themes";

const LineNumberControl: React.FC = () => {
  const theme = useAtomValue(themeAtom);
  const showLineNumbers = useAtomValue(themeLineNumbersAtom);
  const setShowLineNumbers = useSetAtom(showLineNumbersAtom);
  const isDisabled = theme.partner && !theme.lineNumbersToggleable;
  const toggleShowLineNumbers = useCallback(() => {
    if (isDisabled) return;
    setShowLineNumbers((old) => !old);
  }, [setShowLineNumbers, isDisabled]);

  useHotkeys("n", toggleShowLineNumbers);

  return (
    <ControlContainer title="Line numbers">
      <Switch checked={showLineNumbers} onCheckedChange={setShowLineNumbers} disabled={isDisabled} />
    </ControlContainer>
  );
};

export default LineNumberControl;
