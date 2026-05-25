/**
 * Converts a camelCase string to kebab-case.
 * e.g. "bgDeep" → "bg-deep", "goldLight" → "gold-light"
 */
export function camelToKebab(input: string): string {
  return input.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}
