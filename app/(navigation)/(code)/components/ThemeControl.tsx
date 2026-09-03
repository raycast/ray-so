import { useAtom } from "jotai";
import React, { useEffect, useMemo } from "react";
import { themeAtom, THEMES, Theme, unlockedThemesAtom } from "../store/themes";
import ControlContainer from "./ControlContainer";

import styles from "./ThemeControl.module.css";
import useHotkeys from "../../../../utils/useHotkeys";
import { paddingAtom } from "../store/padding";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxValue,
  ComboboxEmpty,
} from "@/components/combobox";
import { UniqueSvg } from "@/components/unique-svg";
import { ChevronUpIcon } from "@raycast/icons";

interface ThemeGroup {
  label: string;
  items: Theme[];
}

function ThemePreview({ theme }: { theme: Theme }) {
  if (theme.icon) {
    return (
      <UniqueSvg className={styles.themePreview}>
        {React.createElement(theme.icon as React.ElementType, { className: styles.logo })}
      </UniqueSvg>
    );
  }

  return (
    <span
      className={styles.themePreview}
      style={{
        backgroundImage: `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`,
      }}
    ></span>
  );
}

const ThemeControl: React.FC = () => {
  const [currentTheme, atomSetTheme] = useAtom(themeAtom);
  const [padding, setPadding] = useAtom(paddingAtom);
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom);

  const setTheme = (theme: Theme) => {
    atomSetTheme(theme);
    try {
      localStorage.setItem("codeTheme", theme.id);
    } catch (error) {
      console.log("Could not set theme in localStorage", error);
    }
  };

  useEffect(() => {
    if (currentTheme.name === THEMES.vercel.name || currentTheme.name === THEMES.rabbit.name) {
      setPadding(64);
    }
  }, [currentTheme, setPadding]);

  useHotkeys("c", () => {
    const availableThemes = Object.values(THEMES).filter((theme) => unlockedThemes.includes(theme.id) || !theme.hidden);
    const currentIndex = availableThemes.indexOf(currentTheme);
    if (Object.values(availableThemes)[currentIndex + 1]) {
      setTheme(Object.values(availableThemes)[currentIndex + 1]);
    } else {
      setTheme(Object.values(availableThemes)[0]);
    }
  });

  const { partnerThemes, themes } = useMemo(
    () =>
      Object.entries(THEMES).reduce<{ partnerThemes: Theme[]; themes: Theme[] }>(
        (acc, [key, value]) => {
          const themeWithKey = { ...value, key };
          if (value.partner) {
            acc.partnerThemes.push(themeWithKey);
          } else {
            acc.themes.push(themeWithKey);
          }
          return acc;
        },
        { partnerThemes: [], themes: [] },
      ),
    [],
  );

  const filteredPartnerThemes = useMemo(
    () =>
      partnerThemes.filter(
        (theme) => unlockedThemes.includes(theme.id) || !theme.hidden || theme.name === currentTheme.name,
      ),
    [partnerThemes, unlockedThemes, currentTheme.name],
  );

  const groupedItems: ThemeGroup[] = useMemo(
    () => [
      { label: "Partners", items: filteredPartnerThemes },
      { label: "Themes", items: themes },
    ],
    [filteredPartnerThemes, themes],
  );

  return (
    <ControlContainer title="Theme">
      <Combobox<Theme>
        items={groupedItems}
        value={currentTheme}
        onValueChange={(theme) => {
          if (theme) {
            setTheme(theme);
          }
        }}
        itemToStringLabel={(theme) => theme?.name ?? ""}
        isItemEqualToValue={(item, selected) => item.id === selected.id}
      >
        <ComboboxTrigger size="small" className="w-[60px]" icon={ChevronUpIcon}>
          <ComboboxValue<Theme>>{(value) => (value ? <ThemePreview theme={value} /> : "Select theme")}</ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent showSearchIcon>
          <ComboboxEmpty>No themes found.</ComboboxEmpty>
          <ComboboxList<ThemeGroup>>
            {(group, groupIndex) => (
              <React.Fragment key={group.label}>
                {groupIndex > 0 && <ComboboxSeparator />}
                <ComboboxGroup items={group.items}>
                  <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                  {group.items.map((theme) => (
                    <ComboboxItem key={theme.id} value={theme}>
                      <ThemePreview theme={theme} />
                      <div>{theme.name}</div>
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              </React.Fragment>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </ControlContainer>
  );
};

export default ThemeControl;
