import { useAtom } from "jotai";
import React, { useState } from "react";
import ControlContainer from "./ControlContainer";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import {codeAtom} from "../store/code";
import { useCallback } from "react";
import { Button } from "@/components/button";
import { interval, map, take } from "rxjs";
import { EMIT_SPEEDS, emitSpeedAtom, isEmitSpeed } from "@code/store/emit_speed";
import styles from "@code/components/PaddingControl.module.css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const EmitCodeControl: React.FC = () => {
  const [code, setCode] = useAtom(codeAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [rawCodes, setRawCodes] = useState("");
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
  const [emitSpeed, setEmitSpeed] = useAtom(emitSpeedAtom);

  const codesDone = () => {
    setIsOpen(false);
  }

  const startEmit = () => {
    let codePiece = rawCodes;
    console.log(codePiece);
    const seconds = interval(emitSpeed);
    const codeCharsSubscriber = seconds.pipe(take(codePiece.length)).pipe(
      map((i) => codePiece[i])
    );

    let progressChars = '';
    codeCharsSubscriber.subscribe((char) => {
      progressChars = progressChars + char;
      setCode(progressChars);
    });
  };

  return (
    <ControlContainer title="Dynamic">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="transparent" className="hidden md:flex gap-2">
            Paste
          </Button>
        </DialogTrigger>
        <DialogContent size="large">
          <div className="flex gap-8">
            <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
              <DialogTitle>Paste your Codes Here</DialogTitle>
              <textarea
                id={"codePiece"}
                className="w-full h-[200px] p-4 rounded-md border border-gray-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paste your code here..."
                value={rawCodes}
                onChange={(e) => setRawCodes(e.target.value)}
              />
            </div>
          </div>
          <Button variant="transparent" className="hidden md:flex gap-2" onClick={codesDone}>
            Done
          </Button>
        </DialogContent>
      </Dialog>
      <ToggleGroup.Root
        className={styles.toggleGroup}
        type="single"
        value={`${emitSpeed}`}
        aria-label="Emit Speed"
        onValueChange={(value) => {
          const intValue = parseInt(value, 10);
          if (isEmitSpeed(intValue)) {
            setEmitSpeed(intValue);
          }
        }}
      >
        {EMIT_SPEEDS.map((emitSpeed) => (
          <ToggleGroup.Item
            key={emitSpeed}
            className={styles.toggleGroupItem}
            value={`${emitSpeed}`}
            aria-label={`${emitSpeed}`}
          >
            {emitSpeed}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      <Button variant="transparent" className="hidden md:flex gap-2" onClick={startEmit}>
        Generate
      </Button>
    </ControlContainer>
  );
};

export default EmitCodeControl;
