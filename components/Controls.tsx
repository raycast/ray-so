import React from "react";

import styles from "styles/Controls.module.css";
import ExportButton from "./ExportButton";
import PaddingControl from "./PaddingControl";

const Controls: React.FC = () => {
  return (
    <div className={styles.controls}>
      <PaddingControl />
      <ExportButton />
    </div>
  );
};

export default Controls;
