import Image from "next/image";
import lightWallpaper from "@themes/assets/bg-light.jpeg";
import darkWallpaper from "@themes/assets/bg-dark.jpeg";
import { Dock } from "@themes/components/dock";

export function Desktop({ children }: { children?: React.ReactNode }) {
  return (
    <div
      data-desktop
      className="flex flex-1 h-full w-full rounded-inherit bg-white dark:bg-black border-t border-b 2xl:border border-black/20 dark:border-white/20 relative overflow-hidden"
    >
      <div className="flex flex-col h-full md:items-center tall:justify-center desktop:justify-center flex-1 p-5 rounded-inherit overflow-y-auto">
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>

        <Dock />

        <Image
          data-wallpaper="dark"
          className="object-cover select-none pointer-events-none"
          src={darkWallpaper}
          fill
          placeholder="blur"
          quality={100}
          alt=""
        />
        <Image
          data-wallpaper="light"
          className="object-cover select-none pointer-events-none"
          src={lightWallpaper}
          fill
          placeholder="blur"
          quality={100}
          alt=""
        />
      </div>
    </div>
  );
}
