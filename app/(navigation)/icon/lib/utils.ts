export const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .toUpperCase();

export function randomElement<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const randomNumberBetween = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export function uniq<T>(arr: T[]): T[] {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
}

let debounceTimer: NodeJS.Timeout | null = null;

export const debounce =
  (fn: Function, delay = 300) =>
  (...args: any[]) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      fn(...args);
    }, delay);
  };

export const getPastedSvgFile = async (items: DataTransferItemList | never[]): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          if (file.name.endsWith(".svg")) {
            resolve(file.text());
          } else if (file.name.endsWith(".png")) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          } else {
            reject("We don't support that file format. Try dropping an .SVG or .PNG file instead.");
          }
        }
      }
      if (item.kind === "string") {
        item.getAsString((content: string) => {
          if (content.match(/svg/)) {
            resolve(content);
          } else {
            reject("Pasted string is not an SVG");
          }
        });
      }
    }
  });
