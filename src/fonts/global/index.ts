// import localFont from "next/font/local";
// import {
//   Kablammo,
//   Nothing_You_Could_Do,
//   Delius,
//   Cabin_Sketch,
//   Fira_Code,
//   Geist_Mono,
//   Google_Sans_Code,
//   IBM_Plex_Mono,
//   JetBrains_Mono,
//   Roboto_Mono,
//   Source_Code_Pro,
//   Space_Mono,
// } from "next/font/google";
// import { cn } from "@/utils/cn";

// const fontMono = localFont({
//   display: "swap",
//   src: "./PaperMono-Regular.woff2",
//   variable: "--font-mono",
// });

// const fontSans = localFont({
//   display: "swap",
//   src: "./CalSansUI[MODE,wght].woff2",
//   variable: "--font-sans",
// });

// const fontHeading = localFont({
//   display: "swap",
//   src: "./CalSans-SemiBold.woff2",
//   variable: "--font-heading",
//   weight: "600",
// });

// const kablammo = Kablammo({
//   subsets: ["latin"],
//   weight: "variable",
//   variable: "--kablammo",
// });
// const nothingYouCouldDo = Nothing_You_Could_Do({
//   weight: ["400"],
//   subsets: ["latin"],
//   variable: "--nothing-you-could-do",
// });
// const delius = Delius({
//   weight: ["400"],
//   subsets: ["latin"],
//   variable: "--delius",
// });

// const cabinSketch = Cabin_Sketch({
//   weight: ["400", "700"],
//   subsets: ["latin"],
//   variable: "--cabin-sketch",
// });

// /**
//  * Other Fonts
//  */

// const jetBrainsMono = JetBrains_Mono({
//   subsets: ["latin"],
//   weight: "500",
//   display: "swap",
//   variable: "--font-jetbrainsmono",
// });
// const ibmPlexMono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   weight: "500",
//   display: "swap",
//   variable: "--font-ibmplexmono",
// });
// const firaCode = Fira_Code({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-firacode" });

// const soehneMono = localFont({
//   src: "./soehne-mono-buch.woff2",
//   variable: "--font-soehne-mono",
// });
// const commitMono = localFont({
//   src: "./commit-mono-regular.woff2",
//   variable: "--font-commitmono",
// });
// const robotoMono = Roboto_Mono({
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
//   variable: "--font-roboto-mono",
// });

// const spaceMono = Space_Mono({
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
//   variable: "--font-space-mono",
// });

// const sourceCodePro = Source_Code_Pro({
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
//   variable: "--font-source-code-pro",
// });

// const googleSansCode = Google_Sans_Code({
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
//   variable: "--font-google-sans-code",
// });

// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   weight: "400",
//   display: "swap",
//   variable: "--font-geist-mono",
// });

// export default cn(
//   kablammo.variable,
//   nothingYouCouldDo.variable,
//   delius.variable,
//   cabinSketch.variable,
//   fontSans.variable,
//   fontMono.variable,
//   fontHeading.variable,
//   /**
//    * Other Fonts
//    */
//   jetBrainsMono.variable,
//   ibmPlexMono.variable,
//   firaCode.variable,
//   soehneMono.variable,
//   commitMono.variable,
//   robotoMono.variable,
//   spaceMono.variable,
//   sourceCodePro.variable,
//   googleSansCode.variable,
//   geistMono.variable,
// );
import localFont from "next/font/local";
import { Kablammo, Nothing_You_Could_Do, Delius, Cabin_Sketch } from "next/font/google";
import { cn } from "@/utils/cn";

/* ------------------------------- */
/* App Fonts (unchanged)           */
/* ------------------------------- */

const fontMono = localFont({
  display: "swap",
  src: "./PaperMono-Regular.woff2",
  variable: "--font-mono",
});

const fontSans = localFont({
  display: "swap",
  src: "./CalSansUI[MODE,wght].woff2",
  variable: "--font-sans",
});

const fontHeading = localFont({
  display: "swap",
  src: "./CalSans-SemiBold.woff2",
  variable: "--font-heading",
  weight: "600",
});

const kablammo = Kablammo({ subsets: ["latin"], weight: "variable", variable: "--kablammo" });
const nothingYouCouldDo = Nothing_You_Could_Do({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--nothing-you-could-do",
});
const delius = Delius({ weight: ["400"], subsets: ["latin"], variable: "--delius" });
const cabinSketch = Cabin_Sketch({ weight: ["400", "700"], subsets: ["latin"], variable: "--cabin-sketch" });

export default cn(
  kablammo.variable,
  nothingYouCouldDo.variable,
  delius.variable,
  cabinSketch.variable,
  fontSans.variable,
  fontMono.variable,
  fontHeading.variable,
);
