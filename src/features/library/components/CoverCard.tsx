import { type DragEvent } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { ParchmentSurface, CornerFlourish, OrnamentDivider } from '../../../shared/components'
import { getGenreStyle, withOpacity } from '../../../shared/theme'
import type { AppRating, Book } from '../../../shared/types'
import styles from './CoverCard.module.scss'

interface CoverCardProps {
  book: Book
  isDragging?: boolean
  onRate: (bookId: string, rating: AppRating) => void
  onDragStart: (bookId: string) => void
  onDragEnd: () => void
}

const RATING_OPTIONS = [
  { rating: 'LOVED' as const, symbol: '♥', color: '#c9a84c' },
  { rating: 'NEUTRAL' as const, symbol: '~', color: '#8a8a7a' },
  { rating: 'DISLIKED' as const, symbol: '×', color: '#7a5a5a' },
] as const

export default function CoverCard({ book, isDragging, onRate, onDragStart, onDragEnd }: CoverCardProps) {
  const { t } = useTranslation()
  const genre = getGenreStyle(book.genre)

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text/plain', book.id)
    e.dataTransfer.effectAllowed = 'move'
    onDragStart(book.id)
  }

  return (
    <div
      className={styles.card}
      style={{ opacity: isDragging ? 'var(--drag-opacity)' : 1 }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <ParchmentSurface className={styles.surface} style={{ borderTop: `3px solid ${genre.spine}` }}>
        <CornerFlourish corner="top-left" size={24} />
        <CornerFlourish corner="top-right" size={24} />

        <div className={styles.content}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
          <span
            className={styles.genreBadge}
            style={{
              color: genre.text,
              background: withOpacity(genre.spine, 0.251),
            }}
          >
            <span
              className={styles.genreDot}
              style={{ background: genre.spine }}
            />
            {book.genre}
          </span>
        </div>

        <OrnamentDivider className={styles.divider} />

        <div className={styles.ratings}>
          {RATING_OPTIONS.map((opt) => {
            const isActive = book.rating === opt.rating
            return (
              <button
                key={opt.rating}
                type="button"
                className={clsx(styles.ratingButton, isActive && styles.ratingButtonActive)}
                style={isActive ? {
                  background: withOpacity(opt.color, 0.133),
                  borderColor: withOpacity(opt.color, 0.333),
                } : undefined}
                aria-pressed={isActive}
                aria-label={t(`library.rating.${opt.rating}`)}
                onClick={(e) => {
                  e.stopPropagation()
                  onRate(book.id, opt.rating)
                }}
              >
                <span className={styles.symbol} style={{ color: opt.color }}>
                  {opt.symbol}
                </span>
                <span>{t(`library.rating.${opt.rating}`)}</span>
                {isActive && (
                  <span className={styles.currentLabel}>{t('library.cover.current')}</span>
                )}
              </button>
            )
          })}
        </div>

        <p className={styles.dragHintText}>{t('library.cover.dragHint')}</p>
      </ParchmentSurface>
    </div>
  )
}
