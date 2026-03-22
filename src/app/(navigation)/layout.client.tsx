"use client";

import ThemeSwitch from "@/components/theme-switch";
import InfoDialog from "./(create)/components/InfoDialog";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import FormatButton from "./(create)/components/FormatCodeButton";
import ExportButton from "./(create)/components/ExportButton";
import PlansDialog from "./(create)/components/PlansDialog";
import View from "@/components/view";
import { usePathname, useRouter } from "next/navigation";
import siteConfig from "@/contstant/site-config";

const tabs = [
  {
    label: "Create",
    value: "create",
    href: "/",
  },
  {
    label: "Explore",
    value: "explore",
    href: "/explore",
  },
  {
    label: "Snippets",
    value: "snippets",
    href: "/snippets",
  },
];

export default function CodeLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="layout-fill">
      <header className="border-b px-4 md:px-6 bg-background backdrop-blur-sm">
        <div className="flex flex-1 h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex-1 flex shrink-0 items-center gap-1.5 font-heading text-xl sm:text-[1.625em]">
            {siteConfig.name}
            <span className="text-muted-foreground/64 lowercase">
              {tabs.find(({ href }) => href === pathname)?.label}
            </span>
          </div>
          {/* Middle area */}
          <Tabs value={pathname} onValueChange={(href) => router.push(href)}>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTab key={tab.value} value={tab.href}>
                  {tab.label}
                </TabsTab>
              ))}
            </TabsList>
          </Tabs>
          {/* Right side */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <FormatButton />
            <ExportButton />
            <ThemeSwitch />
            <PlansDialog />
            <InfoDialog />
          </div>
        </div>
      </header>
      {children}
    </View>
  );
}
