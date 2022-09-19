import React from "react";

import styles from "styles/Frame.module.css";
import Editor from "./Editor";

const Frame: React.FC = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.window}>
        <div className={styles.header}>
          <div className={styles.controls}>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
            <div className={styles.control}></div>
          </div>
          <div className={styles.fileName}>Untitled-1</div>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default Frame;
