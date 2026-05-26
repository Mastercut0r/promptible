import { Suspense, useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material'
import muiTheme from './shared/mui-theme'
import './i18n'
import ImportPage from './features/import-page/components/ImportPage'
import ColumnMappingModal from './features/upload/components/ColumnMappingModal'
import LibraryPage from './features/library/components/LibraryPage'
import PromptSettingsPanel from './features/prompt-settings/components/PromptSettingsPanel'
import PromptOutputPanel from './features/prompt-output/components/PromptOutputPanel'
import { useCsvParser } from './features/upload/hooks/useCsvParser'
import { useLibraryStore } from './store/useLibraryStore'
import type { View } from './shared/types'
import BookmarkNav from './shared/components/BookmarkNav'
import PageTransition from './shared/components/PageTransition'

const VIEW_ORDER: View[] = ['import', 'library', 'prompt']

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [importResetKey, setImportResetKey] = useState(0)
  const [mappingModalOpen, setMappingModalOpen] = useState(false)
  const [autoConvert, setAutoConvert] = useState(false)
  const [currentView, setCurrentView] = useState<View>('import')
  const [transitionDirection, setTransitionDirection] = useState<'right' | 'left'>('right')

  const navigateTo = (next: View) => {
    setTransitionDirection(VIEW_ORDER.indexOf(next) >= VIEW_ORDER.indexOf(currentView) ? 'right' : 'left')
    setCurrentView(next)
  }

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
    navigateTo('library')
  }

  const handleCancel = () => {
    setFile(null)
    setMappingModalOpen(false)
    setImportResetKey((k) => k + 1)
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
          onNavigate={navigateTo}
          booksImported={books.length > 0}
        />

        <PageTransition pageKey={currentView} direction={transitionDirection}>
          {currentView === 'import' && (
            <ImportPage
              onFileDrop={handleFileDrop}
              hasExistingBooks={books.length > 0}
              resetKey={importResetKey}
            />
          )}

          {currentView === 'library' && (
            <Box sx={{ maxWidth: '72rem', mx: 'auto', mt: 4, px: 2, pb: 4, pt: '3.5rem' }}>
              <LibraryPage />
              <Box sx={{ mt: 4 }}>
                <PromptSettingsPanel onGenerate={() => navigateTo('prompt')} />
              </Box>
            </Box>
          )}

          {currentView === 'prompt' && (
            <Box sx={{ maxWidth: '72rem', mx: 'auto', mt: 4, px: 2, pb: 4, pt: '3.5rem' }}>
              <PromptOutputPanel onClose={() => navigateTo('library')} />
            </Box>
          )}
        </PageTransition>

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
