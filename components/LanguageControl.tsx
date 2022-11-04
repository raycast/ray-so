import { useAtom } from "jotai";
import React from "react";
import { availableLanguages, selectedLanguageAtom } from "../store/code";
import ControlContainer from "./ControlContainer";
import FilterableSelect from "./FilterableSelect";

import styles from "styles/LanguageControl.module.css";

const LanguageControl: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  return (
    <ControlContainer title="Language">
      <FilterableSelect
        className={styles.languageSelect}
        items={[
          {
            value: "Auto-Detect",
            selected: selectedLanguage === null,
            onSelect() {
              setSelectedLanguage(null);
            },
          },
          ...Object.values(availableLanguages).map((language) => ({
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
