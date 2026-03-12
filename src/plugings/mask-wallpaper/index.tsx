import React from "react";
import { MaskWallpaper as Wallpaper } from "./wallpaper";
import type { PatternOptions, MaskWallpaperOptions } from "./types";

interface MaskWallpaperProps extends React.HTMLAttributes<HTMLDivElement> {
  options: MaskWallpaperOptions;
}

export interface MaskWallpaperHandlers {
  animate(start?: boolean): void;
  scrollAnimate(start?: boolean): void;
  updateColors(colors: string[]): void;
  updateFrametime(fps: number): void;
  updatePattern(pattern: PatternOptions): void;
  updateTails(tails: number): void;
  toNextPosition(onNext?: () => void): void;
}

const MaskWallpaper = React.forwardRef<MaskWallpaperHandlers, MaskWallpaperProps>(({ options, ...props }, ref) => {
  const container = React.useRef<HTMLDivElement>(null);
  const wallpaper = React.useRef<Wallpaper>(null);

  React.useImperativeHandle(ref, () => ({
    animate(start) {
      wallpaper.current!.animate(start);
    },
    scrollAnimate(start) {
      wallpaper.current!.scrollAnimate(start);
    },
    updateColors(colors) {
      wallpaper.current!.updateColors(colors);
    },
    updateFrametime(fps) {
      wallpaper.current!.updateFrametime(fps);
    },
    updatePattern(pattern) {
      wallpaper.current!.updatePattern(pattern);
    },
    updateTails(tails) {
      wallpaper.current!.updateTails(tails);
    },
    toNextPosition(onNext) {
      wallpaper.current!.toNextPosition(onNext);
    },
  }));

  React.useEffect(() => {
    if (!wallpaper.current) {
      wallpaper.current = new Wallpaper(container.current!);
    }
    return () => {
      wallpaper.current!.dispose();
    };
  }, []);

  React.useEffect(() => {
    if (wallpaper.current) {
      wallpaper.current.init(options);
      console.log(options);
    }
  }, [options]);

  return <div {...props} ref={container} />;
});

MaskWallpaper.displayName = "Mask Wallpaper";

export default React.memo(MaskWallpaper);
