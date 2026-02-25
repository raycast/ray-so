# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16** single-service web application (ray.so) — no database, no Docker, no external services required.

### Quick reference

| Task         | Command                   |
| ------------ | ------------------------- |
| Install deps | `npm install`             |
| Dev server   | `npm run dev` (port 3000) |
| Lint         | `npm run lint`            |
| Type-check   | `npm run type-check`      |
| Build        | `npm run build`           |

### Notes

- **Node.js ^22 required** (per `engines` in `package.json`). The VM ships with v22.22.0.
- The repo uses **npm** (`package-lock.json`). Do not use pnpm/yarn.
- `npm run lint` and `npm run type-check` have **pre-existing errors** in the codebase (eslint `react-hooks/set-state-in-effect` and TS errors from image module imports with `@svgr/webpack`). These are not caused by environment setup.
- **No env vars are required** for local development. The optional `DUB_TOKEN` is only needed for the URL-shortening API route (`/api/shorten-url`).
- Pre-commit hooks via **Husky + lint-staged** run eslint, stylelint, and prettier on staged files.
- All data (prompts, presets, snippets, themes, quicklinks) is static TypeScript — no database or seeding needed.
