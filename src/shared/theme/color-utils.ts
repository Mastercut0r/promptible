function clampByte(value: number): number {
  if (value < 0) return 0
  if (value > 255) return 255
  return Math.round(value)
}

function toHexByte(value: number): string {
  return clampByte(value).toString(16).padStart(2, '0')
}

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const trimmed = hex.trim().replace(/^#/, '')
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

export function darken(hex: string, amount: number): string {
  const rgb = parseHex(hex)
  if (!rgb) return hex

  const factor = 1 - Math.max(0, Math.min(1, amount))
  return `#${toHexByte(rgb.r * factor)}${toHexByte(rgb.g * factor)}${toHexByte(rgb.b * factor)}`
}
