import React from "react";

import styles from "./Controls.module.css";
import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import ExportButton from "./ExportButton";
import LanguageControl from "./LanguageControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";
import LineNumberControl from "./LineNumberControl";
import EmitCodeControl from "@code/components/EmitCodeControl";

const Controls: React.FC = () => {
  return (
    <div className={styles.controls}>
      <ThemeControl />
      <BackgroundControl />
      <DarkModeControl />
      <LineNumberControl />
      <PaddingControl />
      <LanguageControl />
      <EmitCodeControl />
    </div>
  );
};

export default Controls;
