export type AppRating = 'DISLIKED' | 'NEUTRAL' | 'LOVED' | 'UNRATED'

export type View = 'import' | 'library' | 'prompt'

export type RatedAppRating = Exclude<AppRating, 'UNRATED'>

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: AppRating
}

export interface RatedBook extends Omit<Book, 'rating'> {
  rating: RatedAppRating
}
