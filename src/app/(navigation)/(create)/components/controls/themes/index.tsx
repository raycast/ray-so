// // function ThemePreview({ theme }: { theme: Theme }) {
// //   if (theme.icon) {
// //     return (
// //       <UniqueSvg className={styles.themePreview}>
// //         {React.createElement(theme.icon as React.ElementType, {
// //           className: styles.logo,
// //         })}
// //       </UniqueSvg>
// //     );
// //   }

// //   return (
// //     <span
// //       className={styles.themePreview}
// //       style={{
// //         backgroundImage: `linear-gradient(140deg, ${theme?.background?.from}, ${theme?.background?.to})`,
// //       }}
// //     />
// //   );
// // }

import { useAtomValue, useSetAtom } from "jotai";
import React, { useMemo } from "react";
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
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { SelectButton } from "@/components/ui/select";
import { Theme } from "@/typings/editor";
import { groupThemes, THEMES } from "../../../constants/themes";
import { Field, FieldLabel } from "@/components/ui/field";
import { currentElementAtom, elementThemeAtom, updateSlideElementAtom } from "../../../store/editor";
import { Button } from "@/components/ui/button";

const ThemeControl: React.FC = () => {
  const update = useSetAtom(updateSlideElementAtom);
  const themeId = useAtomValue(elementThemeAtom);

  const themes = useMemo(() => groupThemes(THEMES), []);

  const allThemes = useMemo(() => Object.values(THEMES), []);

  const currentTheme = useMemo(() => {
    return allThemes.find((t) => t.id === themeId) ?? allThemes[0];
  }, [themeId, allThemes]);

  return (
    <Field>
      <FieldLabel>Theme</FieldLabel>
      <Combobox<Theme>
        items={themes}
        value={currentTheme}
        onValueChange={(theme) => update({ properties: { theme: theme?.id } })}
        itemToStringLabel={(theme) => theme?.name ?? ""}
        isItemEqualToValue={(item, selected) => item.id === selected.id}
      >
        <ComboboxTrigger
          render={<Button className="min-w-36 justify-between font-normal" variant="outline" />}
          className="max-w-sm"
        >
          <ComboboxValue>{(theme) => (theme ? theme.name : "Select theme")}</ComboboxValue>
          <ChevronsUpDownIcon className="-me-1!" />
        </ComboboxTrigger>
        <ComboboxPopup aria-label="Select theme">
          <div className="border-t p-2">
            <ComboboxInput
              className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
              placeholder="Search themes..."
              showTrigger={false}
              startAddon={<SearchIcon />}
            />
          </div>
          <ComboboxEmpty>No themes found.</ComboboxEmpty>
          <ComboboxList>
            {(group) => (
              <React.Fragment key={group.value}>
                <ComboboxGroup items={group.items}>
                  <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(theme) => (
                      <ComboboxItem key={theme.id} value={theme}>
                        {theme.name}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                  {group?.separator && <ComboboxSeparator />}
                </ComboboxGroup>
              </React.Fragment>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </Field>
  );
};

export default ThemeControl;
