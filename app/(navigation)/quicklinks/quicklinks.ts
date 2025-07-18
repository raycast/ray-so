import { IconName, Icons } from "@raycast/icons";
import { SVGProps, type JSX } from "react";

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
    id: "user",
    name: "Open Home",
    description: "Opens your Home folder Finder",
    link: "~/",
    icon: {
      name: "folder",
    },
  },
  {
    id: "root",
    name: "Open Root",
    description: "Opens the Root folder of your drive in Finder",
    link: "/",
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
    id: "home-file-search",
    name: "Open Home in File Search",
    description: "Opens your Home folder in the File Search Command",
    link: `raycast://extensions/raycast/file-search/search-files?fallbackText=~/`,
    icon: {
      name: "folder",
    },
  },
  {
    id: "root-file-search",
    name: "Open Root in File Search",
    description: "Opens the Root folder in the File Search Command",
    link: `raycast://extensions/raycast/file-search/search-files?fallbackText=/`,
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
    id: "githubcopilot",
    name: "Github Copilot",
    link: "https://github.com/copilot?prompt={Query}",
    description: "Quickly chat with Github Copilot",
    author: {
      name: "ViGeng",
      link: "https://www.raycast.com/ViGeng/via=ViGeng",
    },
  },
  {
    id: "huggingface",
    name: "Search Hugging Face",
    description: "Search for models, datasets, and more",
    link: "https://huggingface.co/search/full-text?q={Query}",
    author: {
      name: "ViGeng",
      link: "https://www.raycast.com/ViGeng/via=ViGeng",
    },
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
    id: "packagist",
    name: "Search Packagist",
    link: "https://packagist.org/?query={Query}",
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
    id: "can-i-use",
    name: "Can I Use",
    link: "https://caniuse.com/?search={Query}",
    author: {
      name: "Frankie",
      link: "https://github.com/toFrankie",
    },
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
  {
    id: "v0",
    name: "New v0 chat",
    link: "https://v0.dev?q={Query}",
  },
  {
    id: "aws",
    name: "Search AWS Docs",
    link: "https://docs.aws.amazon.com/search/doc-search.html?searchPath=documentation&searchQuery={Query}",
    author: {
      name: "Alan Williams",
      link: "https://github.com/alanwill",
    },
  },
  {
    id: "kotlin-docs",
    link: "https://kotlinlang.org/docs/home.html?q={argument}&s=full",
    name: "Kotlin Docs",
  },
  {
    id: "weixin-docs",
    name: "Search Weixin Docs",
    link: "https://developers.weixin.qq.com/doc/search.html?doc_type=miniprogram&query={Query}",
    author: {
      name: "Frankie",
      link: "https://github.com/toFrankie",
    },
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
  {
    id: "freepik",
    name: "Search Freepik",
    link: "https://www.freepik.com/search?ai=excluded&format=search&orientation=landscape&type=photo&license=free&query={Query}",
    author: {
      name: "Frankie",
      link: "https://github.com/toFrankie",
    },
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
    id: "google-scholar",
    name: "Search Google Scholar",
    link: "https://scholar.google.com/scholar?q={Query}",
    description: "Search for scientific articles in Google Scholar",
    author: {
      name: "ViGeng",
      link: "https://www.raycast.com/ViGeng/via=ViGeng",
    },
  },
  {
    id: "semantic-scholar",
    name: "Search Semantic Scholar",
    link: "https://www.semanticscholar.org/search?q={Query}&sort=relevance",
    description: "Search for scientific articles in Semantic Scholar",
    author: {
      name: "ViGeng",
      link: "https://www.raycast.com/ViGeng/via=ViGeng",
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
  {
    id: "kagi",
    name: "Search Kagi",
    link: "https://kagi.com/search?q={Query}",
    author: {
      name: "Dakota Chambers",
      link: "https://github.com/dcchambers",
    },
  },
  {
    id: "bing",
    name: "Search Bing",
    link: "https://www.bing.com/search?q={Query}",
    author: {
      name: "Roman Roan",
      link: "https://github.com/romanr",
    },
  },
  {
    id: "bing-images",
    name: "Search Bing Images",
    link: "https://www.bing.com/images/search?q={Query}",
    author: {
      name: "Roman Roan",
      link: "https://github.com/romanr",
    },
  },
  {
    id: "unduck",
    name: "Search Unduck",
    link: "https://unduck.link?q={query}",
  },
  {
    id: "leo",
    name: "Search Leo",
    description: "Look up words in the English-German dictionary in Leo",
    link: "https://dict.leo.org/german-english/{Query}",
    author: {
      name: "ViGeng",
      link: "https://www.raycast.com/ViGeng/via=ViGeng",
    },
  },
  {
    id: "qwant",
    name: "Search Qwant",
    link: "https://qwant.com/?q={Query}",
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
  {
    id: "bhphotovideo",
    name: "Search B&H",
    link: "https://www.bhphotovideo.com/c/search?q={Query}",
    author: {
      name: "Stephen Kaplan",
      link: "https://github.com/SKaplanOfficial",
    },
  },
  {
    id: "newegg",
    name: "Search Newegg",
    link: "https://www.newegg.com/p/pl?d={Query}",
    author: {
      name: "Stephen Kaplan",
      link: "https://github.com/SKaplanOfficial",
    },
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
    id: "who-sampled",
    name: "Find Who Sampled a Song",
    link: "https://www.whosampled.com/search/?q={Query}",
    icon: {
      name: "microphone",
    },
    author: {
      name: "Nate Whistler",
      link: "https://infosec.exchange/@Onyx/",
    },
  },
  {
    id: "discogs",
    name: "Search Discogs for an Artist",
    link: "https://www.discogs.com/search/?type=artist&title={Query}",
    icon: {
      name: "music",
    },
    author: {
      name: "Nate Whistler",
      link: "https://infosec.exchange/@Onyx/",
    },
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
  {
    id: "justwatched",
    name: "Find out Where it's Streaming",
    link: "https://www.justwatch.com/us/search?q={Query}",
    author: {
      name: "Nate Whistler",
      link: "https://infosec.exchange/@Onyx/",
    },
  },
  {
    id: "prime-video",
    name: "prime video",
    link: "https://www.primevideo.com/search/ref=atv_nb_sug?phrase={query}",
    author: {
      name: "Gianpiero Spinelli",
      link: "https://github.com/gianpispi",
    },
  },
  {
    id: "genius",
    name: "Search Genius",
    link: "https://genius.com/search?q={Query}",
  },
];

const socials: Quicklink[] = [
  {
    id: "tweets",
    name: "Search Tweets",
    description: "Search from a list of users",
    link: 'https://x.com/search?q={argument name="query" | raw}%20from:{argument name="handle" options="@samuelkraft ,  @raycast , @peduarte , @thomaspaulmann " default="@samuelkraft" | raw}&src=typed_query&f=live',
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
  {
    id: "bluesky",
    name: "Search Bluesky",
    link: "https://bsky.app/search?q={Query}",
  },
  {
    id: "gist",
    name: "Search Gist",
    link: "https://gist.github.com/search?q={Query}",
  },
];

const misc: Quicklink[] = [
  {
    id: "selection-notes",
    name: "Selection to Notes",
    description: "Creates a note in Raycast Notes with the selected text",
    link: `raycast://extensions/raycast/raycast-notes/create-note?fallbackText={selection}`,
    icon: {
      name: "fountain-tip",
    },
  },
  {
    id: "daily-note",
    name: "Create daily note",
    description: "Creates a note in Raycast Notes with todays date",
    link: `raycast://extensions/raycast/raycast-notes/create-note?fallbackText=%23%20{date}`,
    icon: {
      name: "fountain-tip",
    },
  },
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
    link: `raycast://extensions/raycast/translator/translate?fallbackText={selection}`,
    icon: {
      name: "magnifying-glass",
    },
  },
  {
    id: "whois",
    name: "Search Domain Names or IP Addresses",
    link: "https://www.whois.com/whois/{query}",
    author: {
      name: "Nate Whistler",
      link: "https://infosec.exchange/@Onyx/",
    },
  },
  {
    id: "shortcuts",
    name: "Run Apple Shortcut",
    description: "Run a Shortcut saved in your Shortcuts collection.",
    link: "shortcuts://run-shortcut?name={Query}",
    icon: {
      name: "arrow-ne",
    },
  },
  {
    id: "Makerworld",
    name: "Search Makerworld",
    description: "Search Makerworld.com for 3d models.",
    link: "https://makerworld.com/en/search/models?keyword={query}",
    author: {
      name: "Nate Whistler",
      link: "https://infosec.exchange/@Onyx/",
    },
  },
];
const science: Quicklink[] = [
  {
    id: "search-ensembl",
    name: "Search the Ensembl Database",
    description: "Search for a gene, variant, transcript, etc. in the ENSEMBL database",
    link: 'https://www.ensembl.org/Multi/Search/Results?q={argument name="Search term"};site=ensembl',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "ucsc-gene-search",
    name: "UCSC Genome Browser (Gene - hg38)",
    description: "Open the UCSC genome browser at a gene locus – Human Genome b38",
    link: 'http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&position={argument name="Gene Name"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "ucsc-position-search",
    name: "UCSC Genome Browser (Position - hg38)",
    description: "Open the UCSC genome browser at a genomic region – Human Genome b38",
    link: 'http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&position={argument name="Chromosome (inc. chr)"}:{argument name="Start Position"}-{argument name="End Position"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "search-ncbi",
    name: "Search NCBI",
    description: "Search NCBI database",
    link: 'https://www.ncbi.nlm.nih.gov/search/all/?term={argument name="Search term"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "search-genecards",
    name: "Search GeneCards database",
    description: "Open the GeneCards page for a given gene",
    link: 'https://www.genecards.org/cgi-bin/carddisp.pl?gene={argument name="Gene"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "search-pubmed",
    name: "Search Pubmed for a manuscript",
    description: "Search for manuscripts in Pubmed",
    link: 'https://pubmed.ncbi.nlm.nih.gov/?term={argument name="Search term"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "blank-document",
    },
  },
  {
    id: "search-googlescholar",
    name: "Search Google Scholar for a manuscript, books, or patents",
    description: "Search for manuscripts in Pubmed",
    link: 'https://scholar.google.com/scholar?hl=en&as_sdt=0,5&q={argument name="Term"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "book",
    },
  },
  {
    id: "search-gwascatalog",
    name: "Search GWAS Catalog",
    description:
      "Search GWAS Catalog for a gene (HGNC/Ensembl), genomic regions (6:167120000-167130000), phenotype, or variant rsID",
    link: 'https://www.ebi.ac.uk/gwas/search?query={argument name="Gene/Phenotype/Variant"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "search-gnomad-v4-variant",
    name: "Search gnomAD v4 (Variant)",
    description: "Search gnomAD database for a variant rsID (rs548932103) or gnomAD ID (6-137871434-C-T)",
    link: 'https://gnomad.broadinstitute.org/variant/{argument name="Variant: rsID/chr-pos-ref-alt"}?dataset=gnomad_r4',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "search-gnomad-v4-gene",
    name: "Search gnomAD v4 (Gene)",
    description: "Search gnomAD database for a gene (HGNC Symbol or Ensembl ID)",
    link: 'https://gnomad.broadinstitute.org/gene/{argument name="Gene: HGNC/ENSEMBL"}?dataset=gnomad_r4',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "search-uniprot",
    name: "Search UniProt",
    description: "Search UniProt database for proteins",
    link: 'https://www.uniprot.org/uniprotkb?query={argument name="Protein/Gene Name"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "dna",
    },
  },
  {
    id: "search-biorxiv",
    name: "Search bioRxiv",
    description: "Search bioRxiv for biology preprints",
    link: 'https://www.biorxiv.org/search/{argument name="Search Term"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "blank-document",
    },
  },
  {
    id: "search-rxiv",
    name: "Search aRxiv",
    description: "Search aRxiv for preprints",
    link: 'https://arxiv.org/search/?query={argument name="Search Term"}&searchtype=all&source=header',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "blank-document",
    },
  },
  {
    id: "search-med",
    name: "Search medRxiv",
    description: "Search medRxiv for medical preprints",
    link: 'https://www.medrxiv.org/search/{argument name="Search Term"}',
    author: {
      name: "Yassine Souilmi",
    },
    icon: {
      name: "blank-document",
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
  {
    name: "Science",
    slug: "/science",
    quicklinks: [...science],
    icon: "dna" as IconName,
  },
].map((category) => {
  return {
    ...category,
    iconComponent: Icons[category.icon],
    quicklinks: category.quicklinks,
  };
});
