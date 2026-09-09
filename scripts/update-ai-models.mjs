// Regenerates the `Model` union in api/ai.ts from the Raycast AI models API
// and reports any model IDs still referenced by presets/prompts that the API
// no longer returns.
//
// Usage: node scripts/update-ai-models.mjs
// Run by .github/workflows/update-ai-models.yml on a schedule.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const API_URL = "https://www.raycast.com/api/v1/ai/models";
const MODEL_TYPE_FILE = "api/ai.ts";
const CONSUMER_FILES = ["app/(navigation)/presets/presets.ts", "app/(navigation)/prompts/prompts.ts"];

const root = resolve(import.meta.dirname, "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const write = (p, s) => writeFileSync(resolve(root, p), s);

const res = await fetch(API_URL);
if (!res.ok) {
  throw new Error(`Failed to fetch ${API_URL}: ${res.status} ${res.statusText}`);
}
const { models } = await res.json();
if (!Array.isArray(models) || models.length === 0) {
  throw new Error("API returned no models, refusing to overwrite the Model type");
}

// 1. Regenerate the Model union, preserving API order.
const unionRegex = /export type Model =\n(?:  \| "[^"]+"\n?)+;\n/;
const source = read(MODEL_TYPE_FILE);
if (!unionRegex.test(source)) {
  throw new Error(`Could not find the Model union in ${MODEL_TYPE_FILE}`);
}
const previousIds = [...source.match(unionRegex)[0].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const currentIds = models.map((m) => m.id);
const union = `export type Model =\n${currentIds.map((id) => `  | "${id}"`).join("\n")};\n`;
write(MODEL_TYPE_FILE, source.replace(unionRegex, union));

const added = currentIds.filter((id) => !previousIds.includes(id));
const removed = previousIds.filter((id) => !currentIds.includes(id));

// 2. Find references to models the API no longer returns.
const available = new Set(currentIds);
const deprecated = new Set(models.filter((m) => m.availability === "deprecated").map((m) => m.id));
const stale = [];
const deprecatedInUse = [];
for (const file of CONSUMER_FILES) {
  const content = read(file);
  const counts = new Map();
  for (const [, id] of content.matchAll(/model: "([^"]+)"/g)) {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  for (const [id, count] of counts) {
    if (!available.has(id)) stale.push({ file, id, count });
    else if (deprecated.has(id)) deprecatedInUse.push({ file, id, count });
  }
}

// 3. Report.
const list = (ids) => (ids.length ? ids.map((id) => `- \`${id}\``).join("\n") : "_none_");
const usage = (rows) =>
  rows.length
    ? rows.map((r) => `- \`${r.id}\` in \`${r.file}\` (${r.count} ${r.count === 1 ? "use" : "uses"})`).join("\n")
    : "_none_";

const report = `## Summary

Regenerated the \`Model\` union in \`${MODEL_TYPE_FILE}\` from ${API_URL} (${currentIds.length} models).

### Added
${list(added)}

### Removed
${list(removed)}

### Needs attention: references to models the API no longer returns
${usage(stale)}${stale.length ? "\n\nThese will fail type-check. Reassign them to a current model before merging." : ""}

### Deprecated models still in use
${usage(deprecatedInUse)}
`;

write("scripts/update-ai-models-report.md", report);
console.log(report);
console.log(`\nChanged: ${added.length} added, ${removed.length} removed, ${stale.length} stale reference(s).`);
