import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['"Inter"', 'system-ui', 'sans-serif'].join(','),
  },
  spacing: 4,
  palette: {
    // Dark page background for every view. Uses the active theme token so it
    // follows theme switches; CssBaseline applies it to <body>, whose background
    // propagates to the whole viewport. Without this, only ImportPage painted its
    // own background and Library / Revelation fell back to the default white.
    background: {
      default: 'var(--bg-deep)',
    },
    // Keep inherited body text light on the dark background. Page components
    // mostly set their own colors via CSS vars, but this prevents stray
    // uncolored text / MUI components from rendering dark-on-dark.
    text: {
      primary: 'var(--text-light)',
    },
  },
})

export default theme
