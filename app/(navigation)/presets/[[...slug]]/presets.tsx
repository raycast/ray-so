"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";

import styles from "./presets.module.css";
import { ScrollArea } from "@/components/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { ChevronDownIcon, Info01Icon, LinkIcon, PlusCircleIcon, StarsIcon } from "@raycast/icons";
import { PresetComponent } from "../components/Preset";
import { Category, categories } from "../presets";
import { Switch } from "@/components/switch";
import { NavigationActions } from "@/components/navigation";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import { InfoDialog } from "../components/InfoDialog";
import { AiModel } from "@/api/ai";
import { Extension } from "@/api/store";

type Props = {
  models: AiModel[];
  extensions: Extension[];
};

export default function Presets({ models, extensions }: Props) {
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });

  const [showAdvancedModels, setShowAdvancedModels] = React.useState(true);
  const [checkedExtensions, setCheckedExtensions] = React.useState<string[]>([]);

  const advancedModels = models.filter((model) => model.requires_better_ai).map((model) => model.model);

  // create a new array of categories
  const categoriesWithInlineExtensions = categories.map((category) => ({
    ...category,
    presets: category.presets.map((preset) => ({
      ...preset,
      tools: Array.from(new Set([...(preset.tools || [])])),
    })),
  }));

  const filteredCategories = React.useMemo(() => {
    if (!showAdvancedModels || checkedExtensions.length > 0) {
      return categoriesWithInlineExtensions
        .map((category) => ({
          ...category,
          presets: category.presets.filter((preset) => {
            const presetObj = models.find((model) => model.id === preset.model);
            const passesAdvancedFilter = showAdvancedModels || !advancedModels.includes(presetObj?.model || "");

            const passesExtensionFilter =
              checkedExtensions.length === 0 || preset.tools?.some((tool) => checkedExtensions.includes(tool.id));

            return passesAdvancedFilter && passesExtensionFilter;
          }),
        }))
        .filter((category) => category.presets.length > 0);
    }
    return categoriesWithInlineExtensions;
  }, [showAdvancedModels, advancedModels, models, checkedExtensions, categoriesWithInlineExtensions]);

  React.useEffect(() => {
    setEnableViewObserver(true);
  }, []);

  const extensionIds = Array.from(
    new Set(
      categoriesWithInlineExtensions
        .flatMap((category) => category.presets)
        .flatMap((preset) => preset.tools.map((tool) => tool.id))
        .filter((id): id is string => id !== undefined && id !== null),
    ),
  );

  return (
    <>
      <NavigationActions>
        <div className="flex gap-2 sm:hidden">
          <Button variant="primary" disabled>
            <LinkIcon /> Copy URL to Share
          </Button>
        </div>

        <div className="sm:flex gap-2 hidden ">
          <InfoDialog />
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
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-gray-11">Models</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info01Icon className="text-gray-11" />
                      </TooltipTrigger>
                      <TooltipContent>Advanced AI requires the Advanced AI add-on to Raycast Pro</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className={styles.filter}>
                    <span className={styles.label}>
                      <label htmlFor="advancedModels">Show Advanced AI</label>
                    </span>

                    <Switch
                      id="advancedModels"
                      checked={showAdvancedModels}
                      onCheckedChange={(checked) => setShowAdvancedModels(checked)}
                      color="purple"
                    />
                  </div>
                </div>
                <span className={styles.sidebarNavDivider}></span>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-gray-11">AI Extensions</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info01Icon className="text-gray-11" />
                      </TooltipTrigger>
                      <TooltipContent>AI Extensions provide additional functionality to AI models</TooltipContent>
                    </Tooltip>
                  </div>

                  <ul className={styles.extensionsList}>
                    {extensionIds.map((id) => {
                      const extension = extensions.find((ext) => ext.id === id);
                      if (!extension) return null;
                      const icon = extension.icons.dark || extension.icons.light;
                      return (
                        <li key={id} className="flex items-center gap-2 justify-between pr-3">
                          <label
                            htmlFor={`extension-${id}`}
                            className="flex items-center gap-2 flex-1 hover:text-gray-12 transition-colors"
                          >
                            {icon ? (
                              <img src={icon} alt={extension.title} width={16} height={16} />
                            ) : (
                              <div className="w-4 h-4 bg-gray-4 rounded" />
                            )}
                            {extension.title}
                          </label>
                          <input
                            type="checkbox"
                            id={`extension-${id}`}
                            className="rounded"
                            checked={checkedExtensions.some((ext) => ext === id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCheckedExtensions([...checkedExtensions, id]);
                              } else {
                                setCheckedExtensions(checkedExtensions.filter((ext) => ext !== id));
                              }
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className={styles.container}>
          {filteredCategories
            .filter((category) => (checkedExtensions.length > 0 ? category.slug !== "/new" : true))
            .map((category) => {
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
                      <PresetComponent key={preset.id} preset={preset} models={models} extensions={extensions} />
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
