import classNames from "classnames";
import React, { FormEventHandler } from "react";
import * as Switch from "@radix-ui/react-switch";

import styles from "../styles/Toggle.module.css";

type PropTypes = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};
const Toggle: React.FC<PropTypes> = ({ checked, onCheckedChange }) => {
  return (
    <Switch.Root className={styles.switchRoot} checked={checked} onCheckedChange={onCheckedChange}>
      <Switch.Thumb className={styles.switchThumb} />
    </Switch.Root>
  );
};

export default Toggle;
