import { useAtom } from "jotai";
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import ControlContainer from "./ControlContainer";
import { Language, LANGUAGES } from "../util/languages";

import ChevronUpIcon from "assets/icons/chevron-up-16.svg";

import styles from "styles/Select.module.css";
import useHotkeys from "../util/useHotkeys";

const LanguageControl: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [autoDetectLanguage] = useAtom(autoDetectLanguageAtom);

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
        <Select.Trigger className={styles.trigger}>
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
          <Select.Icon className={styles.icon}>
            <ChevronUpIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.content}>
            <Select.Viewport className={styles.viewport}>
              <Select.Item value="auto-detect" className={styles.item}>
                <Select.SelectItemText>Auto-Detect</Select.SelectItemText>
              </Select.Item>
              {Object.values(LANGUAGES).map((language, index) => (
                <Select.Item key={index} value={language.name} className={styles.item}>
                  <Select.SelectItemText>{language.name}</Select.SelectItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </ControlContainer>
  );
};

export default LanguageControl;
