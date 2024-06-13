import React from "react";
import cn from "classnames";

import styles from "./Button.module.css";

type PropTypes = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

const variants = {
  primary: "primary",
  secondary: "secondary",
};

const Button: React.FC<PropTypes> = ({ children, variant, className, ...props }) => {
  return (
    <button
      className={cn(className, styles.button, {
        [styles.primary]: variant === variants.primary,
        [styles.secondary]: variant === variants.secondary,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
