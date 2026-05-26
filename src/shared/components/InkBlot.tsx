import clsx from 'clsx'
import type { CSSProperties } from 'react'
import styles from './InkBlot.module.scss'

interface InkBlotProps {
  size?: number
  x: number | string
  y: number | string
  opacity?: number
  style?: CSSProperties
  className?: string
}

function InkBlot({ size = 40, x, y, opacity = 0.12, style, className }: InkBlotProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(styles.inkBlot, className)}
      style={{ left: x, top: y, width: size, height: size, opacity, ...style }}
    />
  )
}

export default InkBlot
