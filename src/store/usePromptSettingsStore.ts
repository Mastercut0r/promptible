import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UNCATEGORIZED_GENRE } from '../shared/utils/genreUtils'

export type PromptLanguage = 'EN' | 'DE'

// Historical (v0/v1) value for the uncategorized bucket: the localized label that
// normalizeGenre used to return. Pinned as a literal because migrations operate on
// past data shapes, not the current translation. DE was the only/default locale.
const LEGACY_UNCATEGORIZED_LABEL = 'Nicht zugeordnet'

interface PromptSettingsState {
  promptLanguage: PromptLanguage
  selectedGenres: string[] | null
  setPromptLanguage: (lang: PromptLanguage) => void
  setSelectedGenres: (genres: string[] | null) => void
  pruneGenres: (validGenres: string[]) => void
}

export const usePromptSettingsStore = create<PromptSettingsState>()(
  persist(
    (set) => ({
      promptLanguage: 'DE',
      selectedGenres: null,
      setPromptLanguage: (lang) => set({ promptLanguage: lang }),
      setSelectedGenres: (genres) => set({ selectedGenres: genres }),
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
      version: 2,
      // v2 aligns persisted genre filters with the stable UNCATEGORIZED_GENRE key
      // (useLibraryStore v1). Map the old localized label so a previously-active
      // "uncategorized" filter is preserved instead of being silently pruned.
      migrate: (persisted, version) => {
        const state = persisted as PromptSettingsState
        if (version < 2 && state.selectedGenres) {
          return {
            ...state,
            selectedGenres: state.selectedGenres.map((g) =>
              g === LEGACY_UNCATEGORIZED_LABEL ? UNCATEGORIZED_GENRE : g
            ),
          }
        }
        return state
      },
    }
  )
)
