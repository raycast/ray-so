import { cn } from "@/utils/cn";
import localFont from "next/font/local";
import { Geist_Mono, Google_Sans_Code, Space_Mono, DM_Mono } from "next/font/google";

/***
 * Need to remove the fonts
 */

/* ------------------------------- */
/* Missing Fonts (ADDED)           */
/* ------------------------------- */

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-geist-mono",
});

export const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-google-sans-code",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-space-mono",
});

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dm-mono",
});

// export const soehneMono = localFont({
//   src: "./soehne-mono-buch.woff2",
//   variable: "--font-soehne-mono",
//   display: "swap",
// });

// export const commitMono = localFont({
//   src: "./commit-mono-regular.woff2",
//   variable: "--font-commitmono",
//   display: "swap",
// });

/* ------------------------------- */
/* Fonts (MUST be top-level const) */
/* ------------------------------- */

export const almamono = localFont({
  src: "./almamono/almamono.woff2",
  variable: "--font-almamono",
  display: "swap",
});

export const amitLight = localFont({
  src: "./ligaturized/amit-light.otf",
  variable: "--font-amit-light",
  display: "swap",
});

export const anomaly = localFont({
  src: "./anomaly/anomaly.otf",
  variable: "--font-anomaly",
  display: "swap",
});

export const anymous = localFont({
  src: "./ligaturized/anymous.ttf",
  variable: "--font-anymous",
  display: "swap",
});

export const cascadiaCode = localFont({
  src: "./cascadia-code/cascadia-code.woff2",
  variable: "--font-cascadia-code",
  display: "swap",
});

export const comicMono = localFont({
  src: "./comic-mono/comic-mono.ttf",
  variable: "--font-comic-mono",
  display: "swap",
});

export const droidSansMono = localFont({
  src: "./ligaturized/droid-sans-mono.ttf",
  variable: "--font-droid-sans-mono",
  display: "swap",
});

export const fantasqueSansMono = localFont({
  src: "./ligaturized/fantasque-sans-mono.ttf",
  variable: "--font-fantasque-sans-mono",
  display: "swap",
});

export const firaCode = localFont({
  src: "./fira-code/fira-code-regular.woff2",
  variable: "--font-fira-code-regular",
  display: "swap",
});

export const hachiMaruPop = localFont({
  src: "./hachi-maru-pop/hachi-maru-pop.woff",
  variable: "--font-hachi-maru-pop",
  display: "swap",
});

export const hack = localFont({
  src: "./ligaturized/hack.ttf",
  variable: "--font-hack",
  display: "swap",
});

export const haskligItalic = localFont({
  src: "./hasklig/hasklig-it.ttf",
  variable: "--font-hasklig-it",
  display: "swap",
});

export const haskligRegular = localFont({
  src: "./hasklig/hasklig-regular.ttf",
  variable: "--font-hasklig-regular",
  display: "swap",
});

export const ibmPlexMono = localFont({
  src: "./i-b-m-plex-mono/i-b-m-plex-mono.ttf",
  variable: "--font-i-b-m-plex-mono",
  display: "swap",
});

export const inconsolata = localFont({
  src: "./inconsolata/inconsolata.ttf",
  variable: "--font-inconsolata",
  display: "swap",
});

export const inputMono = localFont({
  src: "./input-mono/input-mono.woff2",
  variable: "--font-input-mono",
  display: "swap",
});

export const iosevka = localFont({
  src: "./iosevka/iosevka-regular.woff2",
  variable: "--font-iosevka-regular",
  display: "swap",
});

export const jetBrainsMono = localFont({
  src: "./jet-brains-mono/jet-brains-mono.ttf",
  variable: "--font-jet-brains-mono",
  display: "swap",
});

export const lexMono = localFont({
  src: "./ligaturized/lex-mono.ttf",
  variable: "--font-lex-mono",
  display: "swap",
});

export const lexMonoItalic = localFont({
  src: "./ligaturized/lex-mono-italic.ttf",
  variable: "--font-lex-mono-italic",
  display: "swap",
});

export const ligaSrcPro = localFont({
  src: "./ligaturized/liga-src-pro-regular.ttf",
  variable: "--font-liga-src-pro-regular",
  display: "swap",
});

export const majorMonoDisplay = localFont({
  src: "./major-mono/major-mono-display.ttf",
  variable: "--font-major-mono-display",
  display: "swap",
});

export const monoLisa = localFont({
  src: "./monolisa/mono-lisa.woff2",
  variable: "--font-mono-lisa",
  display: "swap",
});

export const monoidItalic = localFont({
  src: "./monoid/monoid-italic.ttf",
  variable: "--font-monoid-italic",
  display: "swap",
});

