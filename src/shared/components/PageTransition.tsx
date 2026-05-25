import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './PageTransition.module.scss'

/** Duration must match the CSS transition in PageTransition.module.scss */
const TRANSITION_MS = 500

interface PageTransitionProps {
  children: ReactNode
  pageKey: string | number
  direction?: 'right' | 'left'
}

function PageTransition({ children, pageKey, direction = 'right' }: PageTransitionProps) {
  // Retain the previous children while they animate out, then swap.
  const [displayedChildren, setDisplayedChildren] = useState<ReactNode>(children)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current)

    // Phase 1: animate out current content
    setVisible(false)

    // Phase 2: after exit transition completes, swap children and animate in
    timerRef.current = setTimeout(() => {
      setDisplayedChildren(children)
      setVisible(true)
      timerRef.current = null
    }, TRANSITION_MS)

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey])

  const hiddenClass = direction === 'right' ? styles.hiddenRight : styles.hiddenLeft
  const stateClass = visible ? styles.visible : hiddenClass

  return (
    <div className={`${styles.container} ${stateClass}`}>
      {displayedChildren}
    </div>
  )
}

export default PageTransition
