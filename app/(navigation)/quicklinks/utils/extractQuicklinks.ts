export function extractQuicklinks<T>(els: Element[], categories: { slug: string; quicklinks: T[] }[]) {
  const ids = els.map((v) => v.getAttribute("data-key"));

  const quicklinks = ids
    .map((id) => {
      if (!id) {
        return;
      }
      const [slug, index] = id?.split("-") ?? [];
      const category = categories.find((category) => category.slug === slug);

      return category?.quicklinks[parseInt(index)];
    })
    .filter(Boolean);

  return quicklinks;
}
