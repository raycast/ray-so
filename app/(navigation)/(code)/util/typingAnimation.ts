export const FINAL_HOLD_DURATION_SECONDS = 0.75;

export function getTypingCharacters(code: string) {
  if (typeof Intl.Segmenter === "function") {
    return Array.from(
      new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(code),
      ({ segment }) => segment,
    );
  }

  return Array.from(code);
}

export function getVisibleCharacterCount(characterCount: number, progress: number | null) {
  if (progress === null) {
    return characterCount;
  }

  if (characterCount === 0) {
    return 0;
  }

  return Math.max(0, Math.min(characterCount, Math.floor(progress * characterCount)));
}

export function getVisibleCode(code: string, progress: number | null) {
  if (progress === null) {
    return code;
  }

  const characters = getTypingCharacters(code);

  if (characters.length === 0) {
    return "";
  }

  const visibleCharacterCount = getVisibleCharacterCount(characters.length, progress);

  return characters.slice(0, visibleCharacterCount).join("");
}

export function getTypingRenderStateKey(characterCount: number, progress: number | null, showCursor: boolean) {
  const visibleCharacterCount = getVisibleCharacterCount(characterCount, progress);
  const cursorVisible = progress !== null && showCursor && progress < 1;

  return `${visibleCharacterCount}:${cursorVisible ? 1 : 0}`;
}
