# Extract Code Images Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strip the ray.so fork to only the Code Images feature — remove all other tools, the global navigation, and all non-partner themes.

**Architecture:** Delete unused page/API route directories, remove the Navigation component from the layout, move the Code Images page up to `app/(navigation)/` so it resolves to `/`, update the `@code` tsconfig alias to match the new path, and strip non-partner themes from `themes.ts` and `ThemeControl.tsx`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Jotai, Shiki

---

### Task 1: Delete unused page routes

**Files:**

- Delete: `app/(navigation)/icon/`
- Delete: `app/(navigation)/presets/`
- Delete: `app/(navigation)/prompts/`
- Delete: `app/(navigation)/quicklinks/`
- Delete: `app/(navigation)/snippets/`
- Delete: `app/(navigation)/themes/`

**Step 1: Confirm build passes before touching anything**

```bash
npm run build
```

Expected: build succeeds (establish a clean baseline).

**Step 2: Delete the page route directories**

```bash
rm -rf "app/(navigation)/icon"
rm -rf "app/(navigation)/presets"
rm -rf "app/(navigation)/prompts"
rm -rf "app/(navigation)/quicklinks"
rm -rf "app/(navigation)/snippets"
rm -rf "app/(navigation)/themes"
```

**Step 3: Verify the build still passes**

```bash
npm run build
```

Expected: build succeeds. If it fails, check for cross-imports from these pages into shared components.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused page routes (icon, presets, prompts, quicklinks, snippets, themes)"
```

---

### Task 2: Delete unused API routes

**Files:**

- Delete: `app/api/presets/`
- Delete: `app/api/prompts/`
- Delete: `app/api/quicklinks/`
- Delete: `app/api/snippets/`
- Delete: `app/api/themes/`
- Keep: `app/api/shorten-url/` (used by Code Images ExportButton)
- Keep: `app/api/config/` (exposes languages/themes/padding for Code Images)

**Step 1: Delete the API route directories**

```bash
rm -rf app/api/presets
rm -rf app/api/prompts
rm -rf app/api/quicklinks
rm -rf app/api/snippets
rm -rf app/api/themes
```

**Step 2: Verify the build still passes**

```bash
npm run build
```

Expected: build succeeds.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused API routes"
```

---

### Task 3: Remove the Navigation component and update the layout

**Files:**

- Delete: `components/navigation.tsx`
- Delete: `app/(navigation)/loading.tsx` (references `top-[49px]` nav bar height — no longer needed)
- Modify: `app/(navigation)/layout.tsx`

**Step 1: Delete the navigation component and loading file**

```bash
rm components/navigation.tsx
rm "app/(navigation)/loading.tsx"
```

**Step 2: Edit `app/(navigation)/layout.tsx`**

Remove the `<Navigation />` import and its JSX usage. Also remove the `pt-[50px]` top padding from `<main>` (it existed to clear the fixed nav bar).

Before (relevant section):

```tsx
import { Navigation } from "@/components/navigation";
// ...
export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("h-full" /* font variables */)}>
      <Navigation />
      <main className="flex flex-col min-h-full pt-[50px]">{children}</main>
    </div>
  );
}
```

After:

```tsx
// Remove: import { Navigation } from "@/components/navigation";
// ...
export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("h-full" /* font variables */)}>
      <main className="flex flex-col min-h-full">{children}</main>
    </div>
  );
}
```

**Step 3: Verify the build still passes**

```bash
npm run build
```

