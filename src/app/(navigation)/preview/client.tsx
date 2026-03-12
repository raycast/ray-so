"use client";

import React from "react";
import View from "@/components/view";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ArrowBigUpDash,
  Blend,
  BookmarkIcon,
  CircleAlertIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  MessageCircle,
  MessageCircleMore,
  Share2,
  ShareIcon,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { wallpaperOptions } from "./share/config";
import MaskWallpaper from "@/plugings/mask-wallpaper";
import PreviewLayout from "@/components/layouts/preview";
import { Field, FieldLabel } from "@/components/ui/field";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MaskWallpaperOptions } from "@/plugings/mask-wallpaper/types";
import { COLORS } from "./share/colors";
import { PATTERNS } from "./share/patterns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider, SliderValue } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ClerkFrame from "../(code)/components/frames/ClerkFrame";
import ProfileDropdown from "./x";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const frameworkOptions = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
];

type ShareWidgetProps = object;

const PreviewSnippetClient: React.FC<ShareWidgetProps> = ({}) => {
  const [options, setOptions] = React.useState(wallpaperOptions);

  const updateOptions = (newOptions: MaskWallpaperOptions) => {
    setOptions(newOptions);
  };

  return (
    <View className="layout-fill relative flex-1 bg-transparent border">
      <MaskWallpaper options={options} className={"absolute top-0 left-0 w-full h-full z-0"} />
      <PreviewLayout />

      <View className="layout-scroll flex-2 gap-3 border">
        <View className={"flex flex-row gap-3 z-10 max-w-4xl mx-auto w-full p-2 relative"}>
          <View className="flex flex-col flex-2 gap-3 relative">
            <View className="flex items-center justify-center">
              <Badge variant="secondary" className="bg-background/75 backdrop-blur-lg">
                Snippet Created
              </Badge>
            </View>
            <View className="flex items-center justify-center">
              <Badge variant="secondary" className="bg-background/75 backdrop-blur-lg">
                February 2, 2024
              </Badge>
            </View>
            <Particle>
              <ClerkFrame />
            </Particle>
            <View className="flex items-center justify-center">
              <Badge variant="secondary" className="bg-background/75 backdrop-blur-lg">
                February 4, 2024
              </Badge>
            </View>
            <Particle>
              <ClerkFrame />
            </Particle>
          </View>
          {/* Widget Section with Ads and sponsorship */}
          <View className="flex flex-col gap-3 flex-1 sticky top-2 self-start z-10">
            <Particle />
            <Card className="w-full bg-background/50 backdrop-blur-lg">
              <CardPanel className="px-4 py-0">
                <Accordion className="w-full" defaultValue={["3"]}>
                  <AccordionItem value={"Theme Customization"}>
                    <AccordionTrigger>Theme</AccordionTrigger>
                    <AccordionPanel className={"flex flex-col gap-2"}>
                      <Label>
                        <Checkbox />
                        Animate the wallpaper
                      </Label>
                      <Field>
                        <FieldLabel>Colors</FieldLabel>
                        <Select
                          items={COLORS.map(({ text, colors }) => ({
                            label: text,
                            value: colors.join(","),
                          }))}
                          value={COLORS.find((color) => color.colors.join(",") === options.colors.join(","))?.text}
                          onValueChange={(value) => {
                            updateOptions({
                              ...options,
                              colors: value?.split(",") || [],
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectPopup>
                            {COLORS.map(({ text, colors }) => (
                              <SelectItem key={text} value={colors.join(",")}>
                                {text}
                              </SelectItem>
                            ))}
                          </SelectPopup>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel>Patterns</FieldLabel>
                        <Select
                          items={PATTERNS.map(({ text, path }) => ({
                            label: text,
                            value: path,
                          }))}
                          value={options?.pattern?.image}
                          onValueChange={(value) => {
                            updateOptions({
                              ...options,
                              pattern: {
                                ...options.pattern,
                                image: value!,
                              },
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectPopup>
                            {PATTERNS.map(({ text, path }) => (
                              <SelectItem key={text} value={path}>
                                {text}
                              </SelectItem>
                            ))}
                          </SelectPopup>
                        </Select>
                      </Field>
                      <Field>
                        <Slider defaultValue={50}>
                          <div className="mb-2 flex items-center justify-between gap-1">
                            <FieldLabel className="font-medium text-sm">Pattern Size</FieldLabel>
                            <SliderValue />
                          </div>
                        </Slider>
                      </Field>
                      <Field>
                        <Slider defaultValue={50}>
                          <div className="mb-2 flex items-center justify-between gap-1">
                            <FieldLabel className="font-medium text-sm">Opacity</FieldLabel>
                            <SliderValue />
                          </div>
                        </Slider>
                      </Field>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </CardPanel>
            </Card>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PreviewSnippetClient;

function Particle({ children }: { children?: React.ReactNode }) {
  return (
    <Card className="w-full bg-background/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>
          <View className="flex items-center justify-between">
            <View className="flex items-center gap-2">
              <div className="relative">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                  Neeraj Ji
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 tracking-tight leading-tight">@simple</div>
              </div>
            </View>
            <View>
              <Button variant={"outline"}>
                <EllipsisVerticalIcon />
              </Button>
            </View>
          </View>
        </CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardPanel>
        <View className="flex flex-col gap-2">
          <article className="prose prose-sm">
            <h1>Garlic bread with cheese: What the science tells us</h1>
            <p>
              For years parents have espoused the health benefits of eating garlic bread with cheese to their children,
              with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy
              loaf for Halloween.
            </p>
            <p>
              But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing
              up around the country.
            </p>
            <blockquote>Hello</blockquote>
          </article>
          <View className="flex flex-col gap-2 rounded-lg overflow-hidden">{children}</View>
        </View>
      </CardPanel>
      <CardFooter>
        <div className="flex gap-2 justify-between">
          {/* Upvote */}
          <View className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" className="gap-2">
                      <ArrowBigUpDash className="size-4 shrink-0" />
                      <span>124 </span>
                    </Button>
                  }
                />
                <TooltipPopup>Upvote</TooltipPopup>
              </Tooltip>

              {/* Comment */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" className="gap-2">
                      <MessageCircle className="size-4 shrink-0" />
                      <span>12</span>
                    </Button>
                  }
                />
                <TooltipPopup>Comments</TooltipPopup>
              </Tooltip>
            </TooltipProvider>
          </View>
          <View className="flex items-center gap-2">
            <TooltipProvider>
              {/* Save */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" className="gap-2">
                      <BookmarkIcon className="size-4 shrink-0" />
                      <span>45</span>
                    </Button>
                  }
                />
                <TooltipPopup>Save</TooltipPopup>
              </Tooltip>

              {/* Remix */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" className="gap-2">
                      <Blend className="size-4 shrink-0" />
                      <span>8</span>
                    </Button>
                  }
                />
                <TooltipPopup>Remix</TooltipPopup>
              </Tooltip>

              {/* Share */}
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" className="gap-2">
                      <Share2 className="size-4 shrink-0" />
                      <span>6</span>
                    </Button>
                  }
                />
                <TooltipPopup>Share</TooltipPopup>
              </Tooltip>
            </TooltipProvider>
          </View>
        </div>
      </CardFooter>
    </Card>
  );
}
