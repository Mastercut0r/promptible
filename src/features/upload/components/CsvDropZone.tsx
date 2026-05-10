import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useTranslation } from 'react-i18next'

interface CsvDropZoneProps {
  onFileDrop: (file: File) => void
}

export default function CsvDropZone({ onFileDrop }: CsvDropZoneProps) {
  const { t } = useTranslation()

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) onFileDrop(accepted[0])
    },
    [onFileDrop],
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  })

  const borderColor = isDragReject
    ? 'error.main'
    : isDragActive
      ? 'primary.main'
      : 'divider'

  const bgColor = isDragReject
    ? 'error.light'
    : isDragActive
      ? 'action.hover'
      : 'background.paper'

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor,
        borderRadius: 3,
        bgcolor: bgColor,
        p: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        transition: 'border-color 0.2s, background-color 0.2s',
        outline: 'none',
        '&:focus-visible': {
          borderColor: 'primary.main',
          boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.light}`,
        },
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 56, color: isDragReject ? 'error.main' : 'primary.main' }} />
      <Typography variant="h6" align="center">
        {isDragActive && !isDragReject
          ? t('dropzone.active')
          : isDragReject
            ? t('dropzone.rejected')
            : t('dropzone.title')}
      </Typography>
      {!isDragActive && (
        <>
          <Typography variant="body2" color="text.secondary" align="center">
            {t('dropzone.subtitle')}
          </Typography>
          <Typography variant="caption" color="text.disabled" align="center">
            {t('dropzone.hint')}
          </Typography>
        </>
      )}
    </Box>
  )
}
