import { useAtom } from "jotai";
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import ControlContainer from "./ControlContainer";
import { Language, LANGUAGES } from "../util/languages";

import ChevronUpIcon from "../assets/icons/chevron-up-16.svg";

import selectStyles from "./Select.module.css";
import styles from "./LanguageControl.module.css";
import useHotkeys from "../util/useHotkeys";
import { loadingLanguageAtom } from "../store";
import classNames from "classnames";

const LanguageControl: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [autoDetectLanguage] = useAtom(autoDetectLanguageAtom);
  const [isLoadingLanguage] = useAtom(loadingLanguageAtom);

  useHotkeys("l", (event) => {
    event.preventDefault();
    if (!isOpen) {
      setOpen(true);
    }
  });

  return (
    <ControlContainer title="Language">
      <Select.Root
        open={isOpen}
        onOpenChange={(open) => setOpen(open)}
        value={selectedLanguage?.name || "auto-detect"}
        onValueChange={(value) => {
          if (value === "auto-detect") {
            setSelectedLanguage(null);
          } else {
            setSelectedLanguage(Object.values(LANGUAGES).find((l) => l.name === value) as Language);
          }
        }}
      >
        <Select.Trigger className={classNames(selectStyles.trigger, isLoadingLanguage && styles.loadingShimmer)}>
          <Select.Value>
            <span
              style={{
                display: "block",
                textAlign: "start",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100px",
              }}
            >
              {selectedLanguage?.name || "auto-detect"}
              {autoDetectLanguage ? " (auto)" : ""}
            </span>
          </Select.Value>
          <Select.Icon className={selectStyles.icon}>
            <ChevronUpIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={selectStyles.content}>
            <Select.Viewport className={selectStyles.viewport}>
              <Select.Group className={selectStyles.group}>
                <Select.Item value="auto-detect" className={selectStyles.item}>
                  <Select.SelectItemText>Auto-Detect</Select.SelectItemText>
                </Select.Item>
                {Object.values(LANGUAGES).map((language, index) => (
                  <Select.Item key={index} value={language.name} className={selectStyles.item}>
                    <Select.SelectItemText>{language.name}</Select.SelectItemText>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </ControlContainer>
  );
};

export default LanguageControl;
