import { Suspense, useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline, CircularProgress, Box, Typography } from '@mui/material'
import theme from './shared/theme'
import './i18n'
import CsvDropZone from './features/upload/components/CsvDropZone'
import ColumnMappingModal from './features/upload/components/ColumnMappingModal'
import { useCsvParser } from './features/upload/hooks/useCsvParser'
import type { ParsedBook } from './features/upload/types'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [mappingModalOpen, setMappingModalOpen] = useState(false)
  const [books, setBooks] = useState<ParsedBook[] | null>(null)

  const { headers, mapping, setMapping, parseBooks, isReady } = useCsvParser(file)

  useEffect(() => {
    if (isReady) {
      setMappingModalOpen(true)
    }
  }, [isReady])

  const handleFileDrop = (droppedFile: File) => {
    setBooks(null)
    setFile(droppedFile)
  }

  const handleContinue = () => {
    setBooks(parseBooks())
    setMappingModalOpen(false)
  }

  const handleCancel = () => {
    setFile(null)
    setMappingModalOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        }
      >
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, px: 2 }}>
          <CsvDropZone onFileDrop={handleFileDrop} />
          {books && (
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              {books.length} Bücher geladen ✓
            </Typography>
          )}
        </Box>

        <ColumnMappingModal
          open={mappingModalOpen}
          headers={headers}
          mapping={mapping}
          onMappingChange={setMapping}
          onContinue={handleContinue}
          onCancel={handleCancel}
        />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
