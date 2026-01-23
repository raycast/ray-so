"use client";

import React from "react";
import styles from "./floating-action-bar.module.css";

export interface FloatingAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "primary" | "default";
}

interface FloatingActionBarProps {
  actions: FloatingAction[];
  isVisible: boolean;
}

export function FloatingActionBar({ actions, isVisible }: FloatingActionBarProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.floatingActionBar}>
      {actions.map((action, index) => (
        <button
          key={index}
          className={styles.floatingActionButton}
          data-variant={action.variant || "default"}
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
}
