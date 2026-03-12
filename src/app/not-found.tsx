import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon, RouteIcon } from "lucide-react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function Particle() {
  return (
    <div className={cn("h-screen flex flex-col")}>
      <main className="layout-fill">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RouteIcon />
            </EmptyMedia>
            <EmptyTitle>Page Not Found</EmptyTitle>
            <EmptyDescription>The page you are looking for doesn't exist..</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button size="sm">
                <PlusIcon className="mr-1 h-4 w-4" />
                Create snippet
              </Button>

              <Button size="sm" variant="outline">
                Explore community
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
}
