import type { Book, RatedBook } from '../../../shared/types'

export function filterBooksForPrompt(
  books: Book[],
  selectedGenres: string[] | null
): RatedBook[] {
  const genreSet = selectedGenres !== null ? new Set(selectedGenres) : null

  return books.filter((book): book is RatedBook => {
    if (book.rating === 'UNRATED') return false
    if (genreSet !== null && !genreSet.has(book.genre)) return false
    return true
  })
}
