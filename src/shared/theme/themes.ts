// Color format note: token values are taken 1:1 from the design handoff.
// Solid colors use hex (#rrggbb), wide-gamut accents use oklch(), and
// alpha-transparent surfaces use rgba(). Standardizing formats would
// require design changes — do not convert without updating the handoff.

export const THEME_NAMES = ['antique', 'midnight', 'enchanted'] as const

export type ThemeName = (typeof THEME_NAMES)[number]

export interface ThemeTokens {
  bgDeep: string
  bgWarm: string
  bgShelf: string
  bgShelfDark: string
  parchment: string
  parchmentDark: string
  gold: string
  goldLight: string
  goldDark: string
  ink: string
  textLight: string
  textMuted: string
  shelfGrain: string
  coverColor: string
  coverAccent: string
}

// ThemeDefinition separates the human-readable display name from the CSS tokens
// so that display labels never leak into CSS custom properties.
export interface ThemeDefinition {
  displayName: string
  tokens: ThemeTokens
}

export const THEMES: Record<ThemeName, ThemeDefinition> = {
  antique: {
    displayName: 'Antique Scholar',
    tokens: {
      bgDeep: '#1a1410',
      bgWarm: '#2a1f14',
      bgShelf: '#5c3d2a',
      bgShelfDark: '#3a2518',
      parchment: '#e8dcc8',
      parchmentDark: '#d4c4a8',
      gold: 'oklch(0.72 0.12 85)',
      goldLight: 'oklch(0.82 0.10 85)',
      goldDark: 'oklch(0.55 0.12 85)',
      ink: '#1e1814',
      textLight: '#e8dcc8',
      textMuted: 'rgba(232,220,200,0.5)',
      shelfGrain: 'rgba(90,55,30,0.15)',
      coverColor: '#4a2e1a',
      coverAccent: '#8b6e4e',
    },
  },
  midnight: {
    displayName: 'Midnight Scribe',
    tokens: {
      bgDeep: '#0c0d16',
      bgWarm: '#151728',
      bgShelf: '#2a2d52',
      bgShelfDark: '#1a1c38',
      parchment: '#d5d2e0',
      parchmentDark: '#b5b2c8',
      gold: 'oklch(0.72 0.08 250)',
      goldLight: 'oklch(0.82 0.06 250)',
      goldDark: 'oklch(0.55 0.10 250)',
      ink: '#12121e',
      textLight: '#d5d2e0',
      textMuted: 'rgba(213,210,224,0.5)',
      shelfGrain: 'rgba(60,60,100,0.15)',
      coverColor: '#1e2048',
      coverAccent: '#5a5e90',
    },
  },
  enchanted: {
    displayName: 'Enchanted Archive',
    tokens: {
      bgDeep: '#0e1610',
      bgWarm: '#182418',
      bgShelf: '#2e4a30',
      bgShelfDark: '#1e3220',
      parchment: '#dddcc0',
      parchmentDark: '#c4c2a0',
      gold: 'oklch(0.65 0.14 155)',
      goldLight: 'oklch(0.78 0.10 155)',
      goldDark: 'oklch(0.48 0.12 155)',
      ink: '#101810',
      textLight: '#dddcc0',
      textMuted: 'rgba(220,218,192,0.5)',
      shelfGrain: 'rgba(50,80,50,0.15)',
      coverColor: '#1e3a20',
      coverAccent: '#5a8a50',
    },
  },
}

export const DEFAULT_THEME: ThemeName = 'antique'

export function isThemeName(value: unknown): value is ThemeName {
  return THEME_NAMES.includes(value as ThemeName)
}
