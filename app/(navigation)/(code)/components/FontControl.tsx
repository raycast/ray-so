import { useAtom } from "jotai";
import { Font, fontAtom, loadingFontAtom } from "../store/font";
import { FONTS } from "../store/font";
import styles from "./FontControl.module.css";
import ControlContainer from "./ControlContainer";
import { Select, SelectContent, SelectItem, SelectItemText, SelectTrigger, SelectValue } from "@/components/select";
import { ChevronUpIcon } from "@raycast/icons";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { themeAtom } from "../store/themes";

const FontControl: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [font, setFont] = useAtom(fontAtom);
  const [isLoadingFont] = useAtom(loadingFontAtom);
  const [theme] = useAtom(themeAtom);

  const selectedFont = font || (theme?.font && FONTS.includes(theme.font as Font) ? theme.font : FONTS[0]);

  return (
    <ControlContainer title="FontFamily">
      <Select
        open={isOpen}
        onOpenChange={(open) => setOpen(open)}
        onValueChange={(value) => setFont(value as Font)}
        value={selectedFont}
      >
        <SelectTrigger
          size="small"
          className={cn("w-[160px]", isLoadingFont && styles.loadingShimmer)}
          icon={ChevronUpIcon}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FONTS.map((fontKey) => (
            <SelectItem key={fontKey} value={fontKey}>
              <SelectItemText>
                {FONTS.find((f) => f === fontKey)
                  ?.replace("-", " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </SelectItemText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlContainer>
  );
};

export default FontControl;
