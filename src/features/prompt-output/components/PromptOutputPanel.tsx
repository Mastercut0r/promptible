import { useState } from 'react'
import { Alert, Box, Button, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { useCompiledPrompt } from '../hooks/useCompiledPrompt'

interface PromptOutputPanelProps {
  onClose: () => void
}

export default function PromptOutputPanel({ onClose }: PromptOutputPanelProps) {
  const { t } = useTranslation()
  const { prompt, bookCount } = useCompiledPrompt()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [copyError, setCopyError] = useState(false)

  if (!prompt) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        {t('promptOutput.noBooks')}
      </Typography>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyError(false)
      setSnackbarOpen(true)
    } catch {
      setCopyError(true)
      setSnackbarOpen(true)
    }
  }

  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">
          {t('promptOutput.title')}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
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
      >
        <Alert
          severity={copyError ? 'error' : 'success'}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {copyError ? t('promptOutput.copyError') : t('promptOutput.copySuccess')}
        </Alert>
      </Snackbar>
    </Box>
  )
}
