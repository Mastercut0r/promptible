import { useEffect, useState } from 'react'

export type RevealPhase = 'waiting' | 'turning' | 'revealed'

export const TOTAL_PAGES = 4
const START_DELAY = 600
const PAGE_INTERVAL = 550

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useBookRevealSequence() {
  const [phase, setPhase] = useState<RevealPhase>('waiting')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    if (prefersReduced) {
      setPhase('revealed')
      setCurrentPage(TOTAL_PAGES)
      return
    }
    const timer = setTimeout(() => {
      setPhase('turning')
    }, START_DELAY)
    return () => clearTimeout(timer)
  }, [])

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

  return { phase, currentPage } as const
}
