import { Fira_Code, IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import cn from "classnames";
import { Navigation } from "@/components/navigation";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-jetbrainsmono",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-ibmplexmono",
});
const firaCode = Fira_Code({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-firacode" });

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("h-full", jetBrainsMono.variable, ibmPlexMono.variable, firaCode.variable)}>
      <Navigation />
      <main className="flex flex-col min-h-full pt-[50px]">{children}</main>
    </div>
  );
}
