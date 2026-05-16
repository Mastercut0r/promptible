export type AppRating = 'DISLIKED' | 'NEUTRAL' | 'LOVED' | 'UNRATED'

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: AppRating
}
