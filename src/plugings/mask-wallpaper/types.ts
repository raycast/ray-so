export interface Position {
  x: number;
  y: number;
}

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface PatternOptions {
  image?: string;
  mask?: boolean;
  background?: string;
  blur?: number;
  size?: string;
  opacity?: number;
}

export interface MaskWallpaperOptions {
  colors: string[];
  fps?: number;
  tails?: number;
  animate?: boolean;
  scrollAnimate?: boolean;
  pattern?: PatternOptions;
}
