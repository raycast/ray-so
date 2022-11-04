import { useAtom } from "jotai";
import React from "react";
import { availableLanguages, selectedLanguageAtom } from "../store/code";
import ControlContainer from "./ControlContainer";
import FilterableSelect from "./FilterableSelect";

const LanguageControl: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  return (
    <ControlContainer title="Language">
      <FilterableSelect>
        <FilterableSelect.Item
          onClick={() => setSelectedLanguage(null)}
          selected={selectedLanguage === null}
        >
          Auto-Detect
        </FilterableSelect.Item>
        {Object.values(availableLanguages).map((language) => (
          <FilterableSelect.Item
            key={language.className}
            selected={selectedLanguage?.className === language.className}
            onClick={() => setSelectedLanguage(language)}
          >
            {language.name}
          </FilterableSelect.Item>
        ))}
      </FilterableSelect>
    </ControlContainer>
  );
};

export default LanguageControl;
