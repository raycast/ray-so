import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Switch } from "@/components/switch";
import { ChevronDownIcon, PlusCircleIcon, RaycastLogoNegIcon } from "@raycast/icons";

export default function Components() {
  return (
    <div className="flex flex-col gap-12 items-start p-8">
      <h1 className="text-lg font-medium flex text-nowrap items-center gap-2">
        <RaycastLogoNegIcon className="shrink-0 w-6 h-6" /> Ray.so components
      </h1>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Dropdown Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Choose one</DropdownMenuLabel>
              <DropdownMenuItem>Item</DropdownMenuItem>
              <DropdownMenuItem>Item</DropdownMenuItem>
              <DropdownMenuItem>Item</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Item</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Item</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Choose one</DropdownMenuLabel>
              <DropdownMenuRadioGroup value="one">
                <DropdownMenuRadioItem value="one">Item</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="two">Item</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="three">Item</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Button</h2>
        <div className="flex gap-2 items-center flex-wrap">
          <Button size="medium" variant="primary">
            medium primary button
          </Button>
          <Button size="large" variant="primary">
            large primary button
          </Button>
          <Button size="medium">medium secondary button</Button>
          <Button size="large">large secondary button</Button>
          <Button size="medium" variant="transparent">
            medium transparent button
          </Button>
          <Button size="large" variant="transparent">
            large transparent button
          </Button>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Button size="medium" variant="primary">
            <PlusCircleIcon className="shrink-0 w-4 h-4" /> medium with icon
          </Button>
          <Button size="large" variant="primary">
            <PlusCircleIcon className="shrink-0 w-5 h-5" /> large with icon
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Button Group</h2>
        <ButtonGroup>
          <Button variant="primary">Button</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary">
                <ChevronDownIcon className="shrink-0 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Item</DropdownMenuItem>
              <DropdownMenuItem>Item</DropdownMenuItem>
              <DropdownMenuItem>Item</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Switch</h2>
        <Switch defaultChecked />
      </div>
    </div>
  );
}
