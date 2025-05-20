import { useAtom, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { themeAtom, THEMES, Theme, unlockedThemesAtom } from "../store/themes";
import ControlContainer from "./ControlContainer";

import styles from "./ThemeControl.module.css";
import useHotkeys from "../../../../utils/useHotkeys";
import { paddingAtom } from "../store/padding";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectValue,
} from "@/components/select";
import { SelectItemText } from "@radix-ui/react-select";
import { ChevronUpIcon } from "@raycast/icons";

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
        { partnerThemes: [], themes: [] },
      ),
    [],
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
        <SelectTrigger size="small" className="w-[60px]" icon={ChevronUpIcon}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Partners</SelectLabel>
            {partnerThemes
              .filter((theme) => unlockedThemes.includes(theme.id) || !theme.hidden || theme.name === currentTheme.name)
              .map((theme, index) => {
                return (
                  <SelectItem key={index} value={theme.name} textValue={theme.name}>
                    <SelectItemText>
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
                    </SelectItemText>
                    {theme.name}
                  </SelectItem>
                );
              })}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            {themes.map((theme, index) => (
              <SelectItem key={index} value={theme.name}>
                <SelectItemText>
                  <span
                    className={styles.themePreview}
                    style={{
                      backgroundImage: `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`,
                    }}
                  />
                </SelectItemText>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </ControlContainer>
  );
};

export default ThemeControl;
