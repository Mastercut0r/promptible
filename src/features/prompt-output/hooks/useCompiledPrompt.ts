import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useLibraryStore } from '../../../store/useLibraryStore'
import { usePromptSettingsStore } from '../../../store/usePromptSettingsStore'
import { filterBooksForPrompt } from '../utils/filterBooksForPrompt'
import { compilePrompt } from '../utils/compilePrompt'

export function useCompiledPrompt(): { prompt: string; bookCount: number } {
  const books = useLibraryStore((state) => state.books)
  const { promptLanguage, selectedGenres } = usePromptSettingsStore(
    useShallow((s) => ({ promptLanguage: s.promptLanguage, selectedGenres: s.selectedGenres }))
  )

  return useMemo(() => {
    const filtered = filterBooksForPrompt(books, selectedGenres)
    return {
      prompt: compilePrompt(filtered, promptLanguage),
      bookCount: filtered.length,
    }
  }, [books, selectedGenres, promptLanguage])
}
