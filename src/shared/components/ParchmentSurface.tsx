import clsx from 'clsx'
import type { CSSProperties, ReactNode } from 'react'
import styles from './ParchmentSurface.module.scss'

interface ParchmentSurfaceProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

function ParchmentSurface({ children, style, className }: ParchmentSurfaceProps) {
  return (
    <div className={clsx(styles.parchmentSurface, className)} style={style}>
      {children}
    </div>
  )
}

export default ParchmentSurface
