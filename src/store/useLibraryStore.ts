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
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      books: [],
      importBooks: (newBooks, autoConvert) => {
        set((state) => {
          const merged = [...state.books]

          for (const parsed of newBooks) {
            const existingIdx = merged.findIndex((b) => {
              if (parsed.asin) return b.id === parsed.asin
              return b.title === parsed.title && b.author === parsed.authors
            })

            let incomingRating: AppRating = 'UNRATED'
            if (autoConvert) {
              const stars = parseInt(parsed.myRating, 10)
              incomingRating = AUDIBLE_RATING_MAP[stars] ?? 'UNRATED'
            }

            if (existingIdx >= 0) {
              const existing = merged[existingIdx]
              merged[existingIdx] = {
                ...existing,
                title: parsed.title,
                author: parsed.authors,
                genre: parsed.parentCategory,
                // Preserve existing user rating if already set
                rating: existing.rating !== 'UNRATED' ? existing.rating : incomingRating,
              }
            } else {
              merged.push({
                id: parsed.asin || crypto.randomUUID(),
                title: parsed.title,
                author: parsed.authors,
                genre: parsed.parentCategory,
                rating: incomingRating,
              })
            }
          }

          return { books: merged }
        })
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
