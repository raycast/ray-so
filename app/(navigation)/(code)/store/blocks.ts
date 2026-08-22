import { atom } from "jotai";
import { Base64 } from "js-base64";

export const MAX_CODE_BLOCKS = 4;

export type CodeBlock = {
  id: string;
  title: string;
  languageKey: string | null;
  code: string;
  highlightedLines: number[];
  detectedLanguageKey?: string | null;
};

export type PersistedCodeBlock = {
  id: string;
  title: string;
  languageKey: string | null;
  code: string;
  highlightedLines: number[];
};

export function createBlockId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createEmptyBlock(overrides: Partial<CodeBlock> = {}): CodeBlock {
  return {
    id: createBlockId(),
    title: "",
    languageKey: null,
    code: "",
    highlightedLines: [],
    detectedLanguageKey: null,
    ...overrides,
  };
}

function isSSR() {
  return typeof window === "undefined";
}

function getHashParams() {
  return new URLSearchParams(typeof location !== "undefined" ? location.hash.slice(1) : "");
}

function setHashParams(params: URLSearchParams) {
  const next = params.toString();
  const url = new URL(window.location.href);
  url.hash = next;
  history.replaceState(null, "", url);
}

function decodeCodeParam(value: string | null) {
  if (typeof value !== "string") return null;
  try {
    return Base64.decode(value);
  } catch {
    console.error("decoding code query parameter failed");
    return null;
  }
}

function readLegacyBlockFromHash(): CodeBlock | null {
  const params = getHashParams();
  const code = decodeCodeParam(params.get("code"));
  if (code === null && !params.get("title") && !params.get("language") && !params.get("highlightedLines")) {
    return null;
  }

  const languageKey = params.get("language") || null;
  const title = params.get("title") || "";
  const highlightedLines = (params.get("highlightedLines") || "")
    .split(",")
    .map(Number)
    .filter((n) => !Number.isNaN(n) && n > 0);

  return createEmptyBlock({
    title,
    languageKey: languageKey || null,
    code: code ?? "",
    highlightedLines,
  });
}

function readBlocksFromHash(): CodeBlock[] | null {
  if (isSSR()) return null;

  const params = getHashParams();
  const raw = params.get("blocks");
  if (raw) {
    try {
      const parsed = JSON.parse(Base64.decode(raw)) as PersistedCodeBlock[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, MAX_CODE_BLOCKS).map((block) =>
          createEmptyBlock({
            id: block.id || createBlockId(),
            title: block.title || "",
            languageKey: block.languageKey ?? null,
            code: block.code || "",
            highlightedLines: Array.isArray(block.highlightedLines) ? block.highlightedLines : [],
          }),
        );
      }
    } catch (e) {
      console.error("decoding blocks query parameter failed");
      console.error(e);
    }
  }

  const legacy = readLegacyBlockFromHash();
  return legacy ? [legacy] : null;
}

function persistBlocksToHash(blocks: CodeBlock[]) {
  if (isSSR()) return;

  const params = getHashParams();
  const persisted: PersistedCodeBlock[] = blocks.map(({ id, title, languageKey, code, highlightedLines }) => ({
    id,
    title,
    languageKey,
    code,
    highlightedLines,
  }));

  if (blocks.length > 1) {
    params.set("blocks", Base64.encodeURI(JSON.stringify(persisted)));
  } else {
    params.delete("blocks");
  }

  const primary = blocks[0];
  if (primary) {
    if (primary.code) {
      params.set("code", Base64.encodeURI(primary.code));
    } else {
      params.delete("code");
    }

    if (primary.languageKey) {
      params.set("language", primary.languageKey);
    } else {
      params.delete("language");
    }

    if (primary.title) {
      params.set("title", primary.title);
    } else {
      params.delete("title");
    }

    if (primary.highlightedLines.length > 0) {
      params.set("highlightedLines", primary.highlightedLines.join(","));
    } else {
      params.delete("highlightedLines");
    }
  }

  setHashParams(params);
}

const initialBlocks = readBlocksFromHash();

export const blocksAtom = atom<CodeBlock[]>(initialBlocks ?? [createEmptyBlock()]);

blocksAtom.onMount = (setBlocks) => {
  const fromHash = readBlocksFromHash();
  if (fromHash) {
    setBlocks(fromHash);
  }
};

export const activeBlockIdAtom = atom<string | null>(null);

export const resolvedActiveBlockIdAtom = atom((get) => {
  const blocks = get(blocksAtom);
  const activeId = get(activeBlockIdAtom);
  if (activeId && blocks.some((block) => block.id === activeId)) {
    return activeId;
  }
  return blocks[0]?.id ?? null;
});

export const activeBlockAtom = atom(
  (get) => {
    const blocks = get(blocksAtom);
    const activeId = get(resolvedActiveBlockIdAtom);
    return blocks.find((block) => block.id === activeId) ?? blocks[0];
  },
  (get, set, update: Partial<CodeBlock>) => {
    const activeId = get(resolvedActiveBlockIdAtom);
    if (!activeId) return;

    const next = get(blocksAtom).map((block) => (block.id === activeId ? { ...block, ...update } : block));
    set(blocksAtom, next);
    persistBlocksToHash(next);
  },
);

export const updateBlockAtom = atom(null, (get, set, payload: { blockId: string; update: Partial<CodeBlock> }) => {
  const next = get(blocksAtom).map((block) => (block.id === payload.blockId ? { ...block, ...payload.update } : block));
  set(blocksAtom, next);
  persistBlocksToHash(next);
});

export const setBlocksAndPersistAtom = atom(null, (get, set, next: CodeBlock[]) => {
  const limited = next.slice(0, MAX_CODE_BLOCKS);
  set(blocksAtom, limited);
  if (!limited.some((block) => block.id === get(activeBlockIdAtom))) {
    set(activeBlockIdAtom, limited[0]?.id ?? null);
  }
  persistBlocksToHash(limited);
});

export const addBlockAtom = atom(null, (get, set, seedFirstBlock?: Partial<CodeBlock>) => {
  const blocks = get(blocksAtom);
  if (blocks.length >= MAX_CODE_BLOCKS) return;

  const nextBlock = createEmptyBlock({
    title: "",
    code: "",
  });

  let base = blocks;
  if (seedFirstBlock && blocks[0]) {
    base = [{ ...blocks[0], ...seedFirstBlock }, ...blocks.slice(1)];
  }

  const next = [...base, nextBlock];
  set(blocksAtom, next);
  set(activeBlockIdAtom, nextBlock.id);
  persistBlocksToHash(next);
});

export const removeBlockAtom = atom(null, (get, set, blockId: string) => {
  const blocks = get(blocksAtom);
  if (blocks.length <= 1) return;

  const index = blocks.findIndex((block) => block.id === blockId);
  const next = blocks.filter((block) => block.id !== blockId);
  set(blocksAtom, next);

  if (get(activeBlockIdAtom) === blockId) {
    const fallback = next[Math.max(0, index - 1)] ?? next[0];
    set(activeBlockIdAtom, fallback?.id ?? null);
  }

  persistBlocksToHash(next);
});

export const totalCodeAtom = atom((get) =>
  get(blocksAtom)
    .map((block) => block.code)
    .join("\n"),
);
