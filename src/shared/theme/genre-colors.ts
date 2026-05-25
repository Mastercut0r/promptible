export interface GenreStyle {
  bg: string
  spine: string
  text: string
}

export const GENRE_COLORS: Record<string, GenreStyle> = {
  Fantasy: { bg: '#4a3068', spine: '#6a4898', text: '#e0d0f0' },
  'Sci-Fi': { bg: '#2a4060', spine: '#3a6090', text: '#c8daf0' },
  Crime: { bg: '#5a2828', spine: '#8a3838', text: '#f0d0d0' },
  Romance: { bg: '#6a3050', spine: '#9a4878', text: '#f0d0e0' },
  Adventure: { bg: '#2a4a30', spine: '#3a7040', text: '#c8e8d0' },
}

export const FALLBACK_GENRE_STYLE: GenreStyle = {
  bg: '#4a3a28',
  spine: '#6a5a40',
  text: '#e8dcc8',
}

export function getGenreStyle(genre: string): GenreStyle {
  return GENRE_COLORS[genre] ?? FALLBACK_GENRE_STYLE
}
