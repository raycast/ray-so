import React from "react";

import FocusTrap from "focus-trap-react";

import styles from "styles/Controls.module.css";
import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import ExportButton from "./ExportButton";
import LanguageControl from "./LanguageControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";

const Controls: React.FC = () => {
  return (
    <FocusTrap>
      <div className={styles.controls}>
        <ThemeControl />
        <BackgroundControl />
        <DarkModeControl />
        <PaddingControl />
        <LanguageControl />
        <ExportButton />
      </div>
    </FocusTrap>
  );
};

export default Controls;
