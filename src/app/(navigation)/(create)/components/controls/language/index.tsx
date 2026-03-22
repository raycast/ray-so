import React, { useMemo } from "react";
import { Language, LANGUAGES } from "../../../util/languages";
import useHotkeys from "../../../../../../utils/useHotkeys";
import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxEmpty,
  ComboboxPopup,
  ComboboxInput,
} from "@/components/ui/combobox";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { useAtomValue, useSetAtom } from "jotai";
import { currentElementAtom, updateSlideElementAtom } from "../../../store/editor";

type LanguageItem = {
  id: string;
  name: string;
  language: Language | null;
};

const AUTO_DETECT_ITEM: LanguageItem = {
  id: "auto-detect",
  name: "Auto-Detect",
  language: null,
};

const LanguageControl: React.FC = () => {
  const elementState = useAtomValue(currentElementAtom);
  const updateSlideElement = useSetAtom(updateSlideElementAtom);

  const language = elementState?.properties?.language;

  const items: LanguageItem[] = useMemo(() => {
    const languageItems = Object.entries(LANGUAGES).map(([key, lang]) => ({
      id: key,
      name: lang.name,
      language: lang,
    }));
    return [AUTO_DETECT_ITEM, ...languageItems];
  }, []);

  const currentValue = useMemo(() => {
    if (!language) return AUTO_DETECT_ITEM;
    return items.find((item) => item.language?.name === language) ?? AUTO_DETECT_ITEM;
  }, [language, items]);

  useHotkeys("l", (event) => {
    event.preventDefault();
  });

  return (
    <Field>
      <FieldLabel>
        <span className="text-muted-foreground text-xs">Language</span>
      </FieldLabel>
      <Combobox<LanguageItem>
        items={items}
        value={currentValue}
        onValueChange={(item) => {
          if (item) {
            updateSlideElement({
              properties: {
                language: item.language?.name,
              },
            });
          }
        }}
        itemToStringLabel={(item) => item?.name ?? ""}
      >
        <ComboboxTrigger
          className={cn("min-w-36")}
          render={<Button className="min-w-36 justify-between font-normal" variant="outline" />}
        >
          <ComboboxValue>
            {(value) => (
              <>
                {value?.name ?? "Auto-Detect"}
                {/* {autoDetectLanguage ? " (auto)" : ""} */}
              </>
            )}
          </ComboboxValue>
          <ChevronsUpDownIcon className="-me-1!" />
        </ComboboxTrigger>
        <ComboboxPopup>
          <div className="border-b p-2">
            <ComboboxInput
              className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
              placeholder="Search..."
              showTrigger={false}
              startAddon={<SearchIcon />}
            />
          </div>
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </Field>
  );
};

export default LanguageControl;
