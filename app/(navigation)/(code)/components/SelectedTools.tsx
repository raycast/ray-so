import React from "react";
import { useAtom } from "jotai";
import { selectedToolsAtom, removeToolAtom } from "../store/selectedTools";
import styles from "./SelectedTools.module.css";

const SelectedTools: React.FC = () => {
  const [selectedTools] = useAtom(selectedToolsAtom);
  const [, removeTool] = useAtom(removeToolAtom);

  const handleToolClick = (toolId: number) => {
    removeTool(toolId);
  };

  if (selectedTools.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>📦</div>
          <h3 className={styles.emptyTitle}>Select tools to build your tech stack</h3>
          <p className={styles.emptyDescription}>Choose from the sidebar to add tools to your stack visualization</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      <div className={styles.toolsGrid}>
        {selectedTools.map((tool) => (
          <div
            key={tool.id}
            className={styles.toolCard}
            onClick={() => handleToolClick(tool.id)}
            title={`${tool.name} - Click to remove`}
          >
            <img src={tool.icon} alt={tool.name} className={styles.toolIcon} />
            <span className={styles.toolName}>{tool.name}</span>
            <button className={styles.removeButton} aria-label="Remove tool">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTools;
