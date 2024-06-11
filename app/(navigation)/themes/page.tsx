import ThemeSwitch from "@/components/theme-switch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Themes",
};

export default function Page() {
  return (
    <div className="theme-explorer">
      <div className="h-[50px] absolute top-0 right-0">action</div>
      <div>theme explorer</div>
      <ThemeSwitch />
    </div>
  );
}
