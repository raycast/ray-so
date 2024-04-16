import { useAtom } from "jotai";
import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { themeAtom, THEMES, Theme } from "../store/themes";
import ControlContainer from "./ControlContainer";
import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from "./Select";

import styles from "../styles/ThemeControl.module.css";
import useHotkeys from "../util/useHotkeys";

const ThemeControl: React.FC = () => {
  const [currentTheme, setTheme] = useAtom(themeAtom);

  useHotkeys("c", () => {
    const currentIndex = Object.values(THEMES).indexOf(currentTheme);
    if (Object.values(THEMES)[currentIndex + 1]) {
      setTheme(Object.values(THEMES)[currentIndex + 1]);
    } else {
      setTheme(Object.values(THEMES)[0]);
    }
  });

  const { partnerThemes, themes } = Object.entries(THEMES).reduce<{ partnerThemes: Theme[]; themes: Theme[] }>(
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
          {partnerThemes.map((theme, index) => (
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
