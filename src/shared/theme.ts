import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['"Inter"', 'system-ui', 'sans-serif'].join(','),
  },
  spacing: 4,
})

export default theme
