import { ChevronLeftIcon, HistoryIcon, MessageSquareText, UserRoundPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "@/app/(navigation)/preview/x";

export default function PreviewLayout() {
  return (
    <header className="border-b px-4 md:px-6 z-1 bg-accent/75 backdrop-blur-3xl">
      <div className="flex h-16 items-center justify-between gap-4 max-w-4xl mx-auto w-full">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <Button aria-label="Go back" className="size-8" size="icon" variant="ghost">
            <ChevronLeftIcon />
          </Button>
          <h1 className="font-medium text-sm">React Js Cheat Seat</h1>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* History button */}
          <Button
            aria-label="History"
            className="size-8 rounded-full text-muted-foreground shadow-none"
            size="icon"
            variant="ghost"
          >
            <HistoryIcon aria-hidden="true" size={16} />
          </Button>
          {/* Comments button */}
          <Button
            aria-label="Save"
            className="size-8 rounded-full text-muted-foreground shadow-none"
            size="icon"
            variant="ghost"
          >
            <MessageSquareText aria-hidden="true" size={16} />
          </Button>
          {/* Add user */}
          <Button
            aria-label="Add user"
            className="size-8 rounded-full text-muted-foreground shadow-none"
            size="icon"
            variant="ghost"
          >
            <UserRoundPlus aria-hidden="true" size={16} />
          </Button>
          {/* Online users */}
          <div className="ml-2 flex items-center gap-2">
            <div className="relative">
              <Avatar>
                <AvatarImage alt="Kelly King" src="/origin/avatar-80-07.jpg" />
                <AvatarFallback>Cal</AvatarFallback>
              </Avatar>
              <span className="-inset-e-0.5 -bottom-0.5 absolute size-3 rounded-full border-2 border-background bg-emerald-500">
                <span className="sr-only">Online</span>
              </span>
            </div>
            <div className="relative">
              <Avatar>
                <AvatarImage alt="Martha Johnson" src="/origin/avatar-80-06.jpg" />
                <AvatarFallback>Nee</AvatarFallback>
              </Avatar>
              <span className="-inset-e-0.5 -bottom-0.5 absolute size-3 rounded-full border-2 border-background bg-muted-foreground">
                <span className="sr-only">Online</span>
              </span>
            </div>
            <div className="relative">
              <Avatar>
                <AvatarImage alt="Linda Green" src="/origin/avatar-80-05.jpg" />
                <AvatarFallback>Jobs</AvatarFallback>
              </Avatar>
              <span className="-inset-e-0.5 -bottom-0.5 absolute size-3 rounded-full border-2 border-background bg-muted-foreground">
                <span className="sr-only">Online</span>
              </span>
            </div>
            <Button
              className="flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground text-xs ring-background hover:bg-secondary hover:text-foreground"
              size="icon"
              variant="secondary"
            >
              +3
            </Button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
