import { memo, useState, type DragEvent } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import type { AppRating, Book } from '../../../shared/types'
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
      onDropBook(bookId, 'UNRATED')
    }
    setIsOver(false)
  }

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
          <p className={styles.emptyText}>{t('library.allJudged')}</p>
        )}
      </div>
    </div>
  )
})

export default UnsortedArea
