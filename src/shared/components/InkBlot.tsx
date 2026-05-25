import type { CSSProperties } from 'react'
import styles from './InkBlot.module.scss'

interface InkBlotProps {
  size?: number
  x: number
  y: number
  opacity?: number
  style?: CSSProperties
  className?: string
}

function InkBlot({ size = 40, x, y, opacity = 0.12, style, className }: InkBlotProps) {
  const combined = className ? `${styles['ink-blot']} ${className}` : styles['ink-blot']

  return (
    <div
      className={combined}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        ...style,
      }}
    />
  )
}

export default InkBlot
