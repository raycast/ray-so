import { useAtom } from "jotai";
import React from "react";
import { availableLanguages, selectedLanguageAtom } from "../store/language";
import ControlContainer from "./ControlContainer";

const LanguageControl: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  return (
    <ControlContainer title="Language">
      <select
        name=""
        id=""
        value={selectedLanguage?.className}
        onChange={(event) => {
          const newLanguage = availableLanguages.find(
            (el) => el.className === event.target.value
          );

          if (newLanguage) setSelectedLanguage(newLanguage);
        }}
      >
        {availableLanguages.map((language) => (
          <option key={language.className} value={language.className}>
            {language.name}
          </option>
        ))}
      </select>
    </ControlContainer>
  );
};

export default LanguageControl;
