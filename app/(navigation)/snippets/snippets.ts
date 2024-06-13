import { IconName as RaycastIconName } from "@raycast/icons";
import { nanoid } from "nanoid";

export type IconName = RaycastIconName | "github";

export type Snippet = {
  id: string;
  text: string;
  name: string;
  keyword: string;
  type: string;
};

export type Category = {
  name: string;
  slug: string;
  snippets: Snippet[];
  icon: IconName;
  gridCols: number;
};

const arrows: Snippet[] = [
  {
    id: nanoid(),
    text: "←",
    name: "Arrow Left",
    keyword: "left",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↑",
    name: "Arrow Up",
    keyword: "up",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "→",
    name: "Arrow Right",
    keyword: "right",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↓",
    name: "Arrow Down",
    keyword: "down",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↖",
    name: "Arrow Up Left",
    keyword: "upleft",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↗︎",
    name: "Arrow Up Right",
    keyword: "upright",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↙",
    name: "Arrow Down Left",
    keyword: "downleft",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↘",
    name: "Arrow Down Right",
    keyword: "downright",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⟶",
    name: "Arrow Long Right",
    keyword: "longright",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⟵",
    name: "Arrow Long Left",
    keyword: "longleft",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↩",
    name: "Arrow Left Hook",
    keyword: "lefthook",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↪",
    name: "Arrow Right Hook",
    keyword: "righthook",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↺",
    name: "Undo",
    keyword: "undo",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "↻",
    name: "Redo",
    keyword: "redo",
    type: "symbol",
  },
];

const bulletsAndStars: Snippet[] = [
  {
    id: nanoid(),
    text: "·",
    name: "Middle Dot",
    keyword: "dot",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "●",
    name: "Circle",
    keyword: "circle",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "★",
    name: "Star Filled",
    keyword: "star-filled",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "☆",
    name: "Star Outline",
    keyword: "star-outline",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "✦",
    name: "Sparkle",
    keyword: "sparkle",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "❖",
    name: "Diamond",
    keyword: "diamond",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "※",
    name: "Reference Mark",
    keyword: "reference-mark",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⁂",
    name: "Asterism",
    keyword: "asterism",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⁖",
    name: "Three Dot Punctuation",
    keyword: "three-dots",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⁘",
    name: "Four Dot Punctuation",
    keyword: "four-dots",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⁙",
    name: "Five Dot Punctuation",
    keyword: "five-dots",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⁜",
    name: "Dotted Cross",
    keyword: "dotted-cross",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "☀",
    name: "Sun",
    keyword: "sun",
    type: "symbol",
  },
];

const technical: Snippet[] = [
  {
    id: nanoid(),
    text: "⌘",
    name: "Command",
    keyword: "cmd",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⇪",
    name: "Caps Lock",
    keyword: "caps",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⇧",
    name: "Shift",
    keyword: "shift",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⌥",
    name: "Option",
    keyword: "opt",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⌃",
    name: "Control",
    keyword: "ctrl",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⌫",
    name: "Backspace",
    keyword: "backspace",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⎋",
    name: "Escape",
    keyword: "esc",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⇥",
    name: "Tab",
    keyword: "tab",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⏎",
    name: "Return",
    keyword: "return",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "",
    name: "Apple",
    keyword: "apple",
    type: "symbol",
  },
];

const currency: Snippet[] = [
  {
    id: nanoid(),
    text: "£",
    name: "Sterling",
    keyword: "gbp",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "€",
    name: "Euro",
    keyword: "eur",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "¥",
    name: "Yen",
    keyword: "yen",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "$",
    name: "Dollar",
    keyword: "usd",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "₹",
    name: "Indian Rupee",
    keyword: "inr",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "₣",
    name: "Franc",
    keyword: "fr",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "₩",
    name: "Won",
    keyword: "krw",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "₱",
    name: "Peso",
    keyword: "php",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "₦",
    name: "Naira",
    keyword: "ngn",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "฿",
    name: "Baht",
    keyword: "thb",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "₫",
    name: "Dong",
    keyword: "vnd",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "₿",
    name: "Bitcoin",
    keyword: "btc",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "Ξ",
    name: "Ethereum",
    keyword: "eth",
    type: "symbol",
  },
];

