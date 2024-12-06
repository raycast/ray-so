import { useAtom, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { themeAtom, THEMES, Theme, unlockedThemesAtom, customThemesAtom } from "../store/themes";
import ControlContainer from "./ControlContainer";
import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from "./Select";
import * as Dialog from "@radix-ui/react-dialog";

import styles from "../styles/ThemeControl.module.css";
import useHotkeys from "../util/useHotkeys";
import { paddingAtom } from "../store/padding";
import { unzip } from "unzipit";
import { parse } from "jsonc-parser";

const ThemeControl: React.FC = () => {
  const [currentTheme, setTheme] = useAtom(themeAtom);
  const [padding, setPadding] = useAtom(paddingAtom);
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom);
  const [customThemes, setCustomThemes] = useAtom(customThemesAtom);
  const [customValue, setCustomValue] = React.useState("");
  const [customDialogOpen, setCustomDialogOpen] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);

  useEffect(() => {
    if (currentTheme.name === THEMES.vercel.name || currentTheme.name === THEMES.rabbit.name) {
      setPadding(64);
    }
  }, [currentTheme, setPadding]);

  // useHotkeys("c", () => {
  //   const availableThemes = Object.values(THEMES).filter((theme) => unlockedThemes.includes(theme.id) || !theme.hidden);
  //   const currentIndex = availableThemes.indexOf(currentTheme);
  //   if (Object.values(availableThemes)[currentIndex + 1]) {
  //     setTheme(Object.values(availableThemes)[currentIndex + 1]);
  //   } else {
  //     setTheme(Object.values(availableThemes)[0]);
  //   }
  // });

  const handleAddCustom = async (url: string) => {
    setIsImporting(true);
    const themes = await fetchFromMarketplace(url);
    if (themes) {
      const newThemes = themes.map(({ label, theme }) => ({
        id: label,
        name: label,
        background: {
          from: theme.colors["editor.background"] || "#000",
          to: theme.colors["editor.hoverBackground"] || "#000",
        },
        theme,
      }));
      setCustomThemes([...customThemes, ...newThemes]);
      setCustomValue("");
      setCustomDialogOpen(false);
      setIsImporting(false);
    }
  };

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
        value={`${currentTheme?.name || ""}`}
        onValueChange={(value) => {
          const theme =
            (Object.values(THEMES).find(({ name }) => name === value) as Theme) ||
            customThemes.find(({ name }) => name === value);
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
          {themes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
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
          {customThemes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
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
          <Dialog.Root open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
            <Dialog.Trigger asChild>
              <button className={styles.importButton}>
                <span className={styles.themePreview}>
                  <em>+</em>
                </span>{" "}
                Import theme
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className={styles.overlay} />
              <Dialog.Content className={styles.dialog}>
                <Dialog.Title className={styles.dialogTitle}>Import Theme</Dialog.Title>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    return handleAddCustom(customValue);
                  }}
                >
                  <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder="Paste the URL of the VSCode theme"
                  />
                  <button disabled={isImporting}>{isImporting ? "Importing…" : "Import Theme(s)"}</button>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </SelectGroup>
      </Select>
    </ControlContainer>
  );
};

async function fetchFromMarketplace(url: string) {
  const itemName = url.split("itemName=")[1];
  const [publisher, extId] = itemName.split(".");
  const downloadUrl =
    `https://${publisher}.gallery.vsassets.io` +
    `/_apis/public/gallery/publisher/${publisher}` +
    `/extension/${extId}/latest` +
    `/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`;

  const { entries } = await unzip(downloadUrl);
  const packagejson = await entries["extension/package.json"].json();

  console.log("downloadingurl", downloadUrl);

  return await Promise.all(
    packagejson.contributes.themes.map(async ({ label, path }: { label: string; path: string }) => {
      const fullPath = "extension/" + (path.startsWith("./") ? path.slice(2) : path);
      const themeFile = entries[fullPath];
      const rawTheme = await themeFile.text();
      const errors = [] as any[];
      const theme = parse(rawTheme, errors, {
        allowTrailingComma: true,
      });
      return {
        label,
        theme,
      };
    }),
  );
}

export default ThemeControl;
