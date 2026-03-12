import { useAtom } from "jotai";
import styles from "./ThemeControl.module.css";
import { paddingAtom } from "../store/padding";
import React, { useEffect, useMemo } from "react";
import { themeAtom, unlockedThemesAtom } from "../store/themes";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxList,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxSeparator,
  ComboboxValue,
  ComboboxEmpty,
  ComboboxPopup,
  ComboboxCollection,
  ComboboxInput,
} from "@/components/ui/combobox";
import { SearchIcon } from "lucide-react";
import useHotkeys from "@/utils/useHotkeys";
import { UniqueSvg } from "@/components/unique-svg";
import { SelectButton } from "@/components/ui/select";
import { Theme } from "@/typings/editor";
import { groupThemes, THEMES } from "../constants/themes";

function ThemePreview({ theme }: { theme: Theme }) {
  if (theme.icon) {
    return (
      <UniqueSvg className={styles.themePreview}>
        {React.createElement(theme.icon as React.ElementType, {
          className: styles.logo,
        })}
      </UniqueSvg>
    );
  }

  return (
    <span
      className={styles.themePreview}
      style={{
        backgroundImage: `linear-gradient(140deg, ${theme?.background?.from}, ${theme?.background?.to})`,
      }}
    />
  );
}

const ThemeControl: React.FC = () => {
  const [currentTheme, atomSetTheme] = useAtom(themeAtom);
  const [, setPadding] = useAtom(paddingAtom);
  const [unlockedThemes] = useAtom(unlockedThemesAtom);

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

    if (availableThemes[currentIndex + 1]) {
      setTheme(availableThemes[currentIndex + 1]);
    } else {
      setTheme(availableThemes[0]);
    }
  });

  const themes = useMemo(() => {
    return groupThemes(THEMES);
  }, []);

  return (
    <Combobox
      items={themes}
      value={currentTheme}
      onValueChange={(theme) => {
        if (theme) setTheme(theme);
      }}
      itemToStringLabel={(theme) => theme?.name ?? ""}
      isItemEqualToValue={(item, selected) => item.id === selected.id}
    >
      <ComboboxTrigger
        render={<SelectButton className="min-w-36 justify-between font-normal" />}
        className={"max-w-sm"}
      >
        <ComboboxValue>
          {(theme) =>
            theme ? (
              <div className="flex items-center gap-1">
                <ThemePreview theme={theme} />
                {theme.name}
              </div>
            ) : (
              "Select theme"
            )
          }
        </ComboboxValue>
      </ComboboxTrigger>
      <ComboboxPopup aria-label="Select a fruit">
        <ComboboxEmpty>No themes found.</ComboboxEmpty>
        <ComboboxList>
          {(group) => (
            <React.Fragment key={group.value}>
              <ComboboxGroup items={group.items}>
                <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(theme) => (
                    <ComboboxItem key={theme.id} value={theme}>
                      <div className="flex items-center gap-1">
                        <ThemePreview theme={theme} />
                        {theme.name}
                      </div>
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
                {group?.separator && <ComboboxSeparator />}
              </ComboboxGroup>
            </React.Fragment>
          )}
        </ComboboxList>
        <div className="border-t p-2">
          <ComboboxInput
            className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
            placeholder="Search fruits..."
            showTrigger={false}
            startAddon={<SearchIcon />}
          />
        </div>
      </ComboboxPopup>
    </Combobox>
  );
};

export default ThemeControl;

// const filteredPartnerThemes = useMemo(
//   () =>
//     themes.filter(
//       (theme) => unlockedThemes.includes(theme.id) || !theme.hidden || theme.name === currentTheme.name,
//     ),
//   [ unlockedThemes, currentTheme.name],
// );
