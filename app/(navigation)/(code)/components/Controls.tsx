import React from "react";

import styles from "./Controls.module.css";
import BackgroundControl from "./BackgroundControl";
import DarkModeControl from "./DarkModeControl";
import ExportButton from "./ExportButton";
import LanguageControl from "./LanguageControl";
import PaddingControl from "./PaddingControl";
import ThemeControl from "./ThemeControl";
import LineNumberControl from "./LineNumberControl";
import { InfoDialog } from "./InfoDialog";
import FormatButton from "./FormatCodeButton";

const Controls: React.FC = () => {
  return (
    <div className={styles.controls}>
      <ThemeControl />
      <BackgroundControl />
      <DarkModeControl />
      <LineNumberControl />
      <PaddingControl />
      <LanguageControl />
      <FormatButton />
      <InfoDialog />
      <ExportButton />
    </div>
  );
};

export default Controls;
