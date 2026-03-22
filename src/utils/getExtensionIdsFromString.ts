export const getExtensionIdsFromString = (text: string): string[] => {
  return text.match(/\{id=([^}]+)\}/g)?.map((match) => match.replace(/\{id=/, "").replace(/\}/, "")) ?? [];
};
