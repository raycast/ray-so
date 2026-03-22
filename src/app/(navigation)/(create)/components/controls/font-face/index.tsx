"use client";

import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import fonts from "@/fonts/editor/fonts.json";
import { Field, FieldLabel } from "@/components/ui/field";
import { useAtomValue, useSetAtom } from "jotai";
import { currentElementAtom, updateSlideElementAtom } from "../../../store/editor";

type FontFaceItem = {
  name: string;
  variable: string;
  src?: string;
};

export default function FontFaceControl() {
  const elementState = useAtomValue(currentElementAtom);
  const updateSlideElement = useSetAtom(updateSlideElementAtom);

  const fontFamily = elementState?.style?.fontFamily?.toString();
  const currentFont = fonts.find((f) => f.name === fontFamily) ?? null;

  return (
    <Field>
      <FieldLabel>Font Face</FieldLabel>
      <Combobox<FontFaceItem>
        value={currentFont}
        onValueChange={(item) => {
          if (!item) return;
          updateSlideElement({
            style: { fontFamily: item.name },
          });
        }}
        itemToStringLabel={(item) => item?.name ?? ""}
        items={fonts}
      >
        <ComboboxTrigger
          className={"min-w-36"}
          render={<Button className="justify-between font-normal" variant="outline" />}
        >
          <ComboboxValue placeholder="Select font" />
          <ChevronsUpDownIcon className="-me-1!" />
        </ComboboxTrigger>
        <ComboboxPopup aria-label="Select font face">
          <div className="border-b p-2">
            <ComboboxInput
              className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
              placeholder="Search fonts..."
              showTrigger={false}
              startAddon={<SearchIcon />}
            />
          </div>
          <ComboboxEmpty>No fonts found.</ComboboxEmpty>
          <ComboboxList>
            {(font) => (
              <ComboboxItem key={font.variable} value={font}>
                {font.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </Field>
  );
}
