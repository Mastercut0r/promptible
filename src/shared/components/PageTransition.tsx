import { useEffect, useState, type ReactNode } from 'react'
import styles from './PageTransition.module.scss'

interface PageTransitionProps {
  children: ReactNode
  pageKey: string | number
  direction?: 'right' | 'left'
}

function PageTransition({ children, pageKey, direction = 'right' }: PageTransitionProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [pageKey])

  const hiddenClass = direction === 'right' ? styles['hidden-right'] : styles['hidden-left']
  const stateClass = visible ? styles.visible : hiddenClass

  return (
    <div className={`${styles.container} ${stateClass}`}>
      {children}
    </div>
  )
}

export default PageTransition
