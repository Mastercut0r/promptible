import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type AppField, type ColumnMapping, APP_FIELDS } from '../types'

const REQUIRED_MAPPING_FIELDS: AppField[] = ['title', 'authors'];

interface ColumnMappingModalProps {
  open: boolean
  headers: string[]
  mapping: ColumnMapping
  onMappingChange: (mapping: ColumnMapping) => void
  onContinue: () => void
  onCancel: () => void
}

export default function ColumnMappingModal({
  open,
  headers,
  mapping,
  onMappingChange,
  onContinue,
  onCancel,
}: ColumnMappingModalProps) {
  const { t } = useTranslation()

  const handleChange = (field: AppField, value: string) => {
    onMappingChange({ ...mapping, [field]: value })
  }

  const isMappingValid = REQUIRED_MAPPING_FIELDS.every((field) => mapping[field] && mapping[field].trim() !== '');

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onCancel}>
      <DialogTitle>{t('mapping.title')}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t('mapping.subtitle')}
        </Typography>
        <Stack spacing={2}>
          {APP_FIELDS.map((field) => {
            const isRequired = REQUIRED_MAPPING_FIELDS.includes(field);
            const isMissing = isRequired && !mapping[field]; 
            return (
            <Box key={field} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ minWidth: 160, flexShrink: 0, color: isMissing ? 'error.main' : 'inherit' }}>
                {t(`mapping.field_${field}`)} {isRequired ? '*' : ''}
              </Typography>
              <FormControl 
                fullWidth size="small"
                error={isMissing}>
                <InputLabel>{t('mapping.placeholder')}</InputLabel>
                <Select
                  value={mapping[field] ?? ''}
                  label={t('mapping.placeholder')}
                  onChange={(e) => handleChange(field, e.target.value)}
                >
                  <MenuItem value="">
                    <em>{t('mapping.not_mapped')}</em>
                  </MenuItem>
                  {headers.map((header) => (
                    <MenuItem key={header} value={header}>
                      {header}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            );
          }
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t('mapping.cancel')}</Button>
        <Button variant="contained" disabled={!isMappingValid} onClick={onContinue}>
          {t('mapping.continue')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
