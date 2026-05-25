import type { CSSProperties, ReactNode } from 'react'
import styles from './ParchmentSurface.module.scss'

interface ParchmentSurfaceProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

function ParchmentSurface({ children, style, className }: ParchmentSurfaceProps) {
  const combined = className
    ? `${styles['parchment-surface']} ${className}`
    : styles['parchment-surface']

  return (
    <div className={combined} style={style}>
      {children}
    </div>
  )
}

export default ParchmentSurface
