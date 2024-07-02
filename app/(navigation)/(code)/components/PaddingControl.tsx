import React from "react";
import { useAtom } from "jotai";
import classNames from "classnames";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import ControlContainer from "./ControlContainer";
import styles from "./PaddingControl.module.css";
import { isPadding, Padding, paddingAtom, PADDING_OPTIONS } from "../store/padding";
import useHotkeys from "../../../../utils/useHotkeys";

const PaddingControl: React.FC = () => {
  const [padding, setPadding] = useAtom(paddingAtom);

  useHotkeys("p", (e) => {
    console.info(e.target);
    const currentIndex = PADDING_OPTIONS.indexOf(padding);
    if (PADDING_OPTIONS[currentIndex + 1]) {
      setPadding(PADDING_OPTIONS[currentIndex + 1]);
    } else {
      setPadding(PADDING_OPTIONS[0]);
    }
  });

  return (
    <ControlContainer title="Padding">
      <ToggleGroup.Root
        className={styles.toggleGroup}
        type="single"
        value={`${padding}`}
        aria-label="Frame Padding"
        onValueChange={(value) => {
          const intValue = parseInt(value, 10);
          if (isPadding(intValue)) {
            setPadding(intValue);
          }
        }}
      >
        {PADDING_OPTIONS.map((paddingOption) => (
          <ToggleGroup.Item
            key={paddingOption}
            className={styles.toggleGroupItem}
            value={`${paddingOption}`}
            aria-label={`${paddingOption}`}
          >
            {paddingOption}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </ControlContainer>
  );
};

export default PaddingControl;
