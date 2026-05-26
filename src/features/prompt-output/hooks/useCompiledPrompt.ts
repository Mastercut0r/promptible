import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useLibraryStore } from '../../../store/useLibraryStore'
import { usePromptSettingsStore } from '../../../store/usePromptSettingsStore'
import { filterBooksForPrompt } from '../utils/filterBooksForPrompt'
import { compilePrompt } from '../utils/compilePrompt'
import { normalizeGenre } from '../../../shared/utils/genreUtils'

interface CompiledPromptResult {
  prompt: string
  bookCount: number
  genreNames: string[]
}

export function useCompiledPrompt(): CompiledPromptResult {
  const books = useLibraryStore((state) => state.books)
  const { promptLanguage, selectedGenres } = usePromptSettingsStore(
    useShallow((s) => ({ promptLanguage: s.promptLanguage, selectedGenres: s.selectedGenres }))
  )

  return useMemo(() => {
    const filtered = filterBooksForPrompt(books, selectedGenres)
    const genreNames = [...new Set(filtered.map((b) => normalizeGenre(b.genre)))].sort()
    return {
      prompt: compilePrompt(filtered, promptLanguage),
      bookCount: filtered.length,
      genreNames,
    }
  }, [books, selectedGenres, promptLanguage])
}
