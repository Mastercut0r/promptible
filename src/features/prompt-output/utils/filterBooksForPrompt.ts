import type { Book, RatedBook } from '../../../shared/types'
import { normalizeGenre } from '../../../shared/utils/genreUtils'

export function filterBooksForPrompt(
  books: Book[],
  selectedGenres: string[] | null
): RatedBook[] {
  const genreSet = selectedGenres !== null ? new Set(selectedGenres) : null

  return books.filter((book): book is RatedBook => {
    if (book.rating === 'UNRATED') return false
    if (genreSet !== null && !genreSet.has(normalizeGenre(book.genre))) return false
    return true
  })
}
