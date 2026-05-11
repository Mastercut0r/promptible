import { Suspense, useState } from 'react'
import { ThemeProvider, CssBaseline, CircularProgress, Box, Typography } from '@mui/material'
import theme from './shared/theme'
import './i18n'
import CsvDropZone from './features/upload/components/CsvDropZone'

function App() {
  const [file, setFile] = useState<File | null>(null)

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
          <CsvDropZone onFileDrop={setFile} />
          {file && (
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              {file.name}
            </Typography>
          )}
        </Box>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
