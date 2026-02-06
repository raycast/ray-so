import { useAtom, useAtomValue } from "jotai";
import { useContext } from "react";

import { THEMES, themeAtom, themeDarkModeAtom } from "../store/themes";
import { FrameContext } from "../store/FrameContextStore";

import FlashMessage from "./FlashMessage";
import ResizableFrame from "./ResizableFrame";
import BrowserbaseFrame from "./frame/BrowserbaseFrame";
import ClerkFrame from "./frame/ClerkFrame";
import CloudflareFrame from "./frame/CloudflareFrame";
import DefaultFrame from "./frame/DefaultFrame";
import ElevenLabsFrame from "./frame/ElevenLabsFrame";
import FirecrawlFrame from "./frame/FirecrawlFrame";
import GeminiFrame from "./frame/GeminiFrame";
import MintlifyFrame from "./frame/MintlifyFrame";
import NuxtFrame from "./frame/NuxtFrame";
import OpenAIFrame from "./frame/OpenAIFrame";
import PrismaFrame from "./frame/PrismaFrame";
import ResendFrame from "./frame/ResendFrame";
import StripeFrame from "./frame/StripeFrame";
import SupabaseFrame from "./frame/SupabaseFrame";
import TailwindFrame from "./frame/TailwindFrame";
import TriggerdevFrame from "./frame/TriggerdevFrame";
import VercelFrame from "./frame/VercelFrame";
import WrappedFrame from "./frame/WrappedFrame";

import styles from "./Frame.module.css";

const Frame = ({ resize = true }: { resize?: boolean }) => {
  const frameContext = useContext(FrameContext);
  const [theme] = useAtom(themeAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);

  function renderFrame() {
    switch (theme.id) {
      case THEMES.firecrawl.id:
        return <FirecrawlFrame />;
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
      case THEMES.wrapped.id:
        return <WrappedFrame />;
      case THEMES.cloudflare.id:
        return <CloudflareFrame />;
      case THEMES.stripe.id:
        return <StripeFrame />;
      default:
        return <DefaultFrame />;
    }
  }

  if (!resize) {
    return (
      <div className={styles.frameContainer}>
        <div className={styles.outerFrame} ref={frameContext} id="frame">
          {renderFrame()}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frameContainer} data-theme={darkMode ? "dark" : "light"}>
      <ResizableFrame>
        <FlashMessage />
        <div className={styles.outerFrame} ref={frameContext} id="frame">
          {renderFrame()}
        </div>
      </ResizableFrame>
    </div>
  );
};

export default Frame;
