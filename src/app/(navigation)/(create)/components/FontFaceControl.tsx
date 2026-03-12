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
import fonts from "@/json/fonts.json";

interface Font {
  code: string;
  value: string | null;
  continent: string;
  label: string;
}

export default function FontFaceControl() {
  return (
    <Combobox defaultValue={fonts[0]} items={fonts}>
      <ComboboxTrigger render={<Button className="min-w-36 justify-between font-normal" variant="outline" />}>
        <ComboboxValue />
        <ChevronsUpDownIcon className="-me-1!" />
      </ComboboxTrigger>
      <ComboboxPopup aria-label="Select country">
        <div className="border-b p-2">
          <ComboboxInput
            className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
            placeholder="e.g. United Kingdom"
            showTrigger={false}
            startAddon={<SearchIcon />}
          />
        </div>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(font) => (
            <ComboboxItem key={font.value} value={font}>
              {font.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
