/**
 * Converts a camelCase string to kebab-case.
 * e.g. "bgDeep" → "bg-deep", "goldLight" → "gold-light"
 */
export function camelToKebab(input: string): string {
  return input.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

// 32 chars fits the 3.75rem spine width at 0.9rem/600 weight — adjust with .spine width
export const MAX_SPINE_CHARS = 32

/**
 * Shortens a book title so it fits on a single-line book spine.
 * Trims trailing whitespace/punctuation (including unicode en/em dashes)
 * before appending an ellipsis. The full title stays visible in the CoverCard.
 */
export function truncateTitle(title: string): string {
  return title.length > MAX_SPINE_CHARS
    ? title.slice(0, MAX_SPINE_CHARS).replace(/[\s:,–—-]+$/, '') + '…'
    : title
}