const maths: Snippet[] = [
  {
    id: nanoid(),
    text: "×",
    name: "Multiplication",
    keyword: "x",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "÷",
    name: "Division",
    keyword: "division",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "±",
    name: "Plus Minus",
    keyword: "+-",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "½",
    name: "One Half",
    keyword: "1/2",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⅓",
    name: "One Third",
    keyword: "1/3",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "¼",
    name: "One Quarter",
    keyword: "1/4",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "¾",
    name: "Three Quarters",
    keyword: "3/4",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⅚",
    name: "Five Sixths",
    keyword: "5/6",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⅟",
    name: "One Fraction",
    keyword: "1/",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⅞",
    name: "Seven Eighths",
    keyword: "7/8",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⅛",
    name: "One Eighth",
    keyword: "1/8",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⅝",
    name: "Five Eighths",
    keyword: "5/8",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "⅜",
    name: "Three Eighths",
    keyword: "3/8",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "∞",
    name: "Infinity",
    keyword: "infinity",
    type: "symbol",
  },
];

const symbols: Snippet[] = [
  {
    id: nanoid(),
    text: "®",
    name: "Registered",
    keyword: "registered",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "©",
    name: "Copyright",
    keyword: "copyright",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "℗",
    name: "Published",
    keyword: "published",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "™",
    name: "Trademark",
    keyword: "tm",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "№",
    name: "Numero Sign",
    keyword: "numero-sign",
    type: "symbol",
  },

  {
    id: nanoid(),
    text: "℃",
    name: "Celsius",
    keyword: "celsius",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "℉",
    name: "Fahrenheit",
    keyword: "fahrenheit",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "✓",
    name: "Check",
    keyword: "check",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "…",
    name: "Horizontal Ellipsis",
    keyword: "horizontal-ellipsis",
    type: "symbol",
  },
  {
    id: nanoid(),
    text: "▲",
    name: "Triangle",
    keyword: "triangle",
    type: "symbol",
  },
];

const feedback: Snippet[] = [
  {
    name: "Feedback Thanks",
    id: nanoid(),
    text: `Hi 👋

Thanks for taking the time to give us your feedback.

{cursor}`,
    keyword: "feedback-thanks",
    type: "template",
  },
  {
    name: "Feedback Resolved",
    id: nanoid(),
    text: `Glad to know it is resolved. Feel free to reach out for any further clarifications.`,
    keyword: "feedback-resolved",
    type: "template",
  },
  {
    name: "LinkedIn Feedback",
    id: nanoid(),
    text: `Hey {cursor},

I'm thrilled about the opportunity. Unfortunately, I'm currently not available to accept new offers. However, I hope we can stay connected for future positions if you don't mind. Thank you again and hope to talk to you soon.`,
    keyword: "feedback-lkdn",
    type: "template",
  },
];

const coding: Snippet[] = [
  {
    name: "Console Log",
    id: nanoid(),
    text: `console.log({cursor})`,
    keyword: "log",
    type: "template",
  },
  {
    name: "Try Catch",
    id: nanoid(),
    text: `try {
  {cursor}
} catch (error) {

} finally {

}`,
    keyword: "try",
    type: "template",
  },
  {
    name: "Switch Statement",
    id: nanoid(),
    text: `switch ({cursor}) {
  case 'value': {
    break
  }
  default: {
    break
  }
}`,
    keyword: "switch",
    type: "template",
  },
  {
    name: "Sleep Promise",
    id: nanoid(),
    text: `const sleep = (time = 3000) => new Promise (resolve => setTimeout (resolve, time));`,
    keyword: "sleep",
    type: "template",
  },
  {
    name: "React: useEffect",
    id: nanoid(),
    text: `React.useEffect(() => {
  {cursor}
}, [])`,
    keyword: "rue",
    type: "template",
  },
  {
    name: "Vue: Base Single File Component",
    id: nanoid(),
    text: `<script lang="ts" setup>
  {cursor}
</script>

<template>
  <div>
    <h1>Vue Component</h1>
  </div>
</template>

<style lang="scss" scoped>

</style>`,
    keyword: "vbase",
    type: "template",
  },
  {
    name: "Svelte: If Block",
    id: nanoid(),
    text: `{#if {cursor}}

{/if}`,
    keyword: "sif",
    type: "template",
  },
  {
    name: "Svelte: If Else Block",
    id: nanoid(),
    text: `{#if {cursor}}

{:else}

{/if}`,
    keyword: "selse",
    type: "template",
  },
  {
    name: "Svelte: Each Block",
    id: nanoid(),
    text: `{#each {cursor} as item}

{/each}`,
    keyword: "seach",
    type: "template",
  },
  {
    name: "Svelte: Await Block",
    id: nanoid(),
    text: `{#await {cursor}}
  {#then thing}

  {/then}
  {#catch error}

  {/catch}
{/await}`,
    keyword: "sawait",
    type: "template",
  },
  {
    name: "Raycast View Command",
    id: nanoid(),
    text: `export default function Command() {
  return {cursor}
}`,
    keyword: "ray-vc",
    type: "template",
  },
  {
    name: "Export Functional Component",
    id: nanoid(),
    text: `export function Component() {
  return null
}`,
    keyword: "rfc",
    type: "template",
  },
  {
    name: "CSS Center Align",
    id: nanoid(),
    text: `.selector {
  display: flex;
  align-items: center;
  justify-content: center;
}`,
    keyword: "css-ac",
    type: "template",
  },
  {
    name: "Create and Open Folder in VSCode",
    id: nanoid(),
    text: "mkdir {clipboard} && code -r {clipboard}",
    keyword: "vscd-init",
    type: "template",
  },
  {
    name: "DOM Query Selector",
    id: nanoid(),
    text: `document.querySelector({cursor})`,
    keyword: "qs",
    type: "template",
  },
];

