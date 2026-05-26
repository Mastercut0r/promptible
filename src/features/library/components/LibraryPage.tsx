import { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLibraryStore } from '../../../store/useLibraryStore'
import { OrnamentDivider } from '../../../shared/components'
import { normalizeGenre } from '../../../shared/utils/genreUtils'
import type { AppRating, RatedAppRating } from '../../../shared/types'
import LibraryHeader from './LibraryHeader'
import GenreFilterBar from './GenreFilterBar'
import WoodenShelf from './WoodenShelf'
import UnsortedArea from './UnsortedArea'
import DragHint from './DragHint'
import styles from './LibraryPage.module.scss'

const SHELF_ORDER: RatedAppRating[] = ['LOVED', 'NEUTRAL', 'DISLIKED']

export default function LibraryPage() {
  const { t } = useTranslation()
  const books = useLibraryStore((s) => s.books)
  const setRating = useLibraryStore((s) => s.setRating)

  const [genreFilter, setGenreFilter] = useState('All')
  const [draggedBookId, setDraggedBookId] = useState<string | null>(null)

  const filteredBooks = useMemo(() => {
    if (genreFilter === 'All') return books
    return books.filter((b) => normalizeGenre(b.genre) === genreFilter)
  }, [books, genreFilter])

  const shelved = useMemo(() => ({
    LOVED: filteredBooks.filter((b) => b.rating === 'LOVED'),
    NEUTRAL: filteredBooks.filter((b) => b.rating === 'NEUTRAL'),
    DISLIKED: filteredBooks.filter((b) => b.rating === 'DISLIKED'),
    UNRATED: filteredBooks.filter((b) => b.rating === 'UNRATED'),
  }), [filteredBooks])

  const stats = useMemo(() => ({
    total: books.length,
    rated: books.filter((b) => b.rating !== 'UNRATED').length,
    loved: books.filter((b) => b.rating === 'LOVED').length,
  }), [books])

  const handleDropBook = useCallback((bookId: string, rating: AppRating) => {
    setRating(bookId, rating)
    setDraggedBookId(null)
  }, [setRating])

  const handleDragStart = useCallback((bookId: string) => {
    setDraggedBookId(bookId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedBookId(null)
  }, [])

  return (
    <div className={styles.page}>
      <LibraryHeader totalBooks={stats.total} ratedBooks={stats.rated} />
      <GenreFilterBar activeGenre={genreFilter} onGenreChange={setGenreFilter} />
      <OrnamentDivider className={styles.divider} />
      <DragHint visible={!!draggedBookId} />

      <div className={styles.scrollArea}>
        {SHELF_ORDER.map((rating) => (
          <WoodenShelf
            key={rating}
            rating={rating}
            books={shelved[rating]}
            onDropBook={handleDropBook}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
        <UnsortedArea
          books={shelved.UNRATED}
          onDropBook={handleDropBook}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </div>

      <div className={styles.annotation}>
        {stats.rated >= 3
          ? t('library.annotation.ready', { loved: shelved.LOVED.length })
          : t('library.annotation.notReady')}
      </div>
    </div>
  )
}
