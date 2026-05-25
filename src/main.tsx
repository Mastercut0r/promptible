// Self-hosted fonts — no external network requests (privacy-first)
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/700.css'
import '@fontsource/crimson-pro/400.css'
import '@fontsource/crimson-pro/400-italic.css'
import '@fontsource/crimson-pro/600.css'
import './shared/styles/tokens.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './shared/theme'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
