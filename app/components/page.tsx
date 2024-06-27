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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";
import {
  BrandCplusplusIcon,
  BrandJavascriptIcon,
  BrandPythonIcon,
  BrandTypescriptIcon,
  ChevronDownIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RaycastLogoNegIcon,
} from "@raycast/icons";
import OgImage from "./og-image.png";
import { Metadata } from "next";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Shortcut } from "@/components/kbd";
import { Input, InputSlot } from "@/components/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectItemText,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/select";

const title = "Ray.so Components";
const description = "Component playground for the ray.so ecosystem.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    url: "/components",
    title: title,
    description: description,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    title: title,
    description: description,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
};

export default function Components() {
  return (
    <div className="flex flex-col gap-12 items-start p-8">
      <h1 className="text-lg font-bold flex text-nowrap items-center gap-2">
        <RaycastLogoNegIcon className="shrink-0 w-6 h-6" /> Ray.so Component Playground
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
          <Button iconOnly size="medium" variant="primary">
            <PlusCircleIcon className="shrink-0 w-4 h-4" />
          </Button>
          <Button iconOnly size="large" variant="primary">
            <PlusCircleIcon className="shrink-0 w-5 h-5" />
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
        <div className="flex gap-2 items-center flex-wrap">
          <Switch defaultChecked />
          <Switch defaultChecked color="purple" />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Tooltip</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Dialog</h2>
        <div className="flex gap-2 items-center flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Small Dialog</Button>
            </DialogTrigger>
            <DialogContent size="small">
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
              <div className="flex flex-col gap-3">
                <Shortcut keys={["F"]}>Focus text editor</Shortcut>
                <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
                <Shortcut keys={["C"]}>Change colors</Shortcut>
                <Shortcut keys={["B"]}>Toggle background</Shortcut>
                <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
                <Shortcut keys={["P"]}>Change padding</Shortcut>
                <Shortcut keys={["L"]}>Select language</Shortcut>
                <Shortcut keys={["⌥", "click"]}>Highlight line</Shortcut>
                <Shortcut keys={["⌘", "K"]}>Toggle Export Menu</Shortcut>
                <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
                <Shortcut keys={["⌘", "shift", "S"]}>Save SVG</Shortcut>
                <Shortcut keys={["⌘", "shift", "C"]}>Copy URL</Shortcut>
                <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Medium Dialog</Button>
            </DialogTrigger>
            <DialogContent size="medium">
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
              <div className="flex flex-col gap-3">
                <Shortcut keys={["F"]}>Focus text editor</Shortcut>
                <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
                <Shortcut keys={["C"]}>Change colors</Shortcut>
                <Shortcut keys={["B"]}>Toggle background</Shortcut>
                <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
                <Shortcut keys={["P"]}>Change padding</Shortcut>
                <Shortcut keys={["L"]}>Select language</Shortcut>
                <Shortcut keys={["⌥", "click"]}>Highlight line</Shortcut>
                <Shortcut keys={["⌘", "K"]}>Toggle Export Menu</Shortcut>
                <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
                <Shortcut keys={["⌘", "shift", "S"]}>Save SVG</Shortcut>
                <Shortcut keys={["⌘", "shift", "C"]}>Copy URL</Shortcut>
                <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Large Dialog</Button>
            </DialogTrigger>
            <DialogContent size="large">
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
              <div className="flex flex-col gap-3">
                <Shortcut keys={["F"]}>Focus text editor</Shortcut>
                <Shortcut keys={["Esc"]}>Unfocus text editor</Shortcut>
                <Shortcut keys={["C"]}>Change colors</Shortcut>
                <Shortcut keys={["B"]}>Toggle background</Shortcut>
                <Shortcut keys={["D"]}>Toggle dark mode</Shortcut>
                <Shortcut keys={["P"]}>Change padding</Shortcut>
                <Shortcut keys={["L"]}>Select language</Shortcut>
                <Shortcut keys={["⌥", "click"]}>Highlight line</Shortcut>
                <Shortcut keys={["⌘", "K"]}>Toggle Export Menu</Shortcut>
                <Shortcut keys={["⌘", "S"]}>Save PNG</Shortcut>
                <Shortcut keys={["⌘", "shift", "S"]}>Save SVG</Shortcut>
                <Shortcut keys={["⌘", "shift", "C"]}>Copy URL</Shortcut>
                <Shortcut keys={["?"]}>Open shortcuts</Shortcut>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Input</h2>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center flex-wrap">
            <Input placeholder="Search…" size="medium" className="w-[200px]" />
            <Input placeholder="Search…" size="large" className="w-[200px]" />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <Input placeholder="Search…" size="medium" className="w-[200px]">
              <InputSlot side="left">
                <MagnifyingGlassIcon className="w-3.5 h-3.5" />
              </InputSlot>
              <InputSlot>
                <HeartIcon className="w-3.5 h-3.5" />
              </InputSlot>
            </Input>
            <Input placeholder="Search…" size="large" className="w-[200px]">
              <InputSlot side="left">
                <MagnifyingGlassIcon />
              </InputSlot>
              <InputSlot>
                <HeartIcon />
              </InputSlot>
            </Input>
          </div>
          <div className="flex gap-2 items-center flex-wrap bg-panel p-4">
            <Input placeholder="Search…" size="medium" className="w-[200px]" variant="soft" />
            <Input placeholder="Search…" size="large" className="w-[200px]" variant="soft" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="font-medium">Select</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Popular</SelectLabel>
                  <SelectItem value="typescript">
                    <SelectItemText>TypeScript</SelectItemText>
                  </SelectItem>
                  <SelectItem value="javascript">
                    <SelectItemText>JavaScript</SelectItemText>
                  </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectItem value="python">
                    <SelectItemText>Python</SelectItemText>
                  </SelectItem>
                  <SelectItem value="cpp">
                    <SelectItemText>C++</SelectItemText>
                  </SelectItem>
                  <SelectItem value="rust">
                    <SelectItemText>Rust</SelectItemText>
                  </SelectItem>
                  <SelectItem value="go">
                    <SelectItemText>Go</SelectItemText>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select defaultValue="cpp">
              <SelectTrigger className="w-[200px]" size="large">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Popular</SelectLabel>
                  <SelectItem value="typescript">
                    <SelectItemText>TypeScript</SelectItemText>
                  </SelectItem>
                  <SelectItem value="javascript">
                    <SelectItemText>JavaScript</SelectItemText>
                  </SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectItem value="python">
                    <SelectItemText>Python</SelectItemText>
                  </SelectItem>
                  <SelectItem value="cpp">
                    <SelectItemText>C++</SelectItemText>
                  </SelectItem>
                  <SelectItem value="rust">
                    <SelectItemText>Rust</SelectItemText>
                  </SelectItem>
                  <SelectItem value="go">
                    <SelectItemText>Go</SelectItemText>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Select defaultValue="cpp">
            <SelectTrigger className="w-[60px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typescript">
                <SelectItemText>
                  <BrandTypescriptIcon />
                </SelectItemText>
                TypeScript
              </SelectItem>
              <SelectItem value="javascript">
                <SelectItemText>
                  <BrandJavascriptIcon />
                </SelectItemText>
                JavaScript
              </SelectItem>
              <SelectItem value="python">
                <SelectItemText>
                  <BrandPythonIcon />
                </SelectItemText>
                Python
              </SelectItem>
              <SelectItem value="cpp">
                <SelectItemText>
                  <BrandCplusplusIcon />
                </SelectItemText>
                C++
              </SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="cpp">
            <SelectTrigger className="w-[70px]" size="large">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typescript">
                <SelectItemText>
                  <BrandTypescriptIcon />
                </SelectItemText>
                TypeScript
              </SelectItem>
              <SelectItem value="javascript">
                <SelectItemText>
                  <BrandJavascriptIcon />
                </SelectItemText>
                JavaScript
              </SelectItem>
              <SelectItem value="python">
                <SelectItemText>
                  <BrandPythonIcon />
                </SelectItemText>
                Python
              </SelectItem>
              <SelectItem value="cpp">
                <SelectItemText>
                  <BrandCplusplusIcon />
                </SelectItemText>
                C++
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
