import { useMemo } from 'react'
import { useLibraryStore } from '../../../store/useLibraryStore'
import { usePromptSettingsStore } from '../../../store/usePromptSettingsStore'
import { filterBooksForPrompt } from '../utils/filterBooksForPrompt'
import { compilePrompt } from '../utils/compilePrompt'

export function useCompiledPrompt(): { prompt: string; bookCount: number } {
  const books = useLibraryStore((state) => state.books)
  const promptLanguage = usePromptSettingsStore((state) => state.promptLanguage)
  const selectedGenres = usePromptSettingsStore((state) => state.selectedGenres)

  return useMemo(() => {
    const filtered = filterBooksForPrompt(books, selectedGenres)
    return {
      prompt: compilePrompt(filtered, promptLanguage),
      bookCount: filtered.length,
    }
  }, [books, selectedGenres, promptLanguage])
}
