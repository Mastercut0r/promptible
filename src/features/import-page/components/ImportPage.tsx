import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { CornerFlourish, FloatingIllustrations, InkBlot, ParchmentSurface } from '../../../shared/components'
import { useTheme } from '../../../shared/theme'
import { darken, type HexColor } from '../../../shared/theme/color-utils'
import BookCover from './BookCover'
import BookDropZone from './BookDropZone'
import styles from './ImportPage.module.scss'

const COVER_FLIP_MS = 900
const COVER_UNMOUNT_DELAY_MS = COVER_FLIP_MS + 50
const SUCCESS_ANIMATION_MS = 1200

interface ImportPageProps {
  onFileDrop: (file: File) => void
  hasExistingBooks: boolean
  resetKey: number
}

const GENRE_ICONS = ['⚔', '🔭', '🔍', '♠', '🧭'] as const

export default function ImportPage({ onFileDrop, hasExistingBooks, resetKey }: ImportPageProps) {
  const { t } = useTranslation()
  const { tokens } = useTheme()
  const [bookOpen, setBookOpen] = useState(false)
  const [coverGone, setCoverGone] = useState(false)
  const [fileLoaded, setFileLoaded] = useState(false)
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetState = useCallback(() => {
    if (successTimer.current) clearTimeout(successTimer.current)
    setFileLoaded(false)
    setBookOpen(false)
    setCoverGone(false)
  }, [])

  useEffect(() => {
    if (bookOpen) {
      const timer = setTimeout(() => setCoverGone(true), COVER_UNMOUNT_DELAY_MS)
      return () => clearTimeout(timer)
    }
  }, [bookOpen])

  useEffect(() => {
    resetState()
  }, [resetKey, resetState])

  const handleFileDrop = useCallback((file: File) => {
    setFileLoaded(true)
    successTimer.current = setTimeout(() => onFileDrop(file), SUCCESS_ANIMATION_MS)
  }, [onFileDrop])

  const coverColor = tokens.coverColor as HexColor

  return (
    <div className={styles.page}>
      {/* Floating genre illustrations (decorative background) */}
      <FloatingIllustrations variant="import" />

      {/* Atmospheric light cone */}
      <div className={styles.lightCone} />

      {/* Ink blots */}
      <InkBlot x="8%" y="15%" size={70} opacity={0.06} />
      <InkBlot x="85%" y="70%" size={50} opacity={0.05} />
      <InkBlot x="12%" y="80%" size={35} opacity={0.04} />

      {/* Title */}
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{t('importPage.title')}</h1>
        <p className={styles.subtitle}>{t('importPage.subtitle')}</p>
      </div>

      {/* The Book */}
      <div className={styles.bookPerspective}>
        <div className={styles.book}>
          {/* Back cover */}
          <div
            className={styles.backCover}
            style={{
              background: `linear-gradient(135deg, ${coverColor} 0%, ${darken(coverColor, 0.2)} 100%)`,
            }}
          />

          {/* Parchment interior */}
          <ParchmentSurface className={clsx(styles.interior, bookOpen && styles.active)}>
            <CornerFlourish corner="top-left" size={40} color={tokens.coverAccent} />
            <CornerFlourish corner="top-right" size={40} color={tokens.coverAccent} />
            <CornerFlourish corner="bottom-left" size={40} color={tokens.coverAccent} />
            <CornerFlourish corner="bottom-right" size={40} color={tokens.coverAccent} />

            <BookDropZone onFileDrop={handleFileDrop} fileLoaded={fileLoaded} />

            <p className={styles.handwrittenNote}>
              {hasExistingBooks ? t('importPage.resyncNote') : t('importPage.csvNote')}
            </p>
          </ParchmentSurface>

          {/* Front cover */}
          {!coverGone && <BookCover isOpen={bookOpen} onOpen={() => setBookOpen(true)} />}
        </div>
      </div>

      {/* Pulsing hint — kept mounted to reserve its space so the book doesn't
          shift when it fades out on open */}
      <p className={clsx(styles.hint, bookOpen && styles.hintHidden)} aria-hidden={bookOpen}>
        {t('importPage.openHint')}
      </p>

      {/* Genre icons */}
      <div className={styles.genreIcons}>
        {GENRE_ICONS.map((icon, i) => (
          <span
            key={i}
            className={styles.genreIcon}
            style={{ transform: `rotate(${(i - 2) * 5}deg)` }}
          >
            {icon}
          </span>
        ))}
      </div>
    </div>
  )
}
