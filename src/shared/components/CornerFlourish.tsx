import styles from './CornerFlourish.module.scss'

type Corner = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'

interface CornerFlourishProps {
  corner?: Corner
  size?: number
  /** Offset from the corner edge in px (converted to rem internally). Default: 8 */
  offset?: number
  color?: string
}

const ROTATION: Record<Corner, string> = {
  'top-left': '0deg',
  'top-right': '90deg',
  'bottom-right': '180deg',
  'bottom-left': '270deg',
}

function CornerFlourish({
  corner = 'top-left',
  size = 60,
  offset = 8,
  color = 'var(--gold)',
}: CornerFlourishProps) {
  const isTop = corner.includes('top')
  const isLeft = corner.includes('left')
  const offsetRem = `${offset / 16}rem`

  return (
    <div
      aria-hidden="true"
      className={styles.wrapper}
      style={{
        [isTop ? 'top' : 'bottom']: offsetRem,
        [isLeft ? 'left' : 'right']: offsetRem,
        width: size,
        height: size,
        transform: `rotate(${ROTATION[corner]})`,
      }}
    >
      <div className={styles.lineH} style={{ background: color }} />
      <div className={styles.lineV} style={{ background: color }} />
      <div className={styles.dot} style={{ background: color }} />
    </div>
  )
}

export default CornerFlourish
