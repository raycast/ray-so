import React from "react";

import styles from "styles/Controls.module.css";
import BackgroundControl from "./BackgroundControl";
import ExportButton from "./ExportButton";
import LanguageControl from "./LanguageControl";
import PaddingControl from "./PaddingControl";

const Controls: React.FC = () => {
  return (
    <div className={styles.controls}>
      <BackgroundControl />
      <PaddingControl />
      <LanguageControl />
      <ExportButton />
    </div>
  );
};

export default Controls;
