import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { camelToKebab } from '../utils/string'
import { DEFAULT_THEME, isThemeName, THEMES, type ThemeName, type ThemeTokens } from './themes'

const STORAGE_KEY = 'promptible.theme'

export interface ThemeContextValue {
  theme: ThemeName
  tokens: ThemeTokens
  setTheme: (theme: ThemeName) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): ThemeName {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isThemeName(stored) ? stored : DEFAULT_THEME
}

function applyTokensToRoot(tokens: ThemeTokens): void {
  const root = document.documentElement
  for (const key of Object.keys(tokens) as Array<keyof ThemeTokens>) {
    root.style.setProperty(`--${camelToKebab(key)}`, tokens[key])
  }
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const initial = readStoredTheme()
    // Apply tokens synchronously before first render to prevent FOUC.
    applyTokensToRoot(THEMES[initial].tokens)
    return initial
  })

  const tokens = THEMES[theme].tokens

  useEffect(() => {
    applyTokensToRoot(tokens)
    window.localStorage.setItem(STORAGE_KEY, theme)
    // `tokens` is always THEMES[theme].tokens — it has no independent lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, tokens, setTheme }),
    [theme, tokens, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
