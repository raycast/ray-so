"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TeamSwitcher({ teams, defaultTeam }: { teams: string[]; defaultTeam: string }) {
  const [selectedProject, setSelectedProject] = React.useState(defaultTeam);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-0 hover:bg-transparent" variant="ghost">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {selectedProject.charAt(0).toUpperCase()}
          </span>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="">{selectedProject}</span>
          </div>
          <ChevronsUpDown className="text-muted-foreground/80" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {teams.map((project) => (
          <DropdownMenuItem key={project} onSelect={() => setSelectedProject(project)}>
            {project}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
