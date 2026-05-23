import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PromptLanguage = 'EN' | 'DE'

interface PromptSettingsState {
  promptLanguage: PromptLanguage
  selectedGenres: string[] | null
  setPromptLanguage: (lang: PromptLanguage) => void
  setSelectedGenres: (genres: string[] | null) => void
}

export const usePromptSettingsStore = create<PromptSettingsState>()(
  persist(
    (set) => ({
      promptLanguage: 'DE',
      selectedGenres: null,
      setPromptLanguage: (lang) => set({ promptLanguage: lang }),
      setSelectedGenres: (genres) => set({ selectedGenres: genres }),
    }),
    { name: 'promptible-prompt-settings' }
  )
)
