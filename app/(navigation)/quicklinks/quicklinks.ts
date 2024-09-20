import { IconName, Icons } from "@raycast/icons";
import { SVGProps } from "react";

export type Quicklink = {
  id: string;
  name: string;
  // Optional description of the quicklink if name is not descriptive enough
  description?: string;
  link: string;
  // Optional app to open the link with - defaults to the default app for the link
  openWith?: string;
  // Override the default icon fetched from the link itself
  icon?: {
    // 1. Icon name from Raycast Icons
    name?: IconName;
    // 2. URL to fetch favicon from
    link?: string;
    // Use to display dark favicons in the explorer
    invert?: boolean;
  };
  author?: {
    name: string;
    link?: string;
  };

  // Only used to keep track of UI state
  isEdited?: boolean;
};

const folders: Quicklink[] = [
  {
    id: "downloads",
    name: "Open Downloads",
    description: "Opens the Downloads folder in Finder",
    link: "~/Downloads",
    icon: {
      name: "download",
    },
  },
  {
    id: "documents",
    name: "Open Documents",
    description: "Opens the Documents folder in Finder",
    link: "~/Documents",
    icon: {
      name: "blank-document",
    },
  },
  {
    id: "desktop",
    name: "Open Desktop",
    description: "Opens the Desktop folder in Finder",
    link: "~/Desktop",
    icon: {
      name: "desktop",
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
    link: `raycast://extensions/raycast/file-search/search-files?fallbackText=~/Downloads/`,
    icon: {
      name: "download",
    },
  },
  {
    id: "documents-file-search",
    name: "Open Documents in File Search",
    description: "Opens the Documents folder in the File Search Command",
    link: `raycast://extensions/raycast/file-search/search-files?fallbackText=~/Documents/`,
    icon: {
      name: "blank-document",
    },
  },
  {
    id: "desktop-file-search",
    name: "Open Desktop in File Search",
    description: "Opens the Desktop folder in the File Search Command",
    link: `raycast://extensions/raycast/file-search/search-files?fallbackText=~/Desktop/`,
    icon: {
      name: "desktop",
    },
  },
  {
    id: "root-file-search",
    name: "Open Root in File Search",
    description: "Opens the Root folder in the File Search Command",
    link: `raycast://extensions/raycast/file-search/search-files?fallbackText=~/`,
    icon: {
      name: "folder",
    },
  },
];

const development: Quicklink[] = [
  {
    id: "raycastapi",
    name: "Search Raycast API Docs",
    link: "https://developers.raycast.com/?q={Query}",
    icon: {
      name: "raycast-logo-neg",
    },
  },
  {
    id: "github",
    name: "Search GitHub",
    link: "https://github.com/search?q={Query}&type=repositories",
  },
  {
    id: "sentry",
    name: "Search Sentry Issues",
    link: "https://sentry.io/issues/?query={Query}&referrer=issue-list&statsPeriod=14d",
  },
  {
    id: "npm",
    name: "Search NPM",
    link: "https://www.npmjs.com/search?q={Query}",
  },
  {
    id: "dub",
    name: "Search Dub Shortlinks",
    link: "https://app.dub.co/?search={Query}",
  },
  {
    id: "resend",
    name: "Search Resend sent emails",
    link: "https://resend.com/emails?page=1&search={Query}",
  },
  {
    id: "mdn",
    name: "Search MDN Docs",
    link: "https://developer.mozilla.org/en-US/search?q={Query}",
  },
  {
    id: "apple",
    name: "Search Apple Dev Docs",
    link: "https://developer.apple.com/search/?q={Query}&type=Documentation",
    icon: {
      name: "brand-apple",
    },
  },
  {
    id: "radix",
    name: "Radix Primitives Docs",
    link: "https://radix-ui.com/primitives/docs",
    icon: {
      invert: true,
    },
  },
  {
    id: "nextjs",
    name: "Next.js Docs",
    link: "https://nextjs.org/docs",
    icon: {
      name: "brand-nextjs",
    },
  },
  {
    id: "react",
    name: "React Docs",
    link: "https://react.dev/",
    icon: {
      name: "brand-react",
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS Docs",
    link: "https://tailwindcss.com/docs",
  },
  {
    id: "shadcn/ui",
    name: "Shadcn UI Docs",
    link: "https://ui.shadcn.com/docs",
  },
  {
    id: "swr",
    name: "SWR Docs",
    link: "https://swr.vercel.app/",
    icon: {
      invert: true,
    },
  },
  {
    id: "tanstack-query",
    name: "Tanstack Query Docs",
    link: "https://tanstack.com/query/docs",
  },
  {
    id: "remix",
    name: "Remix Docs",
    link: "https://remix.run/docs/en/main",
  },
  {
    id: "typescript",
    name: "TypeScript Docs",
    link: "https://www.typescriptlang.org/docs/",
    icon: {
      name: "brand-typescript",
    },
  },
  {
    id: "vite",
    name: "Vite Docs",
    link: "https://vitejs.dev/guide/",
  },
  {
    id: "prisma",
    name: "Prisma Docs",
    link: "https://www.prisma.io/docs/orm",
  },
  {
    id: "vercel",
    name: "Vercel Docs",
    link: "https://vercel.com/docs",
  },
  {
    id: "supabase",
    name: "Supabase Docs",
    link: "https://supabase.io/docs",
  },
  {
    id: "stackoverflow",
    name: "Search Stack Overflow",
    link: "https://stackoverflow.com/search?q={Query}",
  },
];

const design: Quicklink[] = [
  {
    id: "mobbin",
    name: "Search Mobbin",
    link: 'https://mobbin.com/search/{argument name="Device" options=" ios , android , web " default=" ios "}/screens?filter=aiDescriptionSearch.{argument name="Query"}',
    icon: {
      invert: true,
    },
  },
  {
    id: "Unsplash",
    name: "Search Unsplash",
    link: "https://unsplash.com/s/photos/{Query}",
    icon: {
      invert: true,
    },
  },
  {
    id: "layers",
    name: "Search Layers.to",
    link: "https://layers.to/search?keyword={Query}",
    icon: {
      invert: true,
    },
  },
  {
    id: "dribbble",
    name: "Search Dribbble",
    link: "https://dribbble.com/search/{Query}",
  },
  {
    id: "google-fonts",
    name: "Search Google Fonts",
    link: "https://fonts.google.com/?query={query}",
  },
  {
    id: "thenounproject",
    name: "Search The Noun Project",
    link: "https://thenounproject.com/search/?q={query}",
  },
  {
    id: "icones",
    name: "Search Icones",
    link: "https://icones.js.org/collection/all?s={Query}",
  },
];

const communication: Quicklink[] = [
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
    link: "mailto:{argument name='email@example.com' | raw}?subject={subject}&body={body}",
    icon: {
      name: "envelope",
    },
  },
  {
    id: "gmail",
    name: "Search Gmail",
    link: "https://mail.google.com/mail/#search/{query}",
  },
  {
    id: "google-calendar",
    name: "Search Google Calendar",
    link: "https://calendar.google.com/calendar/r/search?q={query}",
  },
];

const search: Quicklink[] = [
  {
    id: "apple-maps",
    name: "Search Apple Maps",
    link: "https://maps.apple.com/?q={query}",
    openWith: "Maps",
    icon: {
      name: "brand-apple",
    },
  },
  {
    id: "google-maps",
    name: "Search Google Maps",
    link: "https://www.google.com/maps/search/{Place}",
  },
  {
    id: "appstore",
    name: "Search App Store",
    link: "itms-apps://itunes.apple.com/search?term={App}",
    icon: {
      name: "brand-apple",
    },
  },
  {
    id: "google-images",
    name: "Search Google Images",
    link: "https://google.com/search?q={Query}&tbm=isch",
  },
  {
    id: "wikipedia",
    name: "Search Wikipedia",
    link: "https://en.wikipedia.org/w/index.php?search={Query}",
  },
  {
    id: "hackernews",
    name: "Search Hacker News",
    link: "https://hn.algolia.com/?q={Query}",
  },
  {
    id: "duckduckgo",
    name: "Search DuckDuckGo",
    link: "https://duckduckgo.com/?q={Query}",
  },
  {
    id: "chrome-web-store",
    name: "Search Chrome Web Store",
    link: "https://chrome.google.com/webstore/search/{query}?hl=en-US",
  },
  {
    id: "google-drive",
    name: "Search Google Drive",
    link: "https://drive.google.com/drive/search?q={query}",
  },
  {
    id: "google-trends",
    name: "Search Google Trends",
    link: "https://trends.google.com/trends/explore?q={query}",
  },
  {
    id: "wayback-machine",
    name: "Search Wayback Machine",
    link: "https://web.archive.org/web/*/{query}",
  },
  {
    id: "robinhood",
    name: "Search Robinhood Ticker",
    link: "https://robinhood.com/stocks/{query}",
  },
  {
    id: "perplexity",
    name: "Search Perplexity",
    link: "https://perplexity.ai/search?q={query}",
  },
];

const shopping: Quicklink[] = [
  {
    id: "amazon",
    name: "Search Amazon",
    link: "https://www.amazon.com/s?k={Query}",
  },
  {
    id: "ebay",
    name: "Search eBay",
    link: "https://www.ebay.com/sch/i.html?_nkw={Query}",
  },
  {
    id: "etsy",
    name: "Search Etsy",
    link: "https://www.etsy.com/search?q={Query}",
  },
  {
    id: "aliexpress",
    name: "Search AliExpress",
    link: "https://www.aliexpress.com/wholesale?SearchText={Query}",
  },
];

const entertainment: Quicklink[] = [
  {
    id: "spotify-player",
    name: "Search Spotify Extension",
    link: `raycast://extensions/mattisssa/spotify-player/search?context=%7B%22query%22%3A%22{Query}%22%7D`,
    icon: {
      link: "https://www.spotify.com",
    },
    author: {
      name: "Pedro Duarte",
      link: "https://x.com/peduarte",
    },
  },
  {
    id: "spotify",
    name: "Search Spotify",
    link: "https://open.spotify.com/search/{query}",
    openWith: "Spotify",
  },
  {
    id: "apple-music",
    name: "Search Apple Music",
    link: "https://music.apple.com/us/search?l=en&term={Query}",
    openWith: "Music",
  },
  {
    id: "youtube",
    name: "Search YouTube",
    link: "https://www.youtube.com/results?search_query={Query}",
  },
  {
    id: "imdb",
    name: "Search IMDb",
    link: "https://www.imdb.com/find?s=all&q={query}",
  },
  {
    id: "netflix",
    name: "Search Netflix",
    link: "https://www.netflix.com/search?q={query}",
  },
  {
    id: "letterboxd",
    name: "Search Letterboxd",
    link: "https://letterboxd.com/search/{query}/",
  },
];

const socials: Quicklink[] = [
  {
    id: "tweets",
    name: "Search Tweets",
    description: "Search from a list of users",
    link: 'https://x.com/search?q={argument name="query" | raw} from:{argument name="handle" options=" @samuelkraft ,  @raycastapp , @peduarte , @thomaspaulmann " default=" @samuelkraft " | raw}&src=typed_query&f=live',
  },
  {
    id: "linkedin",
    name: "Search LinkedIn",
    link: "https://www.linkedin.com/search/results/all/?keywords={Query}",
  },
  {
    id: "pinterest",
    name: "Search Pinterest",
    link: "https://pinterest.com/search/pins/?q={Query}&rs=typed",
  },
  {
    id: "threads-user",
    name: "Go to a threads user",
    link: "https://threads.net/@{query}",
  },
  {
    id: "threads-post",
    name: "Post to Threads",
    link: "https://www.threads.net/intent/post?text={query}",
  },
  {
    id: "threads",
    name: "Search Threads",
    link: "https://www.threads.net/search/?q={Query}&serp_type=default",
  },
  {
    id: "tiktok",
    name: "Search TikTok",
    link: "https://www.tiktok.com/search?q={Query}",
  },
  {
    id: "twitch",
    name: "Search Twitch",
    link: "https://www.twitch.tv/search?term={query}",
  },
  {
    id: "reddit",
    name: "Search Reddit",
    link: "https://www.reddit.com/search/?q={query}",
  },
  {
    id: "giphy",
    name: "Search Giphy",
    link: "https://giphy.com/{Query}",
  },
];

const misc: Quicklink[] = [
  {
    id: "chrome-history",
    name: "View Google Chrome History",
    link: "chrome://history/search/",
    openWith: "Google Chrome",
    icon: {
      link: "https://chrome.google.com",
    },
  },
  {
    id: "selection-translate",
    name: "Translate selected text",
    description: "Grabs the current selection and translates it with Raycast Translator",
    link: `raycast://extensions/raycast/translator/translate?fallbackText={selection | raw}`,
    icon: {
      name: "magnifying-glass",
    },
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
    name: "File System",
    slug: "/file-system",
    quicklinks: [...folders],
    icon: "finder" as IconName,
  },
  {
    name: "Development",
    slug: "/development",
    quicklinks: [...development],
    icon: "code" as IconName,
  },
  {
    name: "Design",
    slug: "/design",
    quicklinks: [...design],
    icon: "brush" as IconName,
  },
  {
    name: "Shopping",
    slug: "/shopping",
    quicklinks: [...shopping],
    icon: "cart" as IconName,
  },
  {
    name: "Socials",
    slug: "/socials",
    quicklinks: [...socials],
    icon: "speech-bubble" as IconName,
  },
  {
    name: "Communication",
    slug: "/communication",
    quicklinks: [...communication],
    icon: "phone" as IconName,
  },
  {
    name: "Entertainment",
    slug: "/entertainment",
    quicklinks: [...entertainment],
    icon: "music" as IconName,
  },
  {
    name: "Search",
    slug: "/search",
    quicklinks: [...search],
    icon: "magnifying-glass" as IconName,
  },
  {
    name: "Misc",
    slug: "/misc",
    quicklinks: [...misc],
    icon: "folder" as IconName,
  },
].map((category) => {
  return {
    ...category,
    iconComponent: Icons[category.icon],
    quicklinks: category.quicklinks,
  };
});
