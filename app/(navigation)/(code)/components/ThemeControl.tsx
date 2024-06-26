import { useAtom, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { themeAtom, THEMES, Theme, unlockedThemesAtom } from "../store/themes";
import ControlContainer from "./ControlContainer";
import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from "./Select";

import styles from "./ThemeControl.module.css";
import useHotkeys from "../../../../utils/useHotkeys";
import { paddingAtom } from "../store/padding";

const ThemeControl: React.FC = () => {
  const [currentTheme, setTheme] = useAtom(themeAtom);
  const [padding, setPadding] = useAtom(paddingAtom);
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom);

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

  const { partnerThemes, themes } = React.useMemo(
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
        { partnerThemes: [], themes: [] }
      ),
    []
  );

  return (
    <ControlContainer title="Theme">
      <Select
        value={`${currentTheme.name}`}
        onValueChange={(value) => {
          const theme = Object.values(THEMES).find(({ name }) => name === value) as Theme;
          setTheme(theme);
        }}
      >
        <SelectGroup>
          <SelectLabel>Partners</SelectLabel>
          {partnerThemes
            .filter((theme) => unlockedThemes.includes(theme.id) || !theme.hidden || theme.name === currentTheme.name)
            .map((theme, index) => {
              return (
                <SelectItem key={index} value={theme.name}>
                  <SelectPrimitive.SelectItemText>
                    {theme.icon ? (
                      <span className={styles.themePreview}>
                        {React.createElement(theme.icon, { className: styles.logo })}
                      </span>
                    ) : (
                      <span
                        className={styles.themePreview}
                        style={{
                          backgroundImage: `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`,
                        }}
                      />
                    )}
                  </SelectPrimitive.SelectItemText>
                  {theme.name}
                </SelectItem>
              );
            })}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          {themes.map((theme, index) => (
            <SelectItem key={index} value={theme.name}>
              <SelectPrimitive.SelectItemText>
                <span
                  className={styles.themePreview}
                  style={{
                    backgroundImage: `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`,
                  }}
                />
              </SelectPrimitive.SelectItemText>
              {theme.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </Select>
    </ControlContainer>
  );
};

export default ThemeControl;
