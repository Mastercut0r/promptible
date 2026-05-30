import i18n from '../../i18n'
import type { GenreKey } from '../theme'

// Maps raw CSV "Tags" values to the canonical GENRE_COLORS keys. Tags arrive as a
// comma-joined list (e.g. "Belletristik, Science Fiction, Space Opera"), matched here
// by substring.
// Ordered: the first substring contained in the lowercased genre wins, so more
// specific patterns must precede broader ones (e.g. "science fiction" before
// "fantasy" so a "Fantasy, Science Fiction" tag list resolves to Sci-Fi).
// GenreKey ties the canonical values to GENRE_COLORS — a stale key is a compile error.
const GENRE_ALIASES: ReadonlyArray<readonly [substring: string, canonical: GenreKey]> = [
  ['science fiction', 'Sci-Fi'],
  ['sci-fi', 'Sci-Fi'],
  ['fantasy', 'Fantasy'],
  ['krimi', 'Crime'],
  ['thriller', 'Crime'],
  ['mystery', 'Crime'],
  ['crime', 'Crime'],
  ['liebes', 'Romance'],
  ['romantik', 'Romance'],
  ['romance', 'Romance'],
  ['abenteuer', 'Adventure'],
  ['adventure', 'Adventure'],
  ['horror', 'Horror'],
  // Non-fiction tags collapse into one "Sachbuch" bucket instead of each raw tag
  // list becoming its own chip. Placed last so fiction (matched above by
  // "science fiction"/"fantasy") wins even when its tags also include
  // "Naturwissenschaften" (which contains "wissenschaft").
  ['wissenschaft', 'Sachbuch'],
  ['politik', 'Sachbuch'],
  ['sachbuch', 'Sachbuch'],
]

export function normalizeGenre(raw: string | null | undefined): string {
  const trimmed = raw?.trim()
  if (!trimmed) return i18n.t('genre.uncategorized')

  const lower = trimmed.toLowerCase()
  const match = GENRE_ALIASES.find(([substring]) => lower.includes(substring))
  return match ? match[1] : trimmed
}
