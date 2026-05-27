import { useCallback, useEffect, useState } from 'react'

export type RevealPhase = 'waiting' | 'turning' | 'revealed'

const SETTINGS_PAGES = 1
export const DECORATIVE_PAGES = 4
export const TOTAL_PAGES = SETTINGS_PAGES + DECORATIVE_PAGES
const PAGE_INTERVAL = 550

export function useBookRevealSequence() {
  const [phase, setPhase] = useState<RevealPhase>('waiting')
  const [currentPage, setCurrentPage] = useState(0)

  const startReveal = useCallback(() => {
    if (phase !== 'waiting') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('revealed')
      setCurrentPage(TOTAL_PAGES)
      return
    }
    setPhase('turning')
  }, [phase])

  useEffect(() => {
    if (phase !== 'turning') return
    if (currentPage >= TOTAL_PAGES) {
      setPhase('revealed')
      return
    }
    const timer = setTimeout(() => {
      setCurrentPage((p) => p + 1)
    }, PAGE_INTERVAL)
    return () => clearTimeout(timer)
  }, [phase, currentPage])

  return { phase, currentPage, startReveal } as const
}
