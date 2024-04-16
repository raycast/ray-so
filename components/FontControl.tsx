import { useAtom } from "jotai";
import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { fontAtom, FONTS, Font } from "../store/font";
import ControlContainer from "./ControlContainer";
import { Select, SelectItem } from "./Select";

import styles from "../styles/ThemeControl.module.css";
import useHotkeys from "../util/useHotkeys";

const FontControl: React.FC = () => {
  const [currentFont, setFont] = useAtom(fontAtom);

  useHotkeys("f", () => {
    const currentIndex = FONTS.indexOf(currentFont);
    if (FONTS[currentIndex + 1]) {
      setFont(FONTS[currentIndex + 1]);
    } else {
      setFont(FONTS[0]);
    }
  });

  return (
    <ControlContainer title="Font">
      <Select
        value={currentFont}
        onValueChange={(value) => {
          const font = FONTS.find((font) => font === value) as Font;
          setFont(font);
        }}
      >
        {FONTS.map((font, index) => (
          <SelectItem key={index} value={font}>
            <SelectPrimitive.SelectItemText>
              <span className={styles.themePreview}>{font.substring(0, 1).toUpperCase()}</span>
            </SelectPrimitive.SelectItemText>
            {font}
          </SelectItem>
        ))}
      </Select>
    </ControlContainer>
  );
};

export default FontControl;
