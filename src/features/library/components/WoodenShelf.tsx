import { memo, useState, type DragEvent } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import type { AppRating, Book, RatedAppRating } from '../../../shared/types'
import BookSpine from './BookSpine'
import styles from './WoodenShelf.module.scss'

interface WoodenShelfProps {
  rating: RatedAppRating
  books: Book[]
  onDropBook: (bookId: string, rating: AppRating) => void
  onDragStart: (bookId: string) => void
  onDragEnd: () => void
}

const WoodenShelf = memo(function WoodenShelf({
  rating,
  books,
  onDropBook,
  onDragStart,
  onDragEnd,
}: WoodenShelfProps) {
  const { t } = useTranslation()
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsOver(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOver(false)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const bookId = e.dataTransfer.getData('text/plain')
    if (bookId) {
      onDropBook(bookId, rating)
    }
    setIsOver(false)
  }

  return (
    <div className={styles.shelf}>
      <div className={styles.label}>
        {t(`library.shelf.${rating}`)}
      </div>

      <div
        className={clsx(styles.booksArea, isOver && styles.booksAreaDragOver)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {books.length > 0 ? (
          books.map((book) => (
            <BookSpine
              key={book.id}
              book={book}
              onRate={onDropBook}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        ) : (
          <p className={styles.emptyText}>
            {isOver ? t('library.shelfDropHint') : t('library.shelfEmpty')}
          </p>
        )}
      </div>

      <div className={styles.plank} />
    </div>
  )
})

export default WoodenShelf
