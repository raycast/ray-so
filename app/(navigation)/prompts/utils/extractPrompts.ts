export function extractPrompts<T>(els: Element[], categories: { slug: string; prompts: T[] }[]) {
  const ids = els.map((v) => v.getAttribute("data-key"));

  const prompts = ids
    .map((id) => {
      if (!id) {
        return;
      }
      const [slug, index] = id?.split("-") ?? [];
      const category = categories.find((category) => category.slug === slug);

      return category?.prompts[parseInt(index)];
    })
    .filter(Boolean);

  return prompts;
}
