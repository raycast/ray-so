import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import ControlContainer from "./ControlContainer";
import { Language, LANGUAGES } from "../util/languages";

import styles from "./LanguageControl.module.css";

import useHotkeys from "../../../../utils/useHotkeys";
import { loadingLanguageAtom } from "../store";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxEmpty,
} from "@/components/combobox";
import { cn } from "@/utils/cn";
import { ChevronUpIcon } from "@raycast/icons";

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
    <ControlContainer title="Language">
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
          size="small"
          className={cn("w-[146px]", isLoadingLanguage && styles.loadingShimmer)}
          icon={ChevronUpIcon}
        >
          <ComboboxValue<LanguageItem>>
            {(value) => (
              <>
                {value?.name ?? "Auto-Detect"}
                {autoDetectLanguage ? " (auto)" : ""}
              </>
            )}
          </ComboboxValue>
        </ComboboxTrigger>
        <ComboboxContent searchPlaceholder="Search languages…">
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList<LanguageItem>>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </ControlContainer>
  );
};

export default LanguageControl;
