import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'
import type { Book, AppRating } from '../shared/types'
import type { ParsedBook } from '../features/upload/types'
import { normalizeGenre, UNCATEGORIZED_GENRE } from '../shared/utils/genreUtils'

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
          const ratingsByTitleAuthor = new Map<string, AppRating>()
          for (const book of state.books) {
            if (book.rating !== 'UNRATED') {
              ratingsByAsin.set(book.id, book.rating)
              // '\0' can't appear in CSV text, preventing title+author collisions
              ratingsByTitleAuthor.set(book.title + '\0' + book.author, book.rating)
            }
          }

          const books = newBooks.map((parsed) => {
            const id = parsed.asin || crypto.randomUUID()
            const preserved =
              (parsed.asin ? ratingsByAsin.get(parsed.asin) : undefined) ??
              ratingsByTitleAuthor.get(parsed.title + '\0' + parsed.authors)

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
              // Normalize once here so Book.genre holds the canonical genre key;
              // display sites read it directly instead of re-running the alias loop.
              genre: normalizeGenre(parsed.genre),
              author: parsed.authors,
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
    {
      name: 'promptible-library',
      version: 1,
      // v0 persisted Book.genre as the raw, comma-joined Audible tag list; v1 stores
      // the canonical genre key. Normalize existing entries on rehydrate so old
      // libraries don't render raw tag blobs. Idempotent (normalizeGenre of a
      // canonical key returns it unchanged), so re-running is harmless.
      migrate: (persisted, version) => {
        const state = persisted as { books?: Book[] }
        if (version < 1 && Array.isArray(state.books)) {
          return {
            ...state,
            books: state.books.map((b) => ({ ...b, genre: normalizeGenre(b.genre) })),
          } as LibraryState
        }
        return state as LibraryState
      },
    }
  )
)

export function useUniqueGenres(): string[] {
  return useLibraryStore(
    useShallow((state) => {
      // Book.genre is already canonical (normalized at import); just dedupe + sort.
      const genres = [...new Set(state.books.map((b) => b.genre))]
      return genres.sort((a, b) => {
        // Keep the catch-all "uncategorized" bucket last regardless of locale.
        if (a === UNCATEGORIZED_GENRE) return 1
        if (b === UNCATEGORIZED_GENRE) return -1
        return a.localeCompare(b)
      })
    })
  )
}
