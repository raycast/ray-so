import { useAtom, useAtomValue } from "jotai";
import { useContext } from "react";

import { THEMES, themeAtom, themeDarkModeAtom } from "../store/themes";
import { FrameContext } from "../store/FrameContextStore";

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

const Frame = ({ resize = true }: { resize?: boolean }) => {
  const frameContext = useContext(FrameContext);
  const [theme] = useAtom(themeAtom);
  const darkMode = useAtomValue(themeDarkModeAtom);

  function renderFrame() {
    switch (theme.id) {
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
