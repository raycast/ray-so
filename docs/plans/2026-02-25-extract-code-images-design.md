# Design: Extract Code Images — Remove All Other Features

**Date:** 2026-02-25
**Status:** Approved

## Goal

Strip the ray.so fork down to only the Code Images feature. Remove all other tools (Icon Maker, Prompt Explorer, Preset Explorer, Quicklink Explorer, Snippet Explorer, Theme Explorer), their API routes, and the global navigation. Keep only the partner themes. The root URL `/` will serve the Code Images page directly.

## Section 1 — What to Delete

### Page routes (entire directories)
- `app/(navigation)/icon/`
- `app/(navigation)/presets/`
- `app/(navigation)/prompts/`
- `app/(navigation)/quicklinks/`
- `app/(navigation)/snippets/`
- `app/(navigation)/themes/`

### API routes
- `app/api/presets/`
- `app/api/prompts/`
- `app/api/quicklinks/`
- `app/api/snippets/`
- `app/api/themes/`

> `app/api/shorten-url/` and `app/api/config/` are kept — Code Images uses shorten-url in the share/export button.

### Navigation component
- `components/navigation.tsx` — delete entirely
- Remove `<Navigation />` import and usage from `app/(navigation)/layout.tsx`
- Remove `pt-[50px]` top padding from `<main>` in the navigation layout (was reserved for the nav bar height)

## Section 2 — Routing Restructure

Move Code Images from `app/(navigation)/(code)/` up to `app/(navigation)/` so the route resolves to `/`.

Steps:
1. Move all contents of `app/(navigation)/(code)/` into `app/(navigation)/`
2. Delete the now-empty `(code)/` directory
3. The `(navigation)` route group does not affect URLs, so the page automatically becomes `/`
4. Keep `app/(navigation)/layout.tsx` — it still provides font CSS variables and the `<main>` wrapper, just without `<Navigation />`
5. Review `app/(navigation)/loading.tsx` — keep if it still applies to Code Images, delete if it was navigation-specific
6. Keep `app/not-found.tsx` at the root as-is

**Result:** `/ → app/(navigation)/page.tsx` (Code Images, no redirect needed)

## Section 3 — Theme Cleanup

In `app/(navigation)/store/themes.ts` (after the move):

1. Delete all theme definitions that do **not** have `partner: true`
2. In `ThemeControl.tsx`, remove the "Themes" section from the dropdown — keep only the "Partners" section
3. Verify the default theme (`defaultTheme`) points to a partner theme; update it if it currently points to a regular theme
4. Keep all frame components in `components/frames/` — they are used by partner themes and will be needed for the future MS theme

## Future Work

- Create a custom "MS" theme with `partner: true` in `themes.ts` and a corresponding frame component
