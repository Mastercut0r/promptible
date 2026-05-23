import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PromptLanguage = 'EN' | 'DE'

interface PromptSettingsState {
  promptLanguage: PromptLanguage
  selectedGenres: string[] | null
  showOutput: boolean
  setPromptLanguage: (lang: PromptLanguage) => void
  setSelectedGenres: (genres: string[] | null) => void
  setShowOutput: (show: boolean) => void
  pruneGenres: (validGenres: string[]) => void
}

export const usePromptSettingsStore = create<PromptSettingsState>()(
  persist(
    (set) => ({
      promptLanguage: 'DE',
      selectedGenres: null,
      showOutput: false,
      setPromptLanguage: (lang) => set({ promptLanguage: lang }),
      setSelectedGenres: (genres) => set({ selectedGenres: genres }),
      setShowOutput: (show) => set({ showOutput: show }),
      pruneGenres: (validGenres) =>
        set((state) => {
          if (state.selectedGenres === null) return state
          const pruned = state.selectedGenres.filter((g) => validGenres.includes(g))
          if (pruned.length === 0 || pruned.length === validGenres.length) {
            return { selectedGenres: null }
          }
          return { selectedGenres: pruned }
        }),
    }),
    {
      name: 'promptible-prompt-settings',
      version: 1,
      migrate: (persistedState) => persistedState as PromptSettingsState,
      partialize: (state) => ({
        promptLanguage: state.promptLanguage,
        selectedGenres: state.selectedGenres,
      }),
    }
  )
)
