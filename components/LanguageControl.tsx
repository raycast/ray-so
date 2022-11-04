import { useAtom } from "jotai";
import React from "react";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import ControlContainer from "./ControlContainer";
import FilterableSelect from "./FilterableSelect";
import { LANGUAGES } from "../util/languages";

import styles from "styles/LanguageControl.module.css";

const LanguageControl: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [autoDetectLanguage] = useAtom(autoDetectLanguageAtom);

  return (
    <ControlContainer title="Language">
      <FilterableSelect
        className={styles.languageSelect}
        labelFormatter={(label) =>
          `${label}${autoDetectLanguage ? " (auto)" : ""}`
        }
        items={[
          {
            value: "Auto-Detect",
            selected: selectedLanguage === null,
            onSelect() {
              setSelectedLanguage(null);
            },
          },
          ...Object.values(LANGUAGES).map((language) => ({
            value: language.name,
            selected: language === selectedLanguage,
            onSelect() {
              setSelectedLanguage(language);
            },
          })),
        ]}
      />
    </ControlContainer>
  );
};

export default LanguageControl;
