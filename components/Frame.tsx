import React from "react";

import styles from "styles/Frame.module.css";
import Editor from "./Editor";

const Frame: React.FC = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.window}>
        <Editor />
      </div>
    </div>
  );
};

export default Frame;
