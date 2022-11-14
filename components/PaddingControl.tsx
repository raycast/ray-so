import classNames from "classnames";
import React from "react";
import ControlContainer from "./ControlContainer";

import styles from "styles/PaddingControl.module.css";
import { useAtom } from "jotai";
import { paddingAtom, PADDING_OPTIONS } from "../store/padding";
import useHotkeys from "../util/useHotkeys";

const PaddingControl: React.FC = () => {
  const [padding, setPadding] = useAtom(paddingAtom);

  useHotkeys("p", () => {
    const currentIndex = PADDING_OPTIONS.indexOf(padding);
    if (PADDING_OPTIONS[currentIndex + 1]) {
      setPadding(PADDING_OPTIONS[currentIndex + 1]);
    } else {
      setPadding(PADDING_OPTIONS[0]);
    }
  });

  return (
    <ControlContainer title="Padding">
      <div className={styles.container}>
        {PADDING_OPTIONS.map((paddingOption) => (
          <a
            href=""
            key={paddingOption}
            className={classNames(styles.option, {
              [styles.selected]: paddingOption === padding,
            })}
            onClick={(event) => {
              event.preventDefault();
              setPadding(paddingOption);
            }}
          >
            {paddingOption}
          </a>
        ))}
      </div>
    </ControlContainer>
  );
};

export default PaddingControl;
