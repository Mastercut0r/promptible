import i18n from '../../i18n'

export function normalizeGenre(raw: string | null | undefined): string {
  const trimmed = raw?.trim()
  if (!trimmed) return i18n.t('genre.uncategorized')
  return trimmed
}
