import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import type { AppRating, Book } from '../../../shared/types'
import { useDropTarget } from '../hooks/useDropTarget'
import BookSpine from './BookSpine'
import styles from './UnsortedArea.module.scss'

interface UnsortedAreaProps {
  books: Book[]
  onDropBook: (bookId: string, rating: AppRating) => void
  onDragStart: (bookId: string) => void
  onDragEnd: () => void
}

const UnsortedArea = memo(function UnsortedArea({
  books,
  onDropBook,
  onDragStart,
  onDragEnd,
}: UnsortedAreaProps) {
  const { t } = useTranslation()
  const handleDrop = useCallback((bookId: string) => onDropBook(bookId, 'UNRATED'), [onDropBook])
  const { isOver, handleDragOver, handleDragLeave, handleDrop: onDrop } = useDropTarget(handleDrop)

  return (
    <div className={styles.area}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('library.unsorted.title')}</h3>
        <span className={styles.subtitle}>{t('library.unsorted.subtitle')}</span>
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
          <p className={styles.emptyText}>{t('library.allJudged')}</p>
        )}
      </div>
    </div>
  )
})

export default UnsortedArea
