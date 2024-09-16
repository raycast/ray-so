<!-- TEXT_SECTION:header:START -->
<p align="center">
  <a href="https://ray.so" target="_blank" rel="noopener noreferrer">
    <img width="1024" src="app/assets/og-image.png" alt="ray.so">
  </a>
</p>
<h1 align="center">
  ray.so
</h1>
<h3 align="center">
  Built by <a href="https://raycast.com/#ref=ray.so" target="_blank" rel="noopener noreferrer">Raycast</a>
</h3>
<p align="center">
  Create code snippets, browse AI prompts, create extension icons and more.
</p>

<p align="center">
  <a aria-label="Follow Raycast on X" href="https://x.com/raycastapp">
    <img alt="" src="https://img.shields.io/badge/Follow%20@raycastapp-black.svg?style=for-the-badge&logo=X">
  </a>
  <a aria-label="Join the community on Slack" href="https://raycast.com/community">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20community-black.svg?style=for-the-badge&logo=Slack">
  </a>
</p>

<!-- TEXT_SECTION:header:END -->

## About

This repository contains the source code for [ray.so](https://ray.so), a collection of tools built by [Raycast](https://raycast.com/#ref=ray.so). It includes:

- [**Code Images**](</app/(navigation)/(code)>): Create beautiful images of your code.
- [**Icon Maker**](</app/(navigation)/icon/>): Create beautiful icons for Raycast Extensions.
- [**Prompt Explorer**](</app/(navigation)/prompts/>): Explore AI Prompts for Raycast.
- [**Preset Explorer**](</app/(navigation)/presets/>): Explore AI Presets for Raycast.
- [**Snippet Explorer**](</app/(navigation)/snippets/>): Browse and import Raycast Snippets.
- [**Theme Explorer**](</app/(navigation)/themes/>): Browse and import Raycast Themes.

## Setup

This is a [Next.js](https://nextjs.org/) project. If you're unfamiliar with it, check out the [Next.js Documentation](https://nextjs.org/docs).

To get started, download the repo, install dependencies and run the development server:

```bash
npm install
npm run dev
```

## Contributing

We welcome contributions primarily in the form of new presets, prompts, snippets, themes, and bug fixes. If you're interested in contributing, follow the steps below:

### Presets, Prompts & Snippets

- Open [prompts.ts](</app/(navigation)/prompts/prompts.ts>) or [presets.ts](</app/(navigation)/presets/presets.ts>) or [snippets.ts](</app/(navigation)/snippets/snippets.ts>)
- Add your data to the relevant category
  - Ensure it includes all fields, and that they're unique within their category
- Create a pull request 🚀

### Themes

#### 1. Copy the Theme JSON from Raycast

- Open Theme Studio in Raycast
- Right click on your Theme and select "Copy as JSON"

#### 2. Add the theme to repo

- In [themes](</app/(navigation)/themes/themes>), create a folder with your Raycast username, ie: `peduarte`
- In that folder, create a file with the theme name, ie: `red.json`
- In that file, paste the theme JSON you copied from Raycast's Theme Studio

#### 3. Generate the theme OG image

- Make sure your local server running (`npm run dev`)
- Open a new terminal session and run `npm run generate-themes-og-images -- --slug=username/themename` (replace `username/themename` with your theme's folder and file name)

#### 4. Commit and push your changes

- Create a Pull Request 🚀
