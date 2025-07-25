import React from "react";
import { useAtom } from "jotai";
import { tools, CategoryType } from "@/app/lib/tools";
import { selectedToolsAtom, addToolAtom, removeToolAtom } from "../store/selectedTools";
import styles from "./TechStackSelector.module.css";

const TechStackSelector: React.FC = () => {
  const [selectedTools] = useAtom(selectedToolsAtom);
  const [, addTool] = useAtom(addToolAtom);
  const [, removeTool] = useAtom(removeToolAtom);

  const categories: { key: CategoryType; label: string }[] = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "database", label: "Database" },
    { key: "infra", label: "Infrastructure" },
    { key: "devops", label: "DevOps" },
  ];

  const isSelected = (toolId: number) => {
    return selectedTools.some((tool) => tool.id === toolId);
  };

  const handleToolClick = (tool: any) => {
    if (isSelected(tool.id)) {
      removeTool(tool.id);
    } else {
      addTool(tool);
    }
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Tech Stack</h2>

      {categories.map(({ key, label }) => (
        <div key={key} className={styles.category}>
          <h3 className={styles.categoryTitle}>{label}</h3>
          <div className={styles.toolGrid}>
            {tools[key].map((tool) => (
              <button
                key={tool.id}
                className={`${styles.toolButton} ${isSelected(tool.id) ? styles.selected : ""}`}
                onClick={() => handleToolClick(tool)}
                title={tool.name}
              >
                <img src={tool.icon} alt={tool.name} className={styles.toolIcon} />
                <span className={styles.toolName}>{tool.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechStackSelector;
