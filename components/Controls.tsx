import React from "react";

import styles from "styles/Controls.module.css";
import ExportButton from "./ExportButton";

const Controls: React.FC = () => {
  return (
    <div className={styles.controls}>
      <ExportButton />
    </div>
  );
};

export default Controls;
