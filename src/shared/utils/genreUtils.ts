import type { TFunction } from 'i18next'
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

// Language-independent key for books with no recognised genre. Stored/persisted and
// compared as-is; localised only for display via genreLabel(). Keeping it a constant
// (rather than the localised "Nicht zugeordnet") means stored genre keys stay stable
// across locales — see #24.
export const UNCATEGORIZED_GENRE = '__uncategorized__'

/**
 * @internal Write boundary only — call at import time and in persist migrations.
 * Display code must read the already-canonical `Book.genre` and localize via `genreLabel`.
 */
export function normalizeGenre(raw: string | null | undefined): string {
  const trimmed = raw?.trim()
  if (!trimmed) return UNCATEGORIZED_GENRE

  const lower = trimmed.toLowerCase()
  const match = GENRE_ALIASES.find(([substring]) => lower.includes(substring))
  // No alias match: bucket as "uncategorized" rather than surfacing the raw,
  // comma-joined tag list, which would render as a verbose one-off filter chip.
  return match ? match[1] : UNCATEGORIZED_GENRE
}

// Maps a canonical genre key to its display label. Known genre keys (e.g. "Sci-Fi")
// are shown verbatim; only the uncategorized bucket is localised.
export function genreLabel(genre: string, t: TFunction): string {
  return genre === UNCATEGORIZED_GENRE ? t('genre.uncategorized') : genre
}
