export type AppRating = 'LOVED' | 'NEUTRAL' | 'DISLIKED' | 'UNRATED'

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: AppRating
}
