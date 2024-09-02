import { IconName, Icons } from "@raycast/icons";
import { SVGProps } from "react";
import { raycastProtocol } from "./utils/actions";

export type Quicklink = {
  id: string;
  name: string;
  description?: string;
  link: string;
  // Optional - defaults to "Default" app
  openWith?: string;
  // Override the default icon - defaults to favicon from the link itself
  icon?: {
    // 1. Icon name from Raycast Icons
    name?: IconName;
    // 2. URL to fetch favicon from
    link?: string;
    // Use for dark favicons
    invert?: boolean;
  };
  author?: {
    name: string;
    link?: string;
  };
};

const folders: Quicklink[] = [
  {
    id: "downloads",
    name: "Open Downloads",
    description: "Opens the Downloads folder in Finder",
    link: "~/Downloads",
    icon: {
      name: "folder",
    },
  },
  {
    id: "documents",
    name: "Open Documents",
    description: "Opens the Documents folder in Finder",
    link: "~/Documents",
    icon: {
      name: "folder",
    },
  },
  {
    id: "desktop",
    name: "Open Desktop",
    description: "Opens the Desktop folder in Finder",
    link: "~/Desktop",
    icon: {
      name: "folder",
    },
  },
  {
    id: "root",
    name: "Open Root",
    description: "Opens the Root folder of your drive in Finder",
    link: "~/",
    icon: {
      name: "folder",
    },
  },
  {
    id: "downloads-file-search",
    name: "Open Downloads in File Search",
    description: "Opens the Downloads folder in the File Search Command",
    link: `${raycastProtocol}://extensions/raycast/file-search/search-files?fallbackText=~/Downloads/`,
    icon: {
      name: "folder",
    },
  },
  {
    id: "documents-file-search",
    name: "Open Documents in File Search",
    description: "Opens the Documents folder in the File Search Command",
    link: `${raycastProtocol}://extensions/raycast/file-search/search-files?fallbackText=~/Documents/`,
    icon: {
      name: "folder",
    },
  },
  {
    id: "desktop-file-search",
    name: "Open Desktop in File Search",
    description: "Opens the Desktop folder in the File Search Command",
    link: `${raycastProtocol}://extensions/raycast/file-search/search-files?fallbackText=~/Desktop/`,
    icon: {
      name: "folder",
    },
  },
  {
    id: "root-file-search",
    name: "Open Root in File Search",
    description: "Opens the Root folder in the File Search Command",
    link: `${raycastProtocol}://extensions/raycast/file-search/search-files?fallbackText=~/`,
    icon: {
      name: "folder",
    },
  },
];

