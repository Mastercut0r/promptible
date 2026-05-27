import { useCallback, useEffect, useState } from 'react'

export type RevealPhase = 'waiting' | 'turning' | 'revealed'

export const TOTAL_PAGES = 5
const PAGE_INTERVAL = 550

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useBookRevealSequence() {
  const [phase, setPhase] = useState<RevealPhase>('waiting')
  const [currentPage, setCurrentPage] = useState(0)

  const startReveal = useCallback(() => {
    if (phase !== 'waiting') return
    if (prefersReduced) {
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
