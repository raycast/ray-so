"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";

import styles from "./presets.module.css";
import { ScrollArea } from "../components/ScrollArea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { ChevronDownIcon, Info01Icon, LinkIcon, PlusCircleIcon, StarsIcon } from "@raycast/icons";
import { PresetComponent } from "../components/Preset";
import { Category, categories } from "../presets";
import { AiModel } from "../api";
import { Switch } from "@/components/switch";
import { NavigationActions } from "@/components/navigation";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";

type Props = {
  models: AiModel[];
};

export default function Presets({ models }: Props) {
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });

  const [showAdvancedModels, setShowAdvancedModels] = React.useState(true);

  const advancedModels = models.filter((model) => model.requires_better_ai).map((model) => model.model);

  const filteredCategories = React.useMemo(() => {
    if (showAdvancedModels) {
      return categories;
    } else {
      return categories
        .map((category) => ({
          ...category,
          presets: category.presets.filter((preset) => {
            const presetObj = models.find((model) => model.id === preset.model);
            return !advancedModels.includes(presetObj?.model || "");
          }),
        }))
        .filter((category) => category.presets.length > 0);
    }
  }, [showAdvancedModels, advancedModels, models]);

  React.useEffect(() => {
    setEnableViewObserver(true);
  }, []);

  return (
    <>
      <NavigationActions>
        <div className="flex gap-2 sm:hidden">
          <Button variant="primary" disabled>
            <LinkIcon /> Copy URL to Share
          </Button>
        </div>

        <div className="sm:flex gap-2 hidden ">
          <KeyboardShortcuts />
          <ButtonGroup>
            <Button variant="primary" disabled>
              <PlusCircleIcon /> Add to Raycast
            </Button>

            <Button variant="primary" disabled aria-label="Export options">
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
        </div>
      </NavigationActions>
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <ScrollArea>
              <div className={styles.sidebarContent}>
                <div className={styles.sidebarNav}>
                  <p className={styles.sidebarTitle}>Categories</p>

                  {categories.map((category) => (
                    <NavItem
                      key={category.slug}
                      category={category}
                      disabled={!filteredCategories.some((filteredCategory) => filteredCategory.slug === category.slug)}
                    />
                  ))}
                </div>
                <span className={styles.sidebarNavDivider}></span>
                <div className={styles.sidebarNav}>
                  <div className={styles.filter}>
                    <span className={styles.label}>
                      <label htmlFor="advancedModels">Show Advanced AI Models</label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info01Icon />
                        </TooltipTrigger>
                        <TooltipContent>Requires Advanced AI add-on to Raycast Pro</TooltipContent>
                      </Tooltip>
                    </span>

                    <Switch
                      id="advancedModels"
                      checked={showAdvancedModels}
                      onCheckedChange={(checked) => setShowAdvancedModels(checked)}
                      color="purple"
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className={styles.container}>
          {filteredCategories.map((category) => {
            return (
              <div
                key={category.name}
                data-section-slug={`/presets${category.slug}`}
                style={{
                  outline: "none",
                }}
                tabIndex={-1}
              >
                <h2 className={styles.subtitle}>
                  <category.iconComponent /> {category.name}
                </h2>
                <div className={styles.presets}>
                  {category.presets.map((preset) => (
                    <PresetComponent key={preset.id} preset={preset} models={models} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function NavItem({ category, disabled }: { category: Category; disabled: boolean }) {
  const activeSection = useSectionInView();

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", `/presets${category.slug}`);
      }}
      className={cn(styles.sidebarNavItem, disabled && styles.disabled)}
      data-active={activeSection === `/presets${category.slug}`}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {category.icon ? <category.iconComponent /> : <StarsIcon />}

      {category.name}
      <span className={styles.badge}>{category.presets.length}</span>
    </a>
  );
}
