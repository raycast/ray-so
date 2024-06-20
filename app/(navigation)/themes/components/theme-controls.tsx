import { AddToRaycast } from "@themes/components/add-to-raycast";
import { ThemeFilter } from "@themes/components/theme-filter";
import { ThemeNavigation } from "@themes/components/theme-navigation";
import { Theme } from "@themes/lib/theme";

export function ThemeControls({ themes }: { themes: Theme[] }) {
  return (
    <div
      data-theme-controls
      className="flex justify-between mt-8 px-4 w-full max-w-screen-2xl mx-auto h-[30px] relative"
    >
      <ThemeFilter themes={themes} />
      <div className="absolute left-1/2 top-0" style={{ transform: "translateX(-50%)" }}>
        <AddToRaycast />
      </div>
      <ThemeNavigation themes={themes} />
    </div>
  );
}
