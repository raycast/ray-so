import { IconName } from "@raycast/icons";

export type SettingsType = {
  backgroundFillType: string;
  backgroundStartColor: string;
  backgroundEndColor: string;
  backgroundAngle?: number;
  backgroundPosition?: string;
  backgroundSpread: number;
  backgroundRadius: number;
  backgroundStrokeSize: number;
  backgroundStrokeColor: string;
  backgroundStrokeOpacity: number;
  backgroundRadialGlare: boolean;
  backgroundNoiseTexture: boolean;
  backgroundNoiseTextureOpacity: number;
  iconColor: string;
  iconSize: number;
  iconOffsetX: number;
  iconOffsetY: number;
  icon?: IconName;
  customSvg?: string;
  fileName: string;
  selectedPresetIndex: number | null;
};
