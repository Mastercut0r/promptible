export interface ParsedBook {
  asin: string
  title: string
  authors: string
  genre: string
  myRating: string
}

export type AppField = 'asin' | 'title' | 'authors' | 'genre' | 'myRating'

export type ColumnMapping = Record<AppField, string>

export const APP_FIELDS: AppField[] = ['asin', 'title', 'authors', 'genre', 'myRating']

// Audible's "Tags" column holds the genre vocabulary GENRE_ALIASES matches
// (e.g. "Science Fiction", "Fantasy"). The breadcrumb "Parent Category" column
// is always "Startseite", so it must not be used as the genre source.
export const STANDARD_HEADERS: Record<AppField, string> = {
  asin: 'ASIN',
  title: 'Title',
  authors: 'Authors',
  genre: 'Tags',
  myRating: 'My Rating',
}
