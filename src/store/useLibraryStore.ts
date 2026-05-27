import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'
import type { Book, AppRating } from '../shared/types'
import type { ParsedBook } from '../features/upload/types'
import { normalizeGenre } from '../shared/utils/genreUtils'

const AUDIBLE_RATING_MAP: Record<number, AppRating> = {
  1: 'DISLIKED',
  2: 'DISLIKED',
  3: 'NEUTRAL',
  4: 'LOVED',
  5: 'LOVED',
}

interface LibraryState {
  books: Book[]
  importBooks: (newBooks: ParsedBook[], autoConvert: boolean) => void
  setRating: (bookId: string, rating: AppRating) => void
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      books: [],
      importBooks: (newBooks, autoConvert) => {
        set((state) => {
          const ratingsByAsin = new Map<string, AppRating>()
          const ratingsByKey = new Map<string, AppRating>()
          for (const book of state.books) {
            if (book.rating !== 'UNRATED') {
              ratingsByAsin.set(book.id, book.rating)
              ratingsByKey.set(book.title + '\0' + book.author, book.rating)
            }
          }

          const books = newBooks.map((parsed) => {
            const id = parsed.asin || crypto.randomUUID()
            const preserved =
              (parsed.asin && ratingsByAsin.get(parsed.asin)) ||
              ratingsByKey.get(parsed.title + '\0' + parsed.authors)

            let rating: AppRating
            if (preserved) {
              rating = preserved
            } else if (autoConvert) {
              const stars = parseInt(parsed.myRating, 10)
              rating = AUDIBLE_RATING_MAP[stars] ?? 'UNRATED'
            } else {
              rating = 'UNRATED'
            }

            return {
              id,
              title: parsed.title,
              author: parsed.authors,
              genre: parsed.parentCategory,
              rating,
            }
          })

          return { books }
        })
      },
      setRating: (bookId, rating) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === bookId ? { ...book, rating } : book
          ),
        }))
      },
    }),
    { name: 'promptible-library' }
  )
)

export function useUniqueGenres(): string[] {
  return useLibraryStore(
    useShallow((state) => {
      const genres = state.books.map((b) => normalizeGenre(b.genre))
      return [...new Set(genres)].sort((a, b) => a.localeCompare(b))
    })
  )
}