const github: Snippet[] = [
  {
    id: nanoid(),
    name: "GitHub Issue Template",
    text: `## Expected Behavior

## Actual Behavior

## Steps to Reproduce the Problem

  1.
  1.
  1.

## Specifications

  - Version:
  - Platform:
  - Subsystem:
`,
    keyword: "gh-issue",
    type: "template",
  },
  {
    id: nanoid(),
    name: "GitHub Pull Request Template",
    text: `<!-- Thanks for opening a PR! Your contribution is much appreciated.-->

Fixes #

## Proposed Changes

  -
  -
  -
`,
    keyword: "gh-pr",
    type: "template",
  },
  {
    id: nanoid(),
    name: "GitHub Table",
    text: `| Title1 | Title2 |
| ------- | ------- |
| Content1 | Content2 |
  `,
    keyword: "gh-table",
    type: "template",
  },
  {
    id: nanoid(),
    name: "GitHub Details",
    text: `<details>
<summary>Title</summary>
{cursor}
</details>`,
    keyword: "gh-details",
    type: "template",
  },
  {
    id: nanoid(),
    name: "GitHub Note",
    text: `> [!NOTE]
> {cursor}`,
    keyword: "gh-note",
    type: "template",
  },
  {
    id: nanoid(),
    name: "GitHub Warning",
    text: `> [!WARNING]
> {cursor}`,
    keyword: "gh-warning",
    type: "template",
  },
];

const spelling: Snippet[] = [
  {
    id: nanoid(),
    name: "Apparantly → Apparently",
    text: "Apparently",
    keyword: "Apparantly",
    type: "spelling",
  },
  {
    id: nanoid(),
    name: "Calender → Calendar",
    text: "Calendar",
    keyword: "Calender",
    type: "spelling",
  },
  {
    id: nanoid(),
    name: "Definately → Definitely",
    text: "Definitely",
    keyword: "Definately",
    type: "spelling",
  },
  {
    id: nanoid(),
    name: "Enviroment → Environment",
    text: "Environment",
    keyword: "Enviroment",
    type: "spelling",
  },
  {
    id: nanoid(),
    name: "Florescent → Fluorescent",
    text: "Fluorescent",
    keyword: "Florescent",
    type: "spelling",
  },
  {
    id: nanoid(),
    name: "Goverment → Government",
    text: "Government",
    keyword: "Goverment",
    type: "spelling",
  },
];

