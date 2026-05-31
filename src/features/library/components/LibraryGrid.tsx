import { useMemo } from 'react'
import { DataGrid, type GridColDef, type GridSortModel, type GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { useLibraryStore } from '../../../store/useLibraryStore'
import type { AppRating, Book } from '../../../shared/types'
import { genreLabel, UNCATEGORIZED_GENRE } from '../../../shared/utils/genreUtils'
import BookRating from './BookRating'
import styles from './LibraryGrid.module.scss'

const DEFAULT_SORT: GridSortModel = [{ field: 'title', sort: 'asc' }]

const RATING_SORT_ORDER: Record<AppRating, number> = {
  LOVED: 0,
  NEUTRAL: 1,
  UNRATED: 2,
  DISLIKED: 3,
}

export default function LibraryGrid() {
  const { t } = useTranslation()
  const books = useLibraryStore((state) => state.books)

  const columns = useMemo<GridColDef<Book>[]>(
    () => [
      { field: 'title', headerName: t('LibraryGrid.column.title'), flex: 2, minWidth: 160 },
      { field: 'author', headerName: t('LibraryGrid.column.author'), flex: 2, minWidth: 140 },
      {
        field: 'genre',
        headerName: t('LibraryGrid.column.genre'),
        flex: 1,
        minWidth: 120,
        // book.genre holds the canonical genre key; show its localized label so the
        // table matches the spines and filter bar.
        valueGetter: (value: string | null | undefined) => genreLabel(value ?? UNCATEGORIZED_GENRE, t),
      },
      {
        field: 'rating',
        headerName: t('LibraryGrid.column.rating'),
        flex: 1,
        minWidth: 140,
        sortComparator: (a: AppRating, b: AppRating) =>
          RATING_SORT_ORDER[a] - RATING_SORT_ORDER[b],
        renderCell: (params: GridRenderCellParams<Book>) => (
          <BookRating bookId={params.row.id} currentRating={params.row.rating} />
        ),
      },
    ],
    [t],
  )

  return (
    <div className={styles.container}>
      <DataGrid
        rows={books}
        columns={columns}
        initialState={{ sorting: { sortModel: DEFAULT_SORT } }}
        pageSizeOptions={[25, 50, 100]}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  )
}