Expected: build succeeds with no reference to `navigation` component.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove navigation bar and loading overlay"
```

---

### Task 4: Move Code Images to root of (navigation) group

Currently Code Images lives at `app/(navigation)/(code)/`. The `(code)` route group is the only remaining child, so we can flatten it — moving all contents up one level into `app/(navigation)/`.

The `(navigation)` group is a Next.js route group (parentheses = no URL segment), so after the move the page resolves to `/`.

**Files:**

- Move: all contents of `app/(navigation)/(code)/` → `app/(navigation)/`
- Delete: now-empty `app/(navigation)/(code)/` directory
- Modify: `tsconfig.json` — update `@code` alias

**Step 1: Move the files**

```bash
mv "app/(navigation)/(code)/assets" "app/(navigation)/assets"
mv "app/(navigation)/(code)/code.module.css" "app/(navigation)/code.module.css"
mv "app/(navigation)/(code)/code.tsx" "app/(navigation)/code.tsx"
mv "app/(navigation)/(code)/components" "app/(navigation)/components"
mv "app/(navigation)/(code)/lib" "app/(navigation)/lib"
mv "app/(navigation)/(code)/page.tsx" "app/(navigation)/page.tsx"
mv "app/(navigation)/(code)/store" "app/(navigation)/store"
mv "app/(navigation)/(code)/util" "app/(navigation)/util"
rmdir "app/(navigation)/(code)"
```

**Step 2: Update the `@code` alias in `tsconfig.json`**

Open `tsconfig.json`. Find the `paths` section and change:

```json
"@code/*": ["./app/(navigation)/(code)/*"],
```

To:

```json
"@code/*": ["./app/(navigation)/*"],
```

Also remove the now-unused aliases for deleted features:

```json
"@presets/*": ["./app/(navigation)/presets/*"],
"@prompts/*": ["./app/(navigation)/prompts/*"],
"@snippets/*": ["./app/(navigation)/snippets/*"],
"@themes/*": ["./app/(navigation)/themes/*"],
"@icon/*": ["./app/(navigation)/icon/*"]
```

The final `paths` section should only contain:

```json
"paths": {
  "@/*": ["./*"],
  "@code/*": ["./app/(navigation)/*"]
}
```

**Step 3: Verify the build passes**

```bash
npm run build
```

Expected: build succeeds. If TypeScript complains about `@code/*` imports, double-check the alias path is correct and that no files were missed in the move.

**Step 4: Smoke-test locally**

```bash
npm run dev
```

Open `http://localhost:3000` — the Code Images editor should appear directly at the root. No 404, no redirect.

**Step 5: Commit**

```bash
git add -A
git commit -m "refactor: move Code Images to root route, update @code alias"
```

---

### Task 5: Remove non-partner themes

There are four non-partner themes to delete: `breeze`, `candy`, `midnight`, and `wrapped`. After deletion, the fallback references to `THEMES.candy` must point to a valid partner theme (`vercel` is a good default — it's the first partner theme defined).

**Files:**

- Modify: `app/(navigation)/store/themes.ts`
- Modify: `app/(navigation)/components/ThemeControl.tsx`

**Step 1: Delete non-partner theme definitions from `themes.ts`**

In `themes.ts`, locate and delete the entire object entries for `breeze`, `candy`, `midnight`, and `wrapped` from the `THEMES` constant. These are the keys without `partner: true`.

To find their exact line ranges:

```bash
grep -n "breeze:\|candy:\|midnight:\|wrapped:" "app/(navigation)/store/themes.ts"
```

Delete each block from its key line to its closing `},` — including all syntax definitions inside.

**Step 2: Update the fallback references from `candy` to `vercel`**

After deleting `candy`, the code that falls back to `THEMES.candy` will break. Search for all occurrences:

```bash
grep -n "THEMES.candy" "app/(navigation)/store/themes.ts"
```

Replace every `THEMES.candy` with `THEMES.vercel`. There should be 2–3 occurrences (the atom default value and the deserializer fallback).

**Step 3: Simplify `ThemeControl.tsx`**

Open `app/(navigation)/components/ThemeControl.tsx`.

The current `groupedItems` has three sections: `"Limited edition"`, `"Partners"`, `"Themes"`. Since only partner themes remain, simplify to just the Partners group.

Find the `groupedItems` useMemo and the related memos (`filteredLimitedThemes`, `filteredThemes`, `partnerThemes`) and simplify:

Before:

```tsx
const { partnerThemes, themes } = useMemo(
  () =>
    Object.entries(THEMES).reduce<{ partnerThemes: Theme[]; themes: Theme[] }>(
      (acc, [key, value]) => {
        const themeWithKey = { ...value, key };
        if (value.partner) {
          acc.partnerThemes.push(themeWithKey);
        } else {
          acc.themes.push(themeWithKey);
        }
        return acc;
      },
      { partnerThemes: [], themes: [] },
    ),
  [],
);

const filteredPartnerThemes = useMemo(
  () =>
    partnerThemes.filter(
      (theme) => unlockedThemes.includes(theme.id) || !theme.hidden || theme.name === currentTheme.name,
    ),
  [partnerThemes, unlockedThemes, currentTheme.name],
);

const filteredLimitedThemes = useMemo(() => {
  return themes.filter((theme) => theme.id === "wrapped");
}, [themes]);

const filteredThemes = useMemo(() => {
  return themes.filter((theme) => theme.id !== "wrapped");
}, [themes]);

const groupedItems: ThemeGroup[] = useMemo(
  () => [
    { label: "Limited edition", items: filteredLimitedThemes },
    { label: "Partners", items: filteredPartnerThemes },
    { label: "Themes", items: filteredThemes },
  ],
  [filteredLimitedThemes, filteredPartnerThemes, filteredThemes],
);
```

After (all themes are partner themes now, simplify to a flat list):

```tsx
const allThemes = useMemo(
  () =>
    Object.entries(THEMES)
      .map(([key, value]) => ({ ...value, key }))
      .filter((theme) => unlockedThemes.includes(theme.id) || !theme.hidden || theme.name === currentTheme.name),
  [unlockedThemes, currentTheme.name],
);

const groupedItems: ThemeGroup[] = useMemo(() => [{ label: "Partners", items: allThemes }], [allThemes]);
```

**Step 4: Verify TypeScript has no errors**

```bash
npx tsc --noEmit
```

Expected: no errors. Fix any remaining references to deleted theme keys or removed variables.

**Step 5: Verify the build passes**

```bash
npm run build
```

Expected: build succeeds.

**Step 6: Smoke-test locally**

```bash
npm run dev
```

Open `http://localhost:3000`. Click the Theme dropdown — only Partner themes should appear. The default theme should be Vercel (not Candy). Verify switching themes works correctly.

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove non-partner themes, simplify ThemeControl"
```

---

### Task 6: Final cleanup and verification

**Step 1: Check for dead imports**

```bash
npx tsc --noEmit
```

Fix any remaining TypeScript errors from orphaned imports (e.g., unused SVG imports for deleted theme logos, or references to removed variables).

**Step 2: Check for references to deleted features**

```bash
grep -rn "icon\|presets\|prompts\|quicklinks\|snippets" app/ --include="*.ts" --include="*.tsx" | grep -v "node_modules\|.next"
```

Review results — most hits will be legitimate (e.g., icon inside the Code Images UI). Remove any that reference deleted features.

**Step 3: Run a full production build one final time**

```bash
npm run build
```

Expected: clean build with no warnings about missing modules.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup after Code Images extraction"
```
