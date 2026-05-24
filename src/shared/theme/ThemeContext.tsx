import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
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

function camelToKebab(input: string): string {
  return input.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

function applyTokensToRoot(tokens: ThemeTokens): void {
  const root = document.documentElement
  for (const key of Object.keys(tokens) as Array<keyof ThemeTokens>) {
    if (key === 'name') continue
    root.style.setProperty(`--${camelToKebab(key)}`, tokens[key])
  }
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(() => readStoredTheme())

  const tokens = THEMES[theme]

  useEffect(() => {
    applyTokensToRoot(tokens)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, tokens])

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, tokens, setTheme }),
    [theme, tokens, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

