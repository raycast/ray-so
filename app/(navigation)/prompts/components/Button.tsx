import React from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "gray" | "red";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "gray", ...props }, forwardedRef) => (
    <button type="button" className={styles.button} data-variant={variant} {...props} ref={forwardedRef}>
      {children}
    </button>
  )
);

Button.displayName = "Button";
