import React from "react";

import styles from "./Controls.module.css";
import AddCodeBlockButton from "./AddCodeBlockButton";
import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import LanguageControl from "./LanguageControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";
import LineNumberControl from "./LineNumberControl";

const Controls: React.FC = () => {
  return (
    <div className={styles.controlsDock}>
      <div className={styles.controls}>
        <ThemeControl />
        <BackgroundControl />
        <DarkModeControl />
        <LineNumberControl />
        <PaddingControl />
        <LanguageControl />
      </div>
      <AddCodeBlockButton />
    </div>
  );
};

export default Controls;
