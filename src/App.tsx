import { Suspense, useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material'
import muiTheme from './shared/mui-theme'
import './i18n'
import CsvDropZone from './features/upload/components/CsvDropZone'
import ColumnMappingModal from './features/upload/components/ColumnMappingModal'
import LibraryGrid from './features/library/components/LibraryGrid'
import PromptSettingsPanel from './features/prompt-settings/components/PromptSettingsPanel'
import PromptOutputPanel from './features/prompt-output/components/PromptOutputPanel'
import { useCsvParser } from './features/upload/hooks/useCsvParser'
import { useLibraryStore } from './store/useLibraryStore'
import BookmarkNav, { type View } from './shared/components/BookmarkNav'
import PageTransition from './shared/components/PageTransition'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [mappingModalOpen, setMappingModalOpen] = useState(false)
  const [autoConvert, setAutoConvert] = useState(false)
  const [currentView, setCurrentView] = useState<View>('import')

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
    setCurrentView('library')
  }

  const handleCancel = () => {
    setFile(null)
    setMappingModalOpen(false)
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        }
      >
        <BookmarkNav
          currentView={currentView}
          onNavigate={setCurrentView}
          booksImported={books.length > 0}
        />

        <Box sx={{ maxWidth: '72rem', mx: 'auto', mt: 4, px: 2, pb: 4, pt: '3.5rem' }}>
          <PageTransition pageKey={currentView}>
            {currentView === 'import' && (
              <Box sx={{ maxWidth: '37.5rem', mx: 'auto', mb: 4 }}>
                <CsvDropZone onFileDrop={handleFileDrop} />
              </Box>
            )}

            {currentView === 'library' && (
              <>
                <LibraryGrid />
                <Box sx={{ mt: 4 }}>
                  <PromptSettingsPanel onGenerate={() => setCurrentView('prompt')} />
                </Box>
              </>
            )}

            {currentView === 'prompt' && books.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <PromptOutputPanel onClose={() => setCurrentView('library')} />
              </Box>
            )}
          </PageTransition>
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
