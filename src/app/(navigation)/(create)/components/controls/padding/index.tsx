import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAtomValue, useSetAtom } from "jotai";
import { elementPaddingAtom, updateSlideElementAtom } from "../../../store/editor";
import useHotkeys from "@/utils/useHotkeys";
import { Button } from "@/components/ui/button";

const PADDING_OPTIONS = [
  { label: "16px", value: "16px" },
  { label: "32px", value: "32px" },
  { label: "64px", value: "64px" },
  { label: "128px", value: "128px" },
] as const;

type PaddingValue = (typeof PADDING_OPTIONS)[number]["value"];

const PaddingControl: React.FC = () => {
  const padding = useAtomValue(elementPaddingAtom);
  const updateSlideElement = useSetAtom(updateSlideElementAtom);

  useHotkeys("p", (e) => {
    e.preventDefault();
    const currentIndex = PADDING_OPTIONS.findIndex((o) => o.value === padding);
    const next = PADDING_OPTIONS[currentIndex + 1] ?? PADDING_OPTIONS[0];
    updateSlideElement({ style: { padding: next.value } });
  });

  return (
    <Field>
      <FieldLabel>Padding</FieldLabel>
      <Select
        aria-label="Padding size"
        items={PADDING_OPTIONS}
        value={padding?.toString()}
        onValueChange={(value) => {
          updateSlideElement({
            style: { padding: value as PaddingValue },
          });
        }}
      >
        <SelectTrigger
          className="max-w-28"
          render={<Button className="min-w-36 justify-between font-normal" variant="outline" />}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {PADDING_OPTIONS.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </Field>
  );
};

export default PaddingControl;
