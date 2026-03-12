import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import { Language, LANGUAGES } from "../util/languages";

import useHotkeys from "../../../../utils/useHotkeys";
import { loadingLanguageAtom } from "../store";
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
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [autoDetectLanguage] = useAtom(autoDetectLanguageAtom);
  const [isLoadingLanguage] = useAtom(loadingLanguageAtom);

  const items: LanguageItem[] = useMemo(() => {
    const languageItems = Object.entries(LANGUAGES).map(([key, lang]) => ({
      id: key,
      name: lang.name,
      language: lang,
    }));
    return [AUTO_DETECT_ITEM, ...languageItems];
  }, []);

  const currentValue = useMemo(() => {
    if (!selectedLanguage) return AUTO_DETECT_ITEM;
    return items.find((item) => item.language?.name === selectedLanguage.name) ?? AUTO_DETECT_ITEM;
  }, [selectedLanguage, items]);

  useHotkeys("l", (event) => {
    event.preventDefault();
  });

  return (
    <Combobox<LanguageItem>
      items={items}
      value={currentValue}
      onValueChange={(item) => {
        if (item) {
          setSelectedLanguage(item.language);
        }
      }}
      itemToStringLabel={(item) => item?.name ?? ""}
    >
      <ComboboxTrigger
        className={cn("min-w-36", isLoadingLanguage)}
        render={<Button className="min-w-36 justify-between font-normal" variant="outline" />}
      >
        <ComboboxValue>
          {(value) => (
            <>
              {value?.name ?? "Auto-Detect"}
              {autoDetectLanguage ? " (auto)" : ""}
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
  );
};

export default LanguageControl;
