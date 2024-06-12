import {
  CircleDisabledIcon,
  StackedBars1Icon,
  StackedBars2Icon,
  StackedBars3Icon,
  StackedBars4Icon,
} from "@raycast/icons";
import { Preset } from "../presets";

export default function CreativityIcon({ creativity }: { creativity: Preset["creativity"] }) {
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

  return component;
}
