import classNames from "classnames";
import React from "react";
import ControlContainer from "./ControlContainer";

import styles from "styles/PaddingControl.module.css";
import { useAtom } from "jotai";
import { paddingAtom, PADDING_OPTIONS } from "../store/padding";

const PaddingControl: React.FC = () => {
  const [padding, setPadding] = useAtom(paddingAtom);

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
