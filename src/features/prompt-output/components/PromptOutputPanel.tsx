import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useCompiledPrompt } from '../hooks/useCompiledPrompt'
import { useBookRevealSequence, TOTAL_PAGES } from '../hooks/useBookRevealSequence'
import { useTheme } from '../../../shared/theme/useTheme'
import { darken, type HexColor } from '../../../shared/theme/color-utils'
import ParchmentSurface from '../../../shared/components/ParchmentSurface'
import CornerFlourish from '../../../shared/components/CornerFlourish'
import WaxSealButton from './WaxSealButton'
import GoldenParticles from './GoldenParticles'
import styles from './PromptOutputPanel.module.scss'

interface PromptOutputPanelProps {
  onClose: () => void
}

export default function PromptOutputPanel({ onClose }: PromptOutputPanelProps) {
  const { t } = useTranslation()
  const { prompt, bookCount, genreNames } = useCompiledPrompt()
  const { phase, currentPage } = useBookRevealSequence()
  const { tokens } = useTheme()

  if (!prompt) {
    return <p className={styles.noBooks}>{t('promptPage.noBooks')}</p>
  }

  const coverGradient = `linear-gradient(135deg, ${tokens.coverColor}, ${darken(tokens.coverColor as HexColor, 0.25)})`
  const spineGradient = `linear-gradient(90deg, ${darken(tokens.coverColor as HexColor, 0.3)}, ${tokens.coverColor})`
  const revealed = phase === 'revealed'

  return (
    <div className={styles.promptPage}>
      {/* Magical glow */}
      <div className={clsx(styles.magicalGlow, revealed && styles.glowIntense)} />

      {/* Golden particles */}
      {revealed && <GoldenParticles />}

      {/* Title block */}
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>
          {revealed ? t('promptPage.titleRevealed') : t('promptPage.titleWaiting')}
        </h2>
        <p className={styles.subtitle}>
          {revealed
            ? t('promptPage.subtitleRevealed', { count: bookCount, genres: genreNames.join(', ') })
            : t('promptPage.subtitleWaiting')}
        </p>
      </div>

      {/* Book */}
      <div className={styles.bookPerspective}>
        <div className={styles.bookInner}>
          {/* Back cover */}
          <div className={styles.backCover} style={{ background: coverGradient }} />

          {/* Final spread — prompt on parchment */}
          <ParchmentSurface
            className={clsx(styles.promptSpread, revealed && styles.spreadVisible)}
          >
            <CornerFlourish corner="top-left" size={44} color={tokens.coverAccent} />
            <CornerFlourish corner="top-right" size={44} color={tokens.coverAccent} />
            <CornerFlourish corner="bottom-left" size={44} color={tokens.coverAccent} />
            <CornerFlourish corner="bottom-right" size={44} color={tokens.coverAccent} />

            <div className={styles.promptText}>{prompt}</div>

            <div className={styles.sealContainer}>
              <WaxSealButton textToCopy={prompt} />
            </div>
          </ParchmentSurface>

          {/* Turning pages */}
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <div
              key={i}
              className={clsx(styles.turningPage, i < currentPage && styles.turned)}
              style={{
                top: 10 + i,
                bottom: 10 + i,
                transitionDelay: `${i * 0.08}s`,
                zIndex: TOTAL_PAGES - i + 10,
                '--page-z': `${(TOTAL_PAGES - i) * 0.5}px`,
                background: `linear-gradient(90deg,
                  rgba(180,160,120,0.3) 0%,
                  ${tokens.parchment} 2%,
                  ${tokens.parchmentDark} 98%,
                  rgba(180,160,120,0.2) 100%)`,
              } as React.CSSProperties}
            >
              <div className={styles.chapterDecoration}>
                {t(`promptPage.chapterPage${i + 1}`)}
              </div>
            </div>
          ))}

          {/* Spine */}
          <div className={styles.spine} style={{ background: spineGradient }} />
        </div>
      </div>

      {/* Back button */}
      <button className={styles.backButton} onClick={onClose} type="button">
        {t('promptPage.backButton')}
      </button>
    </div>
  )
}
