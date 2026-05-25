import clsx from 'clsx'
import type { CSSProperties } from 'react'
import styles from './OrnamentDivider.module.scss'

interface OrnamentDividerProps {
  style?: CSSProperties
  className?: string
}

function OrnamentDivider({ style, className }: OrnamentDividerProps) {
  return (
    <div aria-hidden="true" className={clsx(styles.divider, className)} style={style}>
      <div className={styles.lineLeft} />
      <div className={styles.diamond} />
      <div className={styles.lineRight} />
    </div>
  )
}

export default OrnamentDivider
