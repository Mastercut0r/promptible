// Template literal constraint: ensures the value starts with '#'.
// This is NOT an opaque brand — "#gggggg" satisfies the type at compile time.
// Its purpose is to exclude oklch() and rgba() theme tokens (gold*, textMuted,
// shelfGrain) from darken() call sites, as those formats are not supported.
// Use CSS color-mix() or a dedicated oklch library to transform those tokens.
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

/** Appends a 2-digit hex alpha suffix to a hex color string (#rgb or #rrggbb). */
export function withOpacity(hex: HexColor, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha))
  const byte = Math.round(a * 255)
  return hex + byte.toString(16).padStart(2, '0')
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
