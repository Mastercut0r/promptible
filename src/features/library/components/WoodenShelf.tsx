import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import type { AppRating, Book, RatedAppRating } from '../../../shared/types'
import { useDropTarget } from '../hooks/useDropTarget'
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
  const handleDrop = useCallback((bookId: string) => onDropBook(bookId, rating), [onDropBook, rating])
  const { isOver, handleDragOver, handleDragLeave, handleDrop: onDrop } = useDropTarget(handleDrop)

  return (
    <div className={styles.shelf}>
      <div className={styles.label}>
        {t(`library.shelf.${rating}`)}
      </div>

      <div
        className={clsx(styles.booksArea, isOver && styles.booksAreaDragOver)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={onDrop}
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
