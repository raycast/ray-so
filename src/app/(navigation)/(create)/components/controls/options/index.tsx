import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import {
  elementDarkModeAtom,
  elementShowLineNumbersAtom,
  elementTransparentAtom,
  updateSlideElementAtom,
} from "../../../store/editor";
import useHotkeys from "@/utils/useHotkeys";

const OptionsControl: React.FC = () => {
  const updateSlideElement = useSetAtom(updateSlideElementAtom);

  const darkMode = useAtomValue(elementDarkModeAtom);
  const transparent = useAtomValue(elementTransparentAtom);
  const showLineNumbers = useAtomValue(elementShowLineNumbersAtom);

  useHotkeys("n", (e) => {
    e.preventDefault();
    updateSlideElement({ properties: { showLineNumbers: !showLineNumbers } });
  });

  useHotkeys("d", (e) => {
    e.preventDefault();
    updateSlideElement({ properties: { darkMode: !darkMode } });
  });

  useHotkeys("b", (e) => {
    e.preventDefault();
    updateSlideElement({ properties: { transparent: !transparent } });
  });

  return (
    <Field>
      <FieldLabel>Options</FieldLabel>
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>
          <Settings2 />
        </MenuTrigger>
        <MenuPopup>
          <MenuCheckboxItem
            variant="switch"
            checked={transparent}
            onCheckedChange={(checked) => {
              updateSlideElement({
                properties: { transparent: checked },
              });
            }}
          >
            Show background
          </MenuCheckboxItem>
          <MenuCheckboxItem
            variant="switch"
            checked={darkMode}
            onCheckedChange={(checked) => {
              updateSlideElement({
                properties: { darkMode: checked },
              });
            }}
          >
            Dark Mode
          </MenuCheckboxItem>
          <MenuCheckboxItem
            variant="switch"
            checked={showLineNumbers}
            onCheckedChange={(checked) => {
              updateSlideElement({
                properties: { showLineNumbers: checked },
              });
            }}
          >
            Line numbers
          </MenuCheckboxItem>
        </MenuPopup>
      </Menu>
    </Field>
  );
};

export default OptionsControl;
