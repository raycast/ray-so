import classNames from "classnames";
import React from "react";

import styles from "styles/Toggle.module.css";

type PropTypes = {
  checked: boolean;
  onChange: (newValue: boolean) => void;
};
const Toggle: React.FC<PropTypes> = ({ checked, onChange }) => {
  return (
    <label className={classNames(styles.toggle, { [styles.checked]: checked })}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />
      <svg
        width="28"
        height="16"
        viewBox="0 0 28 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="28"
          height="16"
          rx="8"
          className={styles.frame}
        ></rect>
        <circle
          cx="9"
          cy="8"
          r="5"
          fill="white"
          className={styles.circle}
        ></circle>
      </svg>
    </label>
  );
};

export default Toggle;
