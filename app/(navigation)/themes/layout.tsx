import { Providers } from "@themes/components/providers";
import { ThemeSwitcher } from "@themes/components/theme-switcher";
import { getAllThemes } from "@themes/lib/theme";
import { ThemeControls } from "@themes/components/theme-controls";
import { NavigationActions } from "@/components/navigation";
import { Button } from "@/components/button";
import { SpeechBubbleIcon } from "@raycast/icons";
import KeyboardShortcutsPanel from "@/app/(navigation)/(code)/components/KeyboardShortcutsPanel";
import ExportButton from "@/app/(navigation)/(code)/components/ExportButton";
import KeyboardShortcuts from "./components/keyboard-shortcuts";

export const metadata = {
  title: "Theme Explorer by Raycast",
  description: "A tool to easily share, browse and import Raycast Themes.",
};

export default async function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  const themes = await getAllThemes();

  return (
    <Providers themes={themes}>
      <div className="flex flex-col h-[calc(100dvh-50px)] items-center 2xl:pt-3 themes-body">
        <div className="flex flex-col flex-1 overflow-hidden shadow-[0px_0px_29px_10px_rgba(0,0,0,0.06)] dark:shadow-[0px_0px_29px_10px_rgba(255,255,255,.06)] max-w-screen-2xl w-full 2xl:rounded-xl">
          {children}
        </div>
        <ThemeControls themes={themes} />
        <ThemeSwitcher themes={themes} />
        <NavigationActions className="hidden sm:flex">
          <Button variant="transparent" asChild>
            <a href="mailto:feedback+rayso@raycast.com?subject=Themes">
              <SpeechBubbleIcon className="w-4 h-4" /> Send Feedback
            </a>
          </Button>
          <KeyboardShortcuts />
        </NavigationActions>
      </div>
    </Providers>
  );
}
