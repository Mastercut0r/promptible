import { Suspense } from 'react'
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material'
import theme from './shared/theme'
import './i18n'

function App() {
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
        <Box sx={{ p: 4 }}>Promptible</Box>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
