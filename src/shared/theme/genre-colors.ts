import type { HexColor } from './color-utils'

// Genre colors are fixed per genre regardless of active theme (design handoff decision).
// If per-theme overrides are required, move these into ThemeDefinition.tokens.
export interface GenreStyle {
  bg: HexColor
  spine: HexColor
  text: HexColor
}

export const GENRE_COLORS = {
  Fantasy: { bg: '#4a3068', spine: '#6a4898', text: '#e0d0f0' },
  'Sci-Fi': { bg: '#2a4060', spine: '#3a6090', text: '#c8daf0' },
  Crime: { bg: '#5a2828', spine: '#8a3838', text: '#f0d0d0' },
  Romance: { bg: '#6a3050', spine: '#9a4878', text: '#f0d0e0' },
  Adventure: { bg: '#2a4a30', spine: '#3a7040', text: '#c8e8d0' },
  Horror: { bg: '#1f3838', spine: '#356866', text: '#c8e8e6' },
  Sachbuch: { bg: '#4a3d1a', spine: '#a8842f', text: '#f2e6c2' },
} satisfies Record<string, GenreStyle>

// Canonical genre keys, derived from GENRE_COLORS so alias maps can't drift.
export type GenreKey = keyof typeof GENRE_COLORS

// Neutral cool grey so "uncategorized" reads as deliberately genre-less and stays
// visible against the warm dark-brown shelf background (a warm brown washed out).
export const FALLBACK_GENRE_STYLE: GenreStyle = {
  bg: '#34343a',
  spine: '#6a6a74',
  text: '#dcdce4',
}

export function getGenreStyle(genre: string): GenreStyle {
  return (GENRE_COLORS as Record<string, GenreStyle>)[genre] ?? FALLBACK_GENRE_STYLE
}
