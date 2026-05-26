import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { CornerFlourish, OrnamentDivider } from '../../../shared/components'
import { useTheme } from '../../../shared/theme'
import { darken, type HexColor } from '../../../shared/theme/color-utils'
import styles from './BookCover.module.scss'

interface BookCoverProps {
  isOpen: boolean
  onOpen: () => void
}

const CARDINAL_DEGREES = [0, 90, 180, 270] as const

export default function BookCover({ isOpen, onOpen }: BookCoverProps) {
  const { t } = useTranslation()
  const { tokens } = useTheme()

  const coverColor = tokens.coverColor as HexColor
  const gold = tokens.gold

  return (
    <div
      role="button"
      aria-label={t('importPage.openHint')}
      tabIndex={isOpen ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && !isOpen && onOpen()}
      className={clsx(styles.cover, isOpen && styles.open)}
      style={{
        background: `
          linear-gradient(145deg, ${tokens.coverAccent}22 0%, transparent 30%),
          linear-gradient(135deg, ${coverColor} 0%, ${darken(coverColor, 0.15)} 100%)`,
      }}
      onClick={() => !isOpen && onOpen()}
    >
      {/* Ornament frame */}
      <div className={styles.ornamentFrame} style={{ border: `1px solid ${gold}44` }}>
        <CornerFlourish corner="top-left" size={30} />
        <CornerFlourish corner="top-right" size={30} />
        <CornerFlourish corner="bottom-left" size={30} />
        <CornerFlourish corner="bottom-right" size={30} />

        {/* Mandala */}
        <div className={styles.mandala}>
          <div className={styles.mandalaOuterRing} style={{ border: `1.5px solid ${gold}55` }} />
          <div className={styles.mandalaInnerRing} style={{ border: `1px solid ${gold}33` }} />
          {CARDINAL_DEGREES.map((deg) => (
            <div
              key={deg}
              className={styles.mandalaDot}
              style={{
                background: gold,
                transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-28px)`,
              }}
            />
          ))}
          <div
            className={styles.mandalaSquare}
            style={{
              transform: 'translate(-50%,-50%) rotate(45deg)',
              border: `1px solid ${gold}44`,
            }}
          />
          <div
            className={styles.mandalaSquare}
            style={{
              transform: 'translate(-50%,-50%)',
              border: `1px solid ${gold}44`,
            }}
          />
          <div className={styles.mandalaCenterEye} style={{ background: gold }} />
        </div>

        <h2 className={styles.coverTitle} style={{ color: gold }}>
          {t('importPage.coverTitle')}
        </h2>
        <OrnamentDivider style={{ margin: '12px 0' }} />
        <p className={styles.coverSubtitle} style={{ color: tokens.goldLight }}>
          {t('importPage.coverSubtitle')}
        </p>

        {/* Bottom ornament */}
        <div className={styles.bottomOrnament}>
          <div className={styles.ornamentDot} style={{ background: gold }} />
          <div className={styles.ornamentLine} style={{ background: gold }} />
          <div className={styles.ornamentDiamond} style={{ border: `1px solid ${gold}` }} />
          <div className={styles.ornamentLine} style={{ background: gold }} />
          <div className={styles.ornamentDot} style={{ background: gold }} />
        </div>
      </div>

      {/* Celestial edge lines */}
      <div
        className={clsx(styles.celestialLine, styles.top)}
        style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }}
      />
      <div
        className={clsx(styles.celestialLine, styles.bottom)}
        style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }}
      />

      {/* Corner diamond stars */}
      {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map((corner) => (
        <div key={corner} className={clsx(styles.cornerStar, styles[corner])}>
          <div className={styles.cornerStarInner} style={{ border: `1px solid ${gold}` }} />
        </div>
      ))}

      {/* Spine edge */}
      <div
        className={styles.spine}
        style={{
          background: `linear-gradient(90deg, ${darken(coverColor, 0.3)}, ${coverColor})`,
        }}
      />
    </div>
  )
}
