import * as Tooltip from "@radix-ui/react-tooltip";

import {
  CircleDisabledIcon,
  StackedBars1Icon,
  StackedBars2Icon,
  StackedBars3Icon,
  StackedBars4Icon,
} from "@raycast/icons";
import { Prompt } from "../prompts";

import styles from "./CreativityIcon.module.css";

export default function CreativityIcon({ creativity }: { creativity: Prompt["creativity"] }) {
  let component = null;
  if (creativity === "none") {
    component = <CircleDisabledIcon />;
  }

  if (creativity === "low") {
    component = <StackedBars1Icon />;
  }

  if (creativity === "medium") {
    component = <StackedBars2Icon />;
  }

  if (creativity === "high") {
    component = <StackedBars3Icon />;
  }

  if (creativity === "maximum") {
    component = <StackedBars4Icon />;
  }

  const creativityText = {
    none: "No creativity",
    low: "Low creativity",
    medium: "Medium creativity",
    high: "High creativity",
    maximum: "Maximum creativity",
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>
          <button className={styles.button}>{component}</button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltip} sideOffset={5}>
            {creativityText[creativity]}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
