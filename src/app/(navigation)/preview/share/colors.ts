export const COLORS = [
  {
    text: 'Default',
    colors: ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
  },
  {
    text: 'Amethyst',
    colors: ['#4f5bd5', '#962fbf', '#dd6cb9', '#fec496'],
  },
  {
    text: 'Calico',
    colors: ['#baa161', '#ddb56d', '#cea668', '#faf4d2'],
  },
  {
    text: 'Cavern Pink',
    colors: ['#ecd893', '#e5a1d0', '#edd594', '#d1a3e2'],
  },
  {
    text: 'Cheerfulness',
    colors: ['#efd359', '#e984d8', '#ac86ed', '#40cdde'],
  },
  {
    text: 'France',
    colors: ['#fbd9e6', '#fb9ae5', '#d5f7ff', '#73caff'],
  },
  {
    text: 'Light Wisteria',
    colors: ['#b493e6', '#eab9d9', '#8376c2', '#e4b2ea'],
  },
  {
    text: 'Malibu',
    colors: ['#679ced', '#e39fea', '#888dec', '#8adbf2'],
  },
  {
    text: 'Monte Carlo',
    colors: ['#85d685', '#67a3f2', '#8fe1d6', '#dceb92'],
  },
  {
    text: 'Perfume',
    colors: ['#b9e2ff', '#eccbff', '#a2b4ff', '#daeacb'],
  },
  {
    text: 'Periwinkle Gray',
    colors: ['#efb7dc', '#c6b1ef', '#b1e9ea', '#97beeb'],
  },
  {
    text: 'Pine Glade',
    colors: ['#fbe37d', '#336f55', '#fff5c5', '#7fa381'],
  },
  {
    text: 'Ice',
    colors: ['#b2e3dd', '#bbead5', '#9fb0ea', '#b0cdeb'],
  },
  {
    text: 'Viola',
    colors: ['#f7dd6d', '#e96caf', '#edac4c', '#a464f4'],
  },
  {
    text: 'Wewak',
    colors: ['#e8c06e', '#f29ebf', '#f0e486', '#eaa36e'],
  },
  {
    text: 'Wild Willow',
    colors: ['#f0c07a', '#afd677', '#e4d573', '#7fc289'],
  },
  {
    text: 'Cashmere',
    colors: ['#ffe7b2', '#e2c0ff', '#ffc3b2'],
  },
  {
    text: 'Cold Purple',
    colors: ['#6c8cd4', '#d4a7c9', '#b2b1ee'],
  },
  {
    text: 'Cold Blue',
    colors: ['#527bdd', '#009fdd', '#a4dbff'],
  },
];

export function arrayColorToObject(colors: string[]) {
  return Object.values(colors).map((color, key) => ({ [key]: color }));
}

/**
 * Generate random colors
 * @param length - number of colors
 * @returns array of random colors
 */
export function generateRandomColors(length = 4): string[] {
  return Array.from({ length }, () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    );
  });
}
