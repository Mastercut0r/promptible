import styles from './CornerFlourish.module.scss'

type Corner = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'

interface CornerFlourishProps {
  corner?: Corner
  size?: number
  color?: string
}

const ROTATION: Record<Corner, string> = {
  'top-left': '0deg',
  'top-right': '90deg',
  'bottom-right': '180deg',
  'bottom-left': '270deg',
}

function CornerFlourish({ corner = 'top-left', size = 60, color = 'var(--gold)' }: CornerFlourishProps) {
  const isTop = corner.includes('top')
  const isLeft = corner.includes('left')

  return (
    <div
      className={styles.wrapper}
      style={{
        [isTop ? 'top' : 'bottom']: 8,
        [isLeft ? 'left' : 'right']: 8,
        width: size,
        height: size,
        transform: `rotate(${ROTATION[corner]})`,
      }}
    >
      <div className={styles['line-h']} style={{ background: color }} />
      <div className={styles['line-v']} style={{ background: color }} />
      <div className={styles.dot} style={{ background: color }} />
    </div>
  )
}

export default CornerFlourish
