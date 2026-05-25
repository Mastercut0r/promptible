// Branded type to make it explicit that darken() only accepts hex strings.
// Theme tokens that use oklch() or rgba() (gold*, textMuted, shelfGrain) are
// intentionally excluded — passing them would silently return the original value.
// Use CSS color-mix() or a dedicated oklch library if you need to transform those.
export type HexColor = `#${string}`

function clampByte(value: number): number {
  if (value < 0) return 0
  if (value > 255) return 255
  return Math.round(value)
}

function toHexByte(value: number): string {
  return clampByte(value).toString(16).padStart(2, '0')
}

function parseHex(hex: HexColor): { r: number; g: number; b: number } | null {
  const trimmed = hex.replace(/^#/, '')
  const normalized =
    trimmed.length === 3
      ? trimmed
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : trimmed

  if (normalized.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null
  }

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

/**
 * Darkens a hex color by the given factor (0–1, where 0.1 = 10% darker).
 * Only accepts hex strings (#rgb or #rrggbb). Non-hex values are rejected
 * at compile time via the HexColor branded type.
 */
export function darken(hex: HexColor, amount: number): HexColor {
  const rgb = parseHex(hex)
  if (!rgb) return hex

  const factor = 1 - Math.max(0, Math.min(1, amount))
  return `#${toHexByte(rgb.r * factor)}${toHexByte(rgb.g * factor)}${toHexByte(rgb.b * factor)}`
}
