import { useContext } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { FrameContext } from "../store/context/frame";
import FlashMessage from "./FlashMessage";
import ResizableFrame from "./ResizableFrame";
import BrowserbaseFrame from "./frames/BrowserbaseFrame";
import ClerkFrame from "./frames/ClerkFrame";
import CloudflareFrame from "./frames/CloudflareFrame";
import DefaultFrame from "./frames/DefaultFrame";
import ElevenLabsFrame from "./frames/ElevenLabsFrame";
import FirecrawlFrame from "./frames/FirecrawlFrame";
import GeminiFrame from "./frames/GeminiFrame";
import MintlifyFrame from "./frames/MintlifyFrame";
import NuxtFrame from "./frames/NuxtFrame";
import OpenAIFrame from "./frames/OpenAIFrame";
import PrismaFrame from "./frames/PrismaFrame";
import ResendFrame from "./frames/ResendFrame";
import StripeFrame from "./frames/StripeFrame";
import SupabaseFrame from "./frames/SupabaseFrame";
import TailwindFrame from "./frames/TailwindFrame";
import TriggerdevFrame from "./frames/TriggerdevFrame";
import VercelFrame from "./frames/VercelFrame";

import styles from "./Frame.module.css";
import { THEMES } from "../constants/themes";
import ToolbarParticle from "./Toolbar";
import View from "@/components/view";
import { Swiper, SwiperSlide } from "swiper/react";
import { currentElementAtom, currentSlideIdAtom, selectSlideAtom, slidesAtom } from "../store/editor";
import React from "react";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "@/utils/cn";

type Presets = {
  id: string;
};

const Frame = () => {
  const frameRefs = useContext(FrameContext);

  const slides = useAtomValue(slidesAtom);
  const elementState = useAtomValue(currentElementAtom);
  const themeId = elementState?.properties?.theme!;
  const darkMode = (elementState?.properties?.darkMode as boolean) ?? false;

  const selectSlide = useSetAtom(selectSlideAtom);
  const slideId = useAtomValue(currentSlideIdAtom);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef<SwiperType | null>(null);

  return (
    <>
      <div className={cn(styles.frameContainer)} data-theme={darkMode ? "dark" : "light"}>
        <Swiper
          initialSlide={Math.max(
            0,
            slides.findIndex((s) => s.id === slideId),
          )}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            const slide = slides[swiper.activeIndex];
            setActiveIndex(swiper.activeIndex);
            if (slide) selectSlide(slide.id);
          }}
          allowTouchMove={false}
          spaceBetween={50}
          className={"flex items-center justify-center"}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="w-full flex! flex-col items-center justify-center">
              <View className="flex items-center justify-center mb-4">
                <ToolbarParticle />
              </View>
              <ResizableFrame>
                <FlashMessage />
                <div
                  id="frame"
                  className={styles.outerFrame}
                  ref={(el) => {
                    frameRefs.current.set(slide.id, el);
                  }}
                >
                  <Presets id={themeId} />
                </div>
              </ResizableFrame>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Frame;

function Presets({ id }: Presets) {
  switch (id) {
    case THEMES.vercel.id:
    case THEMES.rabbit.id:
      return <VercelFrame />;
    case THEMES.supabase.id:
      return <SupabaseFrame />;
    case THEMES.tailwind.id:
      return <TailwindFrame />;
    case THEMES.clerk.id:
      return <ClerkFrame />;
    case THEMES.mintlify.id:
      return <MintlifyFrame />;
    case THEMES.openai.id:
      return <OpenAIFrame />;
    case THEMES.triggerdev.id:
      return <TriggerdevFrame />;
    case THEMES.prisma.id:
      return <PrismaFrame />;
    case THEMES.elevenlabs.id:
      return <ElevenLabsFrame />;
    case THEMES.resend.id:
      return <ResendFrame />;
    case THEMES.browserbase.id:
      return <BrowserbaseFrame />;
    case THEMES.nuxt.id:
      return <NuxtFrame />;
    case THEMES.gemini.id:
      return <GeminiFrame />;
    case THEMES.cloudflare.id:
      return <CloudflareFrame />;
    case THEMES.stripe.id:
      return <StripeFrame />;
    case THEMES.firecrawl.id:
      return <FirecrawlFrame />;
    default:
      return <DefaultFrame />;
  }
}
