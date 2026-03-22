import { SparklesIcon, UploadIcon } from "lucide-react";

import AppToggle from "@/components/navbar-components/app-toggle";
import TeamSwitcher from "@/components/navbar-components/team-switcher";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTab } from "../ui/tabs";

const teams = ["Acme Inc.", "coss.com", "Junon"];

export default function Navbar2() {
  return (
    <header className="border-b px-4 md:px-6 bg-background backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          <TeamSwitcher defaultTeam={teams[0]} teams={teams} />
        </div>
        {/* Middle area */}
        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTab value="community">Community</TabsTab>
            <TabsTab value="account">Code to image </TabsTab>
            <TabsTab value="password">My Snippets </TabsTab>
          </TabsList>
        </Tabs>
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button className="text-sm max-sm:aspect-square max-sm:p-0" size="sm" variant="ghost">
            <UploadIcon aria-hidden="true" className="sm:-ms-1 opacity-60" size={16} />
            <span className="max-sm:sr-only">Export</span>
          </Button>
          <Button className="text-sm max-sm:aspect-square max-sm:p-0" size="sm">
            <SparklesIcon aria-hidden="true" className="sm:-ms-1 opacity-60" size={16} />
            <span className="max-sm:sr-only">Upgrade</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