const unicodes: Snippet[] = [
  {
    id: nanoid(),
    name: "Shrug",
    text: "¯\\_(ツ)_/¯",
    keyword: "shrug",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Happy With It Unicode",
    text: "ʘ‿ʘ",
    keyword: "happy",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Cute Unicode",
    text: "•‿•",
    keyword: "cute",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Tears Of Joy Unicode",
    text: "ಥ‿ಥ",
    keyword: "tears-of-joy",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Wink Unicode",
    text: "◕‿↼",
    keyword: "wink",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Glasses of Disapproval Unicode",
    text: "(-■_■)",
    keyword: "glasses-disapproval",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Meh Unicode",
    text: "ヽ(。_°)ノ",
    keyword: "meh",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Serious Lookg Unicode",
    text: "(ಠ_ಠ)",
    keyword: "serious-look",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Flipping Table Unicode",
    text: "(╯°□°)╯︵ ┻━┻",
    keyword: "flipping-table",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Putting Table Back Unicode",
    text: "┳━┳ ヽ(ಠل͜ಠ)ﾉ",
    keyword: "putting-table",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Angry Cat Unicode",
    text: "(^._.^)ﾉ",
    keyword: "angry-cat",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Lenny Unicode",
    text: "( ͡° ͜ʖ ͡°)",
    keyword: "lenny",
    type: "unicode",
  },
  {
    id: nanoid(),
    name: "Noggles",
    text: "⌐◨-◨",
    keyword: "noggles",
    type: "unicode",
  },
];

const date: Snippet[] = [
  {
    id: nanoid(),
    name: "Current Date",
    text: "The date is {date}.",
    keyword: "date",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Current Time",
    text: "The current time is {time}.",
    keyword: "time",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Current Date and Time",
    text: "The current date and time is {datetime}.",
    keyword: "datetime",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Weekday",
    text: "Today is {day}.",
    keyword: "day",
    type: "template",
  },
  {
    id: nanoid(),
    name: "1 Year from Today",
    text: "1 year from today will be {day +1y}.",
    keyword: "nextyear",
    type: "template",
  },
  {
    id: nanoid(),
    name: "4 Days from Today",
    text: "4 days from today will be {day +4d}.",
    keyword: "day+4",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Week Number",
    text: 'This week number is {date "w"}.',
    keyword: "wn",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Next Week Number",
    text: 'Next week number is {date +7d "w"}.',
    keyword: "nwk",
    type: "template",
  },
];

const misc: Snippet[] = [
  {
    id: nanoid(),
    name: "Email Address",
    text: "your@email.com",
    keyword: "email",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Address",
    text: "123 Quebec Road, Montreal, QC, H3A 2B2",
    keyword: "address",
    type: "template",
  },
  {
    id: nanoid(),
    name: "IBAN",
    text: "NL88INGB7356737620",
    keyword: "iban",
    type: "template",
  },
  {
    id: nanoid(),
    name: "VAT Number",
    text: "GB 943182327",
    keyword: "vat",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Crypto Wallet Address",
    text: "0x0000000000000000000000000000000000000000",
    keyword: "wa",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Cal.com Invite Link",
    text: "https://cal.com/username/30min",
    keyword: "cal",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Telegram Link",
    text: "https://t.me/yournickname",
    keyword: "tg",
    type: "template",
  },
  {
    id: nanoid(),
    name: "Weekly Standup Template",
    text: `Good morning ✨

*Last week:*
- {cursor}

*Didn't do:*
-

*This week:*
-

*Blockers:*
-

*Highlights:*
- `,
    keyword: "standup",
    type: "template",
  },
];

export const snippetGroups: Category[] = [
  {
    name: "Symbols",
    slug: "/symbols",
    gridCols: 4,
    snippets: [...technical, ...bulletsAndStars, ...maths, ...symbols],
    icon: "command-symbol",
  },
  {
    name: "Arrows",
    slug: "/arrows",
    gridCols: 6,
    snippets: arrows,
    icon: "shuffle",
  },
  {
    name: "Unicode",
    slug: "/unicode",
    gridCols: 4,
    snippets: unicodes,
    icon: "keyboard",
  },
  {
    name: "Date & Time",
    slug: "/dates",
    gridCols: 3,
    snippets: date,
    icon: "calendar",
  },
  {
    name: "Miscellaneous",
    slug: "/misc",
    gridCols: 2,
    snippets: misc,
    icon: "snippets",
  },
  {
    name: "Spelling",
    slug: "/spelling",
    gridCols: 4,
    snippets: spelling,
    icon: "lowercase",
  },
  {
    name: "Currency",
    slug: "/currency",
    gridCols: 4,
    snippets: currency,
    icon: "coins",
  },
  {
    name: "Coding",
    slug: "/coding",
    gridCols: 3,
    snippets: coding,
    icon: "code-block",
  },
  {
    name: "Feedback",
    slug: "/feedback",
    gridCols: 3,
    snippets: feedback,
    icon: "speech-bubble",
  },
  {
    name: "GitHub",
    slug: "/github",
    gridCols: 2,
    snippets: github,
    icon: "github",
  },
];
