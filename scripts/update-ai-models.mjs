// Syncs the repo with the Raycast AI models API:
//   1. Regenerates the `Model` union in api/ai.ts.
//   2. Remaps preset/prompt references to models that are missing or deprecated
//      onto the latest suitable replacement.
//   3. Writes a markdown report used as the PR body by the scheduled workflow.
//
// Usage: node scripts/update-ai-models.mjs
// Run by .github/workflows/update-ai-models.yml on a schedule.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const API_URL = "https://www.raycast.com/api/v1/ai/models";
const MODEL_TYPE_FILE = "api/ai.ts";
const CONSUMER_FILES = ["app/(navigation)/presets/presets.ts", "app/(navigation)/prompts/prompts.ts"];
const REPORT_FILE = "scripts/update-ai-models-report.md";

const root = resolve(import.meta.dirname, "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const write = (p, s) => writeFileSync(resolve(root, p), s);

const res = await fetch(API_URL);
if (!res.ok) {
  throw new Error(`Failed to fetch ${API_URL}: ${res.status} ${res.statusText}`);
}
const { models, default_models: defaultModels } = await res.json();
if (!Array.isArray(models) || models.length === 0) {
  throw new Error("API returned no models, refusing to overwrite the Model type");
}

const byId = new Map(models.map((m) => [m.id, m]));
const isDeprecated = (m) => m.availability === "deprecated" || m.status === "deprecated";
const isCurrent = (id) => byId.has(id) && !isDeprecated(byId.get(id));

// ---------------------------------------------------------------------------
// 1. Regenerate the Model union, preserving API order.
// ---------------------------------------------------------------------------
const unionRegex = /export type Model =\n(?:  \| "[^"]+"\n?)+;\n/;
const typeSource = read(MODEL_TYPE_FILE);
if (!unionRegex.test(typeSource)) {
  throw new Error(`Could not find the Model union in ${MODEL_TYPE_FILE}`);
}
const previousIds = [...typeSource.match(unionRegex)[0].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const currentIds = models.map((m) => m.id);
const union = `export type Model =\n${currentIds.map((id) => `  | "${id}"`).join("\n")};\n`;
write(MODEL_TYPE_FILE, typeSource.replace(unionRegex, union));

const added = currentIds.filter((id) => !previousIds.includes(id));
const removed = previousIds.filter((id) => !currentIds.includes(id));

// ---------------------------------------------------------------------------
// 2. Resolve replacements for missing or deprecated models.
// ---------------------------------------------------------------------------

// Model IDs are "<prefix>-<model>", but the prefix is not always the provider
// (e.g. "openai_o1-gpt-5" has provider "openai"). Learn prefix -> provider from
// the API so we can classify IDs the API no longer returns.
const providerByPrefix = new Map(models.map((m) => [m.id.split("-")[0], m.provider]));
const providerOf = (id) => byId.get(id)?.provider ?? providerByPrefix.get(id.split("-")[0]);

// "anthropic-claude-opus-4-8" -> "claude-opus", "google-gemini-2.5-flash-lite" -> "gemini-flash-lite"
const familyOf = (id) =>
  id
    .slice(id.indexOf("-") + 1)
    .toLowerCase()
    .replace(/-reasoning$/, "")
    .replace(/\d+(\.\d+)?/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// "openai-gpt-5.6-luna" -> [5.6], "anthropic-claude-4-5-haiku" -> [4, 5]
const versionOf = (id) => [...id.slice(id.indexOf("-") + 1).matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
const compareVersions = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

function pickLatest(candidates, originalId) {
  const tier = byId.get(originalId)?.requires_better_ai;
  return [...candidates].sort((a, b) => {
    if (tier !== undefined) {
      const tierDiff = Number(b.requires_better_ai === tier) - Number(a.requires_better_ai === tier);
      if (tierDiff) return tierDiff;
    }
    return (
      b.intelligence - a.intelligence ||
      compareVersions(versionOf(b.id), versionOf(a.id)) ||
      b.speed - a.speed ||
      currentIds.indexOf(a.id) - currentIds.indexOf(b.id)
    );
  })[0];
}

// Returns { id, reason } or null when the model is still current.
function resolveReplacement(id) {
  if (isCurrent(id)) return null;

  // Follow the API's own replacement pointer, possibly across several hops.
  let cursor = byId.get(id);
  for (let hops = 0; cursor?.deprecation_replacement_model_id && hops < 5; hops++) {
    const next = cursor.deprecation_replacement_model_id;
    if (isCurrent(next)) return { id: next, reason: "API replacement" };
    cursor = byId.get(next);
  }

  const provider = providerOf(id);
  const family = familyOf(id);
  const fromProvider = models.filter((m) => m.provider === provider && !isDeprecated(m));
  const defaultChat = isCurrent(defaultModels?.chat) ? byId.get(defaultModels.chat) : null;

  // Same family (e.g. opus -> opus, flash -> flash): take the newest one.
  const sameFamily = fromProvider.filter((m) => familyOf(m.id) === family);
  if (sameFamily.length) return { id: pickLatest(sameFamily, id).id, reason: "latest in family" };

  // No successor in the family: prefer the provider's mainstream default over
  // its most capable (and usually slowest, priciest) model.
  if (defaultChat?.provider === provider) return { id: defaultChat.id, reason: "provider default" };
  if (fromProvider.length) return { id: pickLatest(fromProvider, id).id, reason: "latest from provider" };

  if (defaultChat) return { id: defaultChat.id, reason: "API default chat model" };
  return { id: null, reason: "no replacement found" };
}

const remapped = [];
const unresolved = [];
for (const file of CONSUMER_FILES) {
  const content = read(file);
  const counts = new Map();
  for (const [, id] of content.matchAll(/model: "([^"]+)"/g)) {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  let updated = content;
  for (const [id, count] of counts) {
    const replacement = resolveReplacement(id);
    if (!replacement) continue;
    if (!replacement.id) {
      unresolved.push({ file, id, count });
      continue;
    }
    updated = updated.replaceAll(`model: "${id}"`, `model: "${replacement.id}"`);
    remapped.push({ file, from: id, to: replacement.id, reason: replacement.reason, count });
  }
  if (updated !== content) write(file, updated);
}

// ---------------------------------------------------------------------------
// 3. Report.
// ---------------------------------------------------------------------------
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
const list = (ids) => (ids.length ? ids.map((id) => `- \`${id}\``).join("\n") : "_none_");
const remapTable = remapped.length
  ? [
      "| File | From | To | Uses | Reason |",
      "|---|---|---|---|---|",
      ...remapped.map((r) => `| \`${r.file}\` | \`${r.from}\` | \`${r.to}\` | ${r.count} | ${r.reason} |`),
    ].join("\n")
  : "_none_";
const unresolvedList = unresolved.length
  ? unresolved.map((r) => `- \`${r.id}\` in \`${r.file}\` (${plural(r.count, "use")})`).join("\n") +
    "\n\nThese will fail type-check. Reassign them by hand before merging."
  : "_none_";

const report = `## Summary

Synced with ${API_URL} (${currentIds.length} models).

### Added to \`Model\`
${list(added)}

### Removed from \`Model\`
${list(removed)}

### Remapped references
Models that are missing or deprecated were moved to the latest suitable replacement.

${remapTable}

### Needs attention: could not find a replacement
${unresolvedList}
`;

write(REPORT_FILE, report);
console.log(report);
console.log(
  `Changed: ${plural(added.length, "model")} added, ${plural(removed.length, "model")} removed, ${plural(remapped.length, "reference")} remapped, ${plural(unresolved.length, "reference")} unresolved.`,
);