export const monoidRegular = localFont({
  src: "./monoid/monoid-regular.ttf",
  variable: "--font-monoid-regular",
  display: "swap",
});

export const monoidRetina = localFont({
  src: "./monoid/monoid-retina.ttf",
  variable: "--font-monoid-retina",
  display: "swap",
});

export const operatorMono = localFont({
  src: "./operator-mono/operator-mono.otf",
  variable: "--font-operator-mono",
  display: "swap",
});

export const operatorMonoItalic = localFont({
  src: "./operator-mono/operator-mono-italic.otf",
  variable: "--font-operator-mono-italic",
  display: "swap",
});

export const robotoMono = localFont({
  src: "./roboto-mono/roboto-mono.ttf",
  variable: "--font-roboto-mono",
  display: "swap",
});

export const robotoMonoX = localFont({
  src: "./ligaturized/roboto-mono-x.ttf",
  variable: "--font-roboto-mono-x",
  display: "swap",
});

export const sfMono = localFont({
  src: "./s-f-mono/s-f-mono.otf",
  variable: "--font-s-f-mono",
  display: "swap",
});

export const sfMonoLigaturized = localFont({
  src: "./s-f-mono/s-f-mono-ligaturized.ttf",
  variable: "--font-s-f-mono-ligaturized",
  display: "swap",
});

export const sourceCodePro = localFont({
  src: "./source-code-pro/source-code-pro.ttf",
  variable: "--font-source-code-pro",
  display: "swap",
});

export const sourceProItalic = localFont({
  src: "./ligaturized/source-pro-italic.ttf",
  variable: "--font-source-pro-italic",
  display: "swap",
});

export const spaceMonoX = localFont({
  src: "./ligaturized/space-mono-x.ttf",
  variable: "--font-space-mono-x",
  display: "swap",
});

export const sweet = localFont({
  src: "./sweet16/sweet.ttf",
  variable: "--font-sweet",
  display: "swap",
});

export const syneMono = localFont({
  src: "./syne-mono/syne-mono.ttf",
  variable: "--font-syne-mono",
  display: "swap",
});

export const ubuntuMono = localFont({
  src: "./ubuntu-mono/ubuntu-mono.ttf",
  variable: "--font-ubuntu-mono",
  display: "swap",
});

export const ubuntuMonoX = localFont({
  src: "./ligaturized/ubuntu-mono-x.ttf",
  variable: "--font-ubuntu-mono-x",
  display: "swap",
});

export const victorMonoItalic = localFont({
  src: "./victor-mono-all/victor-mono-italic.woff2",
  variable: "--font-victor-mono-italic",
  display: "swap",
});

export const victorMonoRegular = localFont({
  src: "./victor-mono-all/victor-mono-regular.woff2",
  variable: "--font-victor-mono-regular",
  display: "swap",
});

export const xanhMonoItalic = localFont({
  src: "./xanh-mono/xanh-mono-italic.ttf",
  variable: "--font-xanh-mono-italic",
  display: "swap",
});

export const xanhMonoRegular = localFont({
  src: "./xanh-mono/xanh-mono-regular.ttf",
  variable: "--font-xanh-mono-regular",
  display: "swap",
});

/* ------------------------------- */
/* Combined Variables              */
/* ------------------------------- */

export const fontVariables = cn(
  almamono.variable,
  amitLight.variable,
  anomaly.variable,
  anymous.variable,
  cascadiaCode.variable,
  comicMono.variable,
  droidSansMono.variable,
  fantasqueSansMono.variable,
  firaCode.variable,
  hachiMaruPop.variable,
  hack.variable,
  haskligItalic.variable,
  haskligRegular.variable,
  ibmPlexMono.variable,
  inconsolata.variable,
  inputMono.variable,
  iosevka.variable,
  jetBrainsMono.variable,
  lexMono.variable,
  lexMonoItalic.variable,
  ligaSrcPro.variable,
  majorMonoDisplay.variable,
  monoLisa.variable,
  monoidItalic.variable,
  monoidRegular.variable,
  monoidRetina.variable,
  operatorMono.variable,
  operatorMonoItalic.variable,
  robotoMono.variable,
  robotoMonoX.variable,
  sfMono.variable,
  sfMonoLigaturized.variable,
  sourceCodePro.variable,
  sourceProItalic.variable,
  spaceMonoX.variable,
  sweet.variable,
  syneMono.variable,
  ubuntuMono.variable,
  ubuntuMonoX.variable,
  victorMonoItalic.variable,
  victorMonoRegular.variable,
  xanhMonoItalic.variable,
  xanhMonoRegular.variable,
  geistMono.variable,
  googleSansCode.variable,
  spaceMono.variable,
  dmMono.variable,
);

export default fontVariables;
