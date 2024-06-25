import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        panel: "hsl(var(--panel) / <alpha-value>)",
        brand: "hsl(var(--brand) / <alpha-value>)",
        purple: "hsl(var(--purple) / <alpha-value>)",
        blue: "hsl(var(--blue) / <alpha-value>)",
        gray: {
          1: "hsl(var(--gray-1) / <alpha-value>)",
          2: "hsl(var(--gray-2) / <alpha-value>)",
          3: "hsl(var(--gray-3) / <alpha-value>)",
          4: "hsl(var(--gray-4) / <alpha-value>)",
          5: "hsl(var(--gray-5) / <alpha-value>)",
          6: "hsl(var(--gray-6) / <alpha-value>)",
          7: "hsl(var(--gray-7) / <alpha-value>)",
          8: "hsl(var(--gray-8) / <alpha-value>)",
          9: "hsl(var(--gray-9) / <alpha-value>)",
          10: "hsl(var(--gray-10) / <alpha-value>)",
          11: "hsl(var(--gray-11) / <alpha-value>)",
          12: "hsl(var(--gray-12) / <alpha-value>)",
        },
      },
      screens: {
        tall: { raw: "(min-height: 840px)" },
        tallx2: { raw: "(min-height: 1000px)" },
        desktop: { raw: "(min-height: 840px) and (min-width: 960px)" },
      },
      spacing: {
        "scrollbar-offset": "calc(16px + var(--removed-body-scroll-bar-size, 0px))",
      },
      borderRadius: {
        inherit: "inherit",
      },
      fontSize: {
        xxs: "11px",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        slideDownAndFade: "slideDownAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade: "slideLeftAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 250ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
