import { useState } from 'react'
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useTranslation } from 'react-i18next'
import { useCompiledPrompt } from '../hooks/useCompiledPrompt'

export default function PromptOutputPanel() {
  const { t } = useTranslation()
  const { prompt, bookCount } = useCompiledPrompt()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  if (!prompt) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        {t('promptOutput.noBooks')}
      </Typography>
    )
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setSnackbarOpen(true)
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t('promptOutput.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t('promptOutput.subtitle', { count: bookCount })}
      </Typography>
      <TextField
        multiline
        fullWidth
        minRows={8}
        maxRows={20}
        value={prompt}
        slotProps={{ input: { readOnly: true } }}
        sx={{ mb: 2 }}
      />
      <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy}>
        {t('promptOutput.copyButton')}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={t('promptOutput.copySuccess')}
      />
    </Box>
  )
}
