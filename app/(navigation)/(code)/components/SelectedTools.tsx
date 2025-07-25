import React from "react";
import { useAtom } from "jotai";
import { selectedToolsAtom, removeToolAtom } from "../store/selectedTools";
import { tools, CategoryType } from "@/app/lib/tools";
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

  // Define categories in the same order as the sidebar
  const categories: { key: CategoryType; label: string }[] = [
    { key: "frontend", label: "Frontend" },
    { key: "backend", label: "Backend" },
    { key: "database", label: "Database" },
    { key: "infra", label: "Infrastructure" },
    { key: "devops", label: "DevOps" },
  ];

  // Group selected tools by category
  const groupedTools = categories.reduce(
    (acc, category) => {
      const categoryTools = selectedTools.filter((selectedTool) =>
        tools[category.key].some((tool) => tool.id === selectedTool.id),
      );

      if (categoryTools.length > 0) {
        acc[category.key] = {
          label: category.label,
          tools: categoryTools,
        };
      }

      return acc;
    },
    {} as Record<CategoryType, { label: string; tools: typeof selectedTools }>,
  );

  return (
    <div className={styles.canvas}>
      <div className={styles.categoriesContainer}>
        {Object.entries(groupedTools).map(([categoryKey, { label, tools: categoryTools }]) => (
          <div key={categoryKey} className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>{label}</h3>
            <div className={styles.toolsGrid}>
              {categoryTools.map((tool) => (
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
        ))}
      </div>
    </div>
  );
};

export default SelectedTools;
