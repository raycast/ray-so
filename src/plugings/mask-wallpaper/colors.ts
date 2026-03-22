// https://github.com/zero-dependency/utils/blob/master/src/hex.ts

export interface Rgb {
  r: number
  g: number
  b: number
}

/**
 * Convert hex color string to rgb color object
 * @param hex hex color string
 * @returns rgb color object
 */
export function hexToRgb(hex: string): Rgb | null {
  const result = isHexColor(hex)

  // prettier-ignore
  return result ? {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16)
  } : null
}

/**
 * Check if hex color string is valid
 * @param hex hex color string
 * @returns `RegExpExecArray` if hex is valid, `null` otherwise
 */
function isHexColor(hex: string): RegExpExecArray | null {
  if (hex.length === 4) {
    hex = `${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
}
