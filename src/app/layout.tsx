import { Log } from "./log";
import "@/app/styles/globals.css";
import { Viewport } from "next";
import { BASE_URL } from "@/utils/common";
import { Toaster } from "@/components/toast";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/tooltip";
import { ThemeProvider } from "@/components/theme-switch/theme-provider";

const title = "Ray.so";
const description = "Ray.so";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: title,
  description: description,
  openGraph: {
    type: "website",
    siteName: "Ray.so",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raycast",
  },
};

export const viewport: Viewport = {
  themeColor: "#181818",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics />
      </head>
      <body className="relative">
        <ThemeProvider>
          <TooltipProvider>
            <Log />
            <div className="isolate relative flex flex-col">{children}</div>
            <Toaster position="top-center" offset={70} duration={2000} />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
