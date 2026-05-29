import { memo, useState, type DragEvent } from 'react'
import { getGenreStyle } from '../../../shared/theme'
import { normalizeGenre } from '../../../shared/utils/genreUtils'
import type { AppRating, Book } from '../../../shared/types'
import CoverCard from './CoverCard'
import styles from './BookSpine.module.scss'

interface BookSpineProps {
  book: Book
  onRate: (bookId: string, rating: AppRating) => void
  onDragStart: (bookId: string) => void
  onDragEnd: () => void
}

function getAuthorInitial(author: string): string {
  const last = author.split(' ').pop()
  return last ? last.charAt(0) + '.' : ''
}

const MAX_SPINE_CHARS = 32
function truncateTitle(title: string): string {
  return title.length > MAX_SPINE_CHARS
    ? title.slice(0, MAX_SPINE_CHARS).replace(/[\s:,–—-]+$/, '') + '…'
    : title
}

const BookSpine = memo(function BookSpine({ book, onRate, onDragStart, onDragEnd }: BookSpineProps) {
  const [hovered, setHovered] = useState(false)
  const [dragSource, setDragSource] = useState<'spine' | 'card' | null>(null)
  const isDragging = dragSource !== null
  const genre = getGenreStyle(normalizeGenre(book.genre))

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text/plain', book.id)
    e.dataTransfer.effectAllowed = 'move'
    setDragSource('spine')
    setHovered(false)
    onDragStart(book.id)
  }

  const handleDragEnd = () => {
    setDragSource(null)
    setHovered(false)
    onDragEnd()
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => { if (!isDragging) setHovered(true) }}
      onMouseLeave={() => { if (!isDragging) setHovered(false) }}
      style={{ zIndex: hovered ? 50 : 1 }}
    >
      <div
        className={styles.spine}
        style={{
          background: `linear-gradient(90deg,
            rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 10%,
            ${genre.spine} 16%, ${genre.spine} 84%,
            rgba(0,0,0,0.15) 90%, rgba(0,0,0,0.4) 100%)`,
          opacity: isDragging ? 'var(--drag-opacity)' : 1,
          transform: hovered ? 'translateY(-18px) scale(1.03)' : undefined,
          boxShadow: hovered
            ? '2px 8px 24px rgba(0,0,0,0.7), inset 0 0 20px rgba(255,255,255,0.05)'
            : '1px 2px 6px rgba(0,0,0,0.5)',
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.gildedEdge} />
        <span className={styles.title} style={{ color: genre.text }}>
          {truncateTitle(book.title)}
        </span>
        <span className={styles.authorInitial}>
          {getAuthorInitial(book.author)}
        </span>
      </div>

      {(hovered || dragSource === 'card') && (
        <CoverCard
          book={book}
          isDragging={dragSource === 'card'}
          onRate={onRate}
          onDragStart={(bookId) => {
            setDragSource('card')
            onDragStart(bookId)
          }}
          onDragEnd={handleDragEnd}
        />
      )}
    </div>
  )
})

export default BookSpine
