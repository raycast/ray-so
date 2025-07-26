import React, { PropsWithChildren } from "react";

import styles from "./ControlContainer.module.css";

type PropTypes = {
  title: string;
};

const ControlContainer: React.FC<PropsWithChildren<PropTypes>> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <strong className={styles.controlTitle}>{title}</strong>
      <div className={styles.control}>{children}</div>
    </div>
  );
};

export default ControlContainer;
