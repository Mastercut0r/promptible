import { Suspense, useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline, CircularProgress, Box, Typography } from '@mui/material'
import theme from './shared/theme'
import './i18n'
import CsvDropZone from './features/upload/components/CsvDropZone'
import ColumnMappingModal from './features/upload/components/ColumnMappingModal'
import { useCsvParser } from './features/upload/hooks/useCsvParser'
import { useLibraryStore } from './store/useLibraryStore'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [mappingModalOpen, setMappingModalOpen] = useState(false)
  const [autoConvert, setAutoConvert] = useState(false)

  const { headers, mapping, setMapping, parseBooks, isReady } = useCsvParser(file)
  const { books, importBooks } = useLibraryStore()

  useEffect(() => {
    if (isReady) {
      setMappingModalOpen(true)
    }
  }, [isReady])

  const handleFileDrop = (droppedFile: File) => {
    setFile(droppedFile)
  }

  const handleContinue = () => {
    importBooks(parseBooks(), autoConvert)
    setMappingModalOpen(false)
    setFile(null)
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
          {books.length > 0 && (
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
          autoConvert={autoConvert}
          onAutoConvertChange={setAutoConvert}
          onContinue={handleContinue}
          onCancel={handleCancel}
        />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
