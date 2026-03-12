import React, { useCallback } from "react";

import LanguageControl from "./LanguageControl";
import ThemeControl from "./ThemeControl";
import { Card, CardPanel } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import useHotkeys from "@/utils/useHotkeys";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { showBackgroundAtom, showLineNumbersAtom } from "../store";
import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import { darkModeAtom, themeAtom, themeDarkModeAtom, themeLineNumbersAtom } from "../store/themes";
import { Settings2 } from "lucide-react";
import { isPadding, PADDING_OPTIONS, paddingAtom } from "../store/padding";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import FontFaceControl from "./FontFaceControl";
import View from "@/components/view";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { editorAtom } from "../store/editor";
import { useSelection } from "../store/hooks/use-selection";

const items = [
  { label: "16px", value: "16" },
  { label: "32px", value: "32" },
  { label: "64px", value: "64" },
  { label: "128px", value: "128" },
];
const Controls: React.FC = () => {
  const [showBackground, setShowBackground] = useAtom(showBackgroundAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);
  const setDarkMode = useSetAtom(darkModeAtom);
  const theme = useAtomValue(themeAtom);
  const { slideId, selectSlide } = useSelection();

  const hasLightMode = !!theme.syntax.light;
  const hasDarkMode = !!theme.syntax.dark;
  const canToggle = hasLightMode && hasDarkMode;

  const showLineNumbers = useAtomValue(themeLineNumbersAtom);
  const setShowLineNumbers = useSetAtom(showLineNumbersAtom);

  const isDisabled = theme.partner && !theme.lineNumbersToggleable;

  const editor = useAtomValue(editorAtom);
  const slides = Object.values(editor.slides);

  const toggleShowLineNumbers = useCallback(() => {
    if (isDisabled) return;
    setShowLineNumbers((old) => !old);
  }, [setShowLineNumbers, isDisabled]);

  useHotkeys("n", toggleShowLineNumbers);

  const toggleDarkMode = useCallback(() => {
    if (canToggle) {
      setDarkMode((old) => !old);
    }
  }, [canToggle, setDarkMode]);

  useHotkeys("d", toggleDarkMode);
  useHotkeys("b", () => {
    setShowBackground((old) => !old);
  });

  const [padding, setPadding] = useAtom(paddingAtom);

  useHotkeys("p", (e) => {
    console.info(e.target);
    const currentIndex = PADDING_OPTIONS.indexOf(padding);
    if (PADDING_OPTIONS[currentIndex + 1]) {
      setPadding(PADDING_OPTIONS[currentIndex + 1]);
    } else {
      setPadding(PADDING_OPTIONS[0]);
    }
  });

  return (
    <div className="flex flex-col gap-2 fixed bottom-4 left-1/2 -translate-x-1/2">
      <View className="flex items-center justify-center">
        <Card className="bg-card/75 backdrop-blur-3xl">
          <CardPanel className="flex flex-row gap-3 p-1">
            <Pagination>
              <PaginationContent>
                {slides.map((slide, index) => (
                  <PaginationItem key={slide.id} onClick={() => selectSlide(slide.id)}>
                    <PaginationLink
                      id={`#slide-${index + 1}`}
                      isActive={slideId === slide.id}
                      className="text-muted-foreground"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          </CardPanel>
        </Card>
      </View>

      <Card className="w-full bg-card/75 backdrop-blur-3xl">
        <CardPanel className="flex flex-row gap-3 p-3">
          <Field>
            <FieldLabel>
              <span className="text-muted-foreground text-xs">Themes</span>
            </FieldLabel>
            <ThemeControl />
          </Field>
          <Field>
            <FieldLabel>
              <span className="text-muted-foreground text-xs">Padding</span>
            </FieldLabel>
            <Select
              aria-label="Select framework"
              defaultValue="next"
              items={items}
              value={`${padding}`}
              onValueChange={(value) => {
                const intValue = parseInt(value!, 10);
                if (isPadding(intValue)) {
                  setPadding(intValue);
                }
              }}
            >
              <SelectTrigger className={"max-w-28"}>
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {items.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </Field>
          <Field>
            <FieldLabel>
              <span className="text-muted-foreground text-xs">Language</span>
            </FieldLabel>
            <LanguageControl />
          </Field>
          <Field>
            <FieldLabel>
              <span className="text-muted-foreground text-xs">Font Face</span>
            </FieldLabel>
            <FontFaceControl />
          </Field>{" "}
          <Field>
            <FieldLabel>
              <span className="text-muted-foreground text-xs">Options</span>
            </FieldLabel>
            <Menu>
              <MenuTrigger render={<Button variant="outline" />}>
                <Settings2 />
              </MenuTrigger>
              <MenuPopup>
                <MenuCheckboxItem
                  variant="switch"
                  checked={showBackground}
                  onCheckedChange={(checked) => setShowBackground(checked)}
                >
                  Show background
                </MenuCheckboxItem>
                <MenuCheckboxItem variant="switch" checked={darkMode} onCheckedChange={toggleDarkMode}>
                  Dark Mode
                </MenuCheckboxItem>
                <MenuCheckboxItem
                  variant="switch"
                  checked={showLineNumbers}
                  onCheckedChange={toggleShowLineNumbers}
                  disabled={isDisabled}
                >
                  Line numbers
                </MenuCheckboxItem>
              </MenuPopup>
            </Menu>
          </Field>
        </CardPanel>
      </Card>
    </div>
  );
};

export default Controls;
