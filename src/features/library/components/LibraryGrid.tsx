import { DataGrid, type GridColDef, type GridSortModel } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { useLibraryStore } from '../../../store/useLibraryStore'
import type { Book } from '../../../shared/types'
import styles from './LibraryGrid.module.scss'

const DEFAULT_SORT: GridSortModel = [{ field: 'title', sort: 'asc' }]

export default function LibraryGrid() {
  const { t } = useTranslation()
  const books = useLibraryStore((state) => state.books)

  const columns: GridColDef<Book>[] = [
    { field: 'title', headerName: t('LibraryGrid.column.title'), flex: 2, minWidth: 160 },
    { field: 'author', headerName: t('LibraryGrid.column.author'), flex: 2, minWidth: 140 },
    { field: 'genre', headerName: t('LibraryGrid.column.genre'), flex: 1, minWidth: 120 },
    {
      field: 'rating',
      headerName: t('LibraryGrid.column.rating'),
      flex: 1,
      minWidth: 100,
      valueFormatter: (value: string) => t(`AppRating.${value}`),
    },
  ]

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
