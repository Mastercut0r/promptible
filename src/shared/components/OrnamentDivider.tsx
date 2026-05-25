import type { CSSProperties } from 'react'
import styles from './OrnamentDivider.module.scss'

interface OrnamentDividerProps {
  style?: CSSProperties
  className?: string
}

function OrnamentDivider({ style, className }: OrnamentDividerProps) {
  const combined = className ? `${styles.divider} ${className}` : styles.divider

  return (
    <div className={combined} style={style}>
      <div className={styles['line-left']} />
      <div className={styles.diamond} />
      <div className={styles['line-right']} />
    </div>
  )
}

export default OrnamentDivider