const documentation: Quicklink[] = [
  {
    id: "raycastapi",
    name: "Search Raycast API Docs",
    description: "Search Raycast Extensions API Documentation",
    link: "https://developers.raycast.com/?q={Query}",
    icon: {
      name: "raycast-logo-neg",
    },
  },
  {
    id: "mdn",
    name: "Search MDN Docs",
    description: "Search the MDN Web Documentation",
    link: "https://developer.mozilla.org/en-US/search?q={Query}",
  },
  {
    id: "apple",
    name: "Search Apple Developer Docs",
    description: "Search the Apple Developer Documentation",
    link: "https://developer.apple.com/search/?q={Query}&type=Documentation",
    icon: {
      name: "brand-apple",
    },
  },
  {
    id: "radix",
    name: "Radix Primitives Docs",
    description: "Browse the Radix Primitives Documentation",
    link: "https://radix-ui.com/primitives/docs",
    icon: {
      invert: true,
    },
  },
  {
    id: "nextjs",
    name: "Next.js Docs",
    description: "Browse the Next.js Documentation",
    link: "https://nextjs.org/docs",
    icon: {
      name: "brand-nextjs",
    },
  },
  {
    id: "react",
    name: "React Docs",
    description: "Browse the React Documentation",
    link: "https://react.dev/",
    icon: {
      name: "brand-react",
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS Docs",
    description: "Browse the Tailwind CSS Documentation",
    link: "https://tailwindcss.com/docs",
  },
  {
    id: "shadcn/ui",
    name: "Shadcn UI Docs",
    description: "Browse the Shadcn UI Documentation",
    link: "https://ui.shadcn.com/docs",
  },
  {
    id: "swr",
    name: "SWR Docs",
    description: "Browse the SWR Documentation",
    link: "https://swr.vercel.app/",
    icon: {
      invert: true,
    },
  },
  {
    id: "tanstack-query",
    name: "Tanstack Query Docs",
    description: "Browse the Tanstack Query Documentation",
    link: "https://tanstack.com/query/docs",
  },
  {
    id: "remix",
    name: "Remix Docs",
    description: "Browse the Remix Documentation",
    link: "https://remix.run/docs/en/main",
  },
  {
    id: "typescript",
    name: "TypeScript Docs",
    description: "Browse the TypeScript Documentation",
    link: "https://www.typescriptlang.org/docs/",
    icon: {
      name: "brand-typescript",
    },
  },
  {
    id: "vite",
    name: "Vite Docs",
    description: "Browse the Vite Documentation",
    link: "https://vitejs.dev/guide/",
  },
  {
    id: "prisma",
    name: "Prisma Docs",
    description: "Browse the Prisma Documentation",
    link: "https://www.prisma.io/docs/orm",
  },
  {
    id: "vercel",
    name: "Vercel Docs",
    description: "Browse the Vercel Documentation",
    link: "https://vercel.com/docs",
  },
  {
    id: "supabase",
    name: "Supabase Docs",
    description: "Browse the Supabase Documentation",
    link: "https://supabase.io/docs",
  },
];

const extensions: Quicklink[] = [
  {
    id: "selection-spotify",
    name: "Selection -> Spotify",
    description: "Grabs the current selection and searches Spotify Player",
    link: `${raycastProtocol}://tonka3000/spotify/{selection}`,
    icon: {
      link: "https://www.spotify.com",
    },
  },
  {
    id: "selection-email",
    name: "Selection -> Email",
    description: "Grabs the current selection and sends an Email via Dash Off",
    link: `${raycastProtocol}://peduarte/dashoff?{selection}`,
    icon: {
      name: "envelope",
    },
  },
  {
    id: "encycolorpedia-picker",
    name: "Encycolorpedia Picker",
    description: "Uses Color Picker to search Encycolorpedia",
    link: `${raycastProtocol}://thomas/color-picker?{Query}`,
    icon: {
      name: "swatch",
    },
  },
  {
    id: "selection-translate",
    name: "Selection -> Translate",
    description: "Grabs the current selection and translates it with Raycast Translator",
    link: `${raycastProtocol}://extensions/raycast/translator/translate?fallbackText={selection | raw}`,
    icon: {
      name: "magnifying-glass",
    },
  },
];

const apps: Quicklink[] = [
  {
    id: "slack-channel",
    name: "Open Slack Channel",
    description: "Open a specific Slack channel",
    link: "slack://channel?team={team}&id={channel}",
    icon: {
      name: "brand-slack",
    },
  },
  {
    id: "facetime-mom",
    name: "Facetime Mom",
    description: "Call a specific number on FaceTime",
    link: "facetime://+1234567890",
    icon: {
      name: "phone",
    },
  },
  {
    id: "imessage-mom",
    name: "iMessage Mom",
    description: "Send a message to a specific number on iMessage",
    link: "imessage://+1234567890",
    icon: {
      name: "speech-bubble",
    },
  },
  {
    id: "send-email",
    name: "Send Email",
    description: "Draft an email in the default Email App",
    link: "mailto://{email}?subject={subject}&body={body}",
    icon: {
      name: "envelope",
    },
  },
];

const search: Quicklink[] = [
  {
    id: "apple-maps",
    name: "Search Apple Maps",
    description: "Find a location, store or directions in Apple Maps",
    link: "https://maps.apple.com/?q={query}",
    openWith: "Maps",
  },
  {
    id: "google-maps",
    name: "Search Google Maps",
    description: "Find a location, store or directions in Google Maps",
    link: "https://www.google.com/maps/search/{Place}",
  },
  {
    id: "apple-music",
    name: "Search Apple Music",
    description: "Search for a song, artist or album in Apple Music",
    link: "music://search?term={Query}",
    openWith: "Music",
    icon: {
      link: "htps://music.apple.com",
    },
  },
  {
    id: "mobbin",
    name: "Search Mobbin",
    description: "Search for designs on Mobbin",
    link: 'https://mobbin.com/search/{argument name="Device" options=" ios , android , web " default=" ios "}/screens?filter=aiDescriptionSearch.{argument name="Query"}',
    icon: {
      invert: true,
    },
  },
  {
    id: "youtube",
    name: "Search YouTube",
    description: "Search for a video on YouTube",
    link: "https://www.youtube.com/results?search_query={Query}",
  },
  {
    id: "tweets",
    name: "Search Tweets",
    description: "Search for tweets from a specific user",
    link: 'https://x.com/search?q={argument name="query" | raw} from:{argument name="handle" options=" @samuelkraft ,  @raycastapp , @peduarte , @thomaspaulmann " default=" @samuelkraft " | raw}&src=typed_query&f=live',
  },
  {
    id: "linkedin",
    name: "Search LinkedIn",
    description: "Search for a person or company on LinkedIn",
    link: "https://www.linkedin.com/search/results/all/?keywords={Query}",
  },
  {
    id: "github",
    name: "Search GitHub",
    description: "Search for a repository, user or issue on GitHub",
    link: "https://github.com/search?q={Query}&type=repositories",
  },
  {
    id: "appstore",
    name: "Search App Store",
    description: "Search for an app on the App Store",
    link: "itms-apps://itunes.apple.com/search?term={App}",
  },
  {
    id: "google-images",
    name: "Search Google Images",
    description: "Search for images on Google",
    link: "https://google.com/search?q={Query}&tbm=isch",
  },
  {
    id: "wikipedia",
    name: "Search Wikipedia",
    description: "Search for an article on Wikipedia",
    link: "https://en.wikipedia.org/w/index.php?search={Query}",
  },
  {
    id: "hackernews",
    name: "Search Hacker News",
    description: "Search for a story on Hacker News",
    link: "https://hn.algolia.com/?q={Query}",
  },
  {
    id: "Unsplash",
    name: "Search Unsplash",
    description: "Search for images on Unsplash",
    link: "https://unsplash.com/s/photos/{Query}",
    icon: {
      invert: true,
    },
  },
  {
    id: "stackoverflow",
    name: "Search Stack Overflow",
    description: "Search for a question on Stack Overflow",
    link: "https://stackoverflow.com/search?q={Query}",
  },
  {
    id: "dribbble",
    name: "Search Dribbble",
    description: "Search for designs on Dribbble",
    link: "https://dribbble.com/search/{Query}",
  },
  {
    id: "giphy",
    name: "Search Giphy",
    description: "Search for gifs on Giphy",
    link: "https://giphy.com/{Query}",
  },
  {
    id: "google-translate",
    name: "Search Google Translate",
    description: "Translate text with Google Translate",
    link: "https://translate.google.com/?sl={source language:auto}&tl={target language}&text={word}&op=translate",
  },
  {
    id: "duckduckgo",
    name: "Search DuckDuckGo",
    description: "Search the web with DuckDuckGo",
    link: "https://duckduckgo.com/?q={Query}",
  },
  {
    id: "threads-user",
    name: "Go to a threads user",
    description: "Find a user on threads",
    link: "https://threads.net/@{query}",
  },
  {
    id: "threads-post",
    name: "Post to Threads",
    description: "Post a message to Threads",
    link: "https://www.threads.net/intent/post?text={query}",
  },
  {
    id: "threads",
    name: "Search Threads",
    description: "Search for a message on Threads",
    link: "https://www.threads.net/search/?q={Query}&serp_type=default",
  },
  {
    id: "arc",
    name: "Search Arc",
    description: "Let Arc browse for you",
    link: "https://search.arc.net/?type=ask-arc&q={query}",
  },
  {
    id: "google-calendar",
    name: "Search Google Calendar",
    description: "Search for an event on Google Calendar",
    link: "https://calendar.google.com/calendar/r/search?q={query}",
  },
  {
    id: "chrome-web-store",
    name: "Search Chrome Web Store",
    description: "Search for an extension on the Chrome Web Store",
    link: "https://chrome.google.com/webstore/search/{query}?hl=en-US",
  },
  {
    id: "chrome-history",
    name: "View Google Chrome History",
    description: "View your Chrome History",
    link: "chrome://history/search/",
    openWith: "Google Chrome",
    icon: {
      link: "https://chrome.google.com",
    },
  },
  {
    id: "google-drive",
    name: "Search Google Drive",
    description: "Search for a file on Google Drive",
    link: "https://drive.google.com/drive/search?q={query}",
  },
  {
    id: "google-fonts",
    name: "Search Google Fonts",
    description: "Search for a font on Google Fonts",
    link: "https://fonts.google.com/?query={query}",
  },
  {
    id: "gmail",
    name: "Search Gmail",
    description: "Search for an email in Gmail",
    link: "https://mail.google.com/mail/#search/{query}",
  },
  {
    id: "thenounproject",
    name: "Search The Noun Project",
    description: "Search for icons on The Noun Project",
    link: "https://thenounproject.com/search/?q={query}",
  },
  {
    id: "imdb",
    name: "Search IMDb",
    description: "Search for a movie on IMDb",
    link: "https://www.imdb.com/find?s=all&q={query}",
  },
  {
    id: "netflix",
    name: "Search Netflix",
    description: "Search for a movie on Netflix",
    link: "https://www.netflix.com/search?q={query}",
    icon: {
      invert: true,
    },
  },
  {
    id: "letterboxd",
    name: "Search Letterboxd",
    description: "Search for a movie on Letterboxd",
    link: "https://letterboxd.com/search/{query}/",
  },
  {
    id: "spotify",
    name: "Search Spotify",
    description: "Search for a song on Spotify",
    link: "https://open.spotify.com/search/{query}",
    openWith: "Spotify",
  },
  {
    id: "twitch",
    name: "Search Twitch",
    description: "Search for a stream on Twitch",
    link: "https://www.twitch.tv/search?term={query}",
  },
  {
    id: "reddit",
    name: "Search Reddit",
    description: "Search on Reddit",
    link: "https://www.reddit.com/search/?q={query}",
  },
  {
    id: "google-trends",
    name: "Search Google Trends",
    description: "Search for a trend on Google Trends",
    link: "https://trends.google.com/trends/explore?q={query}",
  },
  {
    id: "wayback-machine",
    name: "Search Wayback Machine",
    description: "Search for a website on the Wayback Machine",
    link: "https://web.archive.org/web/*/{query}",
  },
  {
    id: "robinhood",
    name: "Search Robinhood ticker",
    description: "Search for a stock on Robinhood",
    link: "https://robinhood.com/stocks/{query}",
  },
  {
    id: "svgl",
    name: "Search SVGL",
    description: "Search for SVG icons on SVGL",
    link: "https://svgl.app/?search={query}",
  },
  {
    id: "npm",
    name: "Search NPM",
    description: "Search for a package on NPM",
    link: "https://www.npmjs.com/search?q={Query}",
  },
  {
    id: "dub",
    name: "Search Dub.co",
    description: "Search for shortinks on Dub",
    link: "https://app.dub.co/?search={Query}",
  },
  {
    id: "resend",
    name: "Search Resend",
    description: "Search for sent emails on Resend",
    link: "https://resend.com/emails?page=1&search={Query}",
  },
  {
    id: "layers",
    name: "Search Layers.to",
    description: "Search for posts on Layers",
    link: "https://layers.to/search?keyword={Query}",
    icon: {
      invert: true,
    },
  },
  {
    id: "tiktok",
    name: "Search TikTok",
    description: "Search for videos on TikTok",
    link: "https://www.tiktok.com/search?q={Query}",
  },
  {
    id: "sentry",
    name: "Search Sentry",
    description: "Search for issues on Sentry",
    link: "https://sentry.io/issues/?query={Query}&referrer=issue-list&statsPeriod=14d",
  },
  {
    id: "pinterest",
    name: "Search Pinterest",
    description: "Search for pins on Pinterest",
    link: "https://pinterest.com/search/pins/?q={Query}&rs=typed",
  },
  {
    id: "amazon",
    name: "Search Amazon",
    description: "Search for products on Amazon",
    link: "https://www.amazon.com/s?k={Query}",
  },
  {
    id: "ebay",
    name: "Search eBay",
    description: "Search for products on eBay",
    link: "https://www.ebay.com/sch/i.html?_nkw={Query}",
  },
  {
    id: "etsy",
    name: "Search Etsy",
    description: "Search for products on Etsy",
    link: "https://www.etsy.com/search?q={Query}",
  },
  {
    id: "aliexpress",
    name: "Search AliExpress",
    description: "Search for products on AliExpress",
    link: "https://www.aliexpress.com/wholesale?SearchText={Query}",
  },
];

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export type Category = {
  name: string;
  slug: string;
  quicklinks: Quicklink[];
  icon: IconName;
  iconComponent: IconComponent;
};

export const categories: Category[] = [
  {
    name: "Folders",
    slug: "/folders",
    quicklinks: [...folders],
    icon: "finder" as IconName,
  },
  {
    name: "Documentation",
    slug: "/documentation",
    quicklinks: [...documentation],
    icon: "code" as IconName,
  },
  {
    name: "Extensions",
    slug: "/extensions",
    quicklinks: [...extensions],
    icon: "store" as IconName,
  },
  {
    name: "Apps",
    slug: "/apps",
    quicklinks: [...apps],
    icon: "app-window" as IconName,
  },
  {
    name: "Search",
    slug: "/search",
    quicklinks: [...search],
    icon: "magnifying-glass" as IconName,
  },
].map((category) => {
  return {
    ...category,
    iconComponent: Icons[category.icon],
    quicklinks: category.quicklinks,
  };
});

const allQuicklinks = categories.flatMap((category) => category.quicklinks);
