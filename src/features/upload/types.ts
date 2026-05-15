export interface ParsedBook {
  asin: string
  title: string
  authors: string
  parentCategory: string
  myRating: string
}

export type AppField = 'asin' | 'title' | 'authors' | 'parentCategory' | 'myRating'

export type ColumnMapping = Record<AppField, string>

export const APP_FIELDS: AppField[] = ['asin', 'title', 'authors', 'parentCategory', 'myRating']

export const STANDARD_HEADERS: Record<AppField, string> = {
  asin: 'ASIN',
  title: 'Title',
  authors: 'Authors',
  parentCategory: 'Parent Category',
  myRating: 'My Rating',
}
