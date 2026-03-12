import { COLORS } from "./colors";
import { PATTERN_SIZE, PATTERNS } from "./patterns";
import { MaskWallpaperOptions } from "@/plugings/mask-wallpaper/types";

export const wallpaperOptions: MaskWallpaperOptions = {
  fps: 30,
  tails: 30,
  animate: false,
  colors: COLORS[3].colors,
  scrollAnimate: false,
  pattern: {
    image: PATTERNS[2].path,
    background: "#000",
    size: `${PATTERN_SIZE}px`,
    opacity: 0.3,
    mask: true,
    blur: 0,
  },
};

// export const paneOptions = {
//   enablePattern: true,
//   container: document.querySelector<HTMLElement>('#app')!,
//   stringOptions: JSON.stringify(wallpaperOptions, null, 2),
//   copyOptions: cloneDeep(wallpaperOptions),
//   currentColors: arrayColorToObject(wallpaperOptions.colors),
//   patternSize: PATTERN_SIZE,
//   mixBlendMode: 'overlay'
// }
