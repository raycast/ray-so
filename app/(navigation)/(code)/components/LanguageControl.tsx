import { useAtom } from "jotai";
import React, { useState } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import ControlContainer from "./ControlContainer";
import { Language, LANGUAGES } from "../util/languages";

import ChevronUpIcon from "../assets/icons/chevron-up-16.svg";

import selectStyles from "./Select.module.css";
import styles from "./LanguageControl.module.css";
import useHotkeys from "../../../../utils/useHotkeys";
import { loadingLanguageAtom } from "../store";
import classNames from "classnames";
import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/select";

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
      <Select
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
        <SelectTrigger size="small" className="w-[146px]">
          <SelectValue />
          {autoDetectLanguage ? "(auto)" : ""}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto-detect" className={selectStyles.item}>
            <SelectItemText>Auto-Detect</SelectItemText>
          </SelectItem>
          {Object.values(LANGUAGES).map((language, index) => (
            <SelectItem key={index} value={language.name} className={selectStyles.item}>
              <SelectItemText>{language.name}</SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* <RadixSelect.Root
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
        <RadixSelect.Trigger className={classNames(selectStyles.trigger, isLoadingLanguage && styles.loadingShimmer)}>
          <RadixSelect.Value>
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
          </RadixSelect.Value>
          <RadixSelect.Icon className={selectStyles.icon}>
            <ChevronUpIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={selectStyles.content}>
            <RadixSelect.Viewport className={selectStyles.viewport}>
              <RadixSelect.Group className={selectStyles.group}>
                <RadixSelect.Item value="auto-detect" className={selectStyles.item}>
                  <RadixSelect.SelectItemText>Auto-Detect</RadixSelect.SelectItemText>
                </RadixSelect.Item>
                {Object.values(LANGUAGES).map((language, index) => (
                  <RadixSelect.Item key={index} value={language.name} className={selectStyles.item}>
                    <RadixSelect.SelectItemText>{language.name}</RadixSelect.SelectItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Group>
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root> */}
    </ControlContainer>
  );
};

export default LanguageControl;
