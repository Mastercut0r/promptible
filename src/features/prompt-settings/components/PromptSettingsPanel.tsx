import { useMemo } from 'react'
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { usePromptSettingsStore } from '../../../store/usePromptSettingsStore'
import type { PromptLanguage } from '../../../store/usePromptSettingsStore'
import { useUniqueGenres } from '../../../store/useLibraryStore'

const SELECT_ALL_VALUE = '__select_all__'

export default function PromptSettingsPanel() {
  const { t } = useTranslation()
  const allGenres = useUniqueGenres()
  const { promptLanguage, selectedGenres, setPromptLanguage, setSelectedGenres } =
    usePromptSettingsStore()

  const activeGenres = useMemo(() => {
    if (selectedGenres === null) return allGenres
    return selectedGenres.filter((g) => allGenres.includes(g))
  }, [selectedGenres, allGenres])

  const allSelected = selectedGenres === null || activeGenres.length === allGenres.length

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setPromptLanguage(e.target.value as PromptLanguage)
  }

  const handleGenreChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[]

    if (value.includes(SELECT_ALL_VALUE)) {
      setSelectedGenres(allSelected ? [] : null)
      return
    }

    setSelectedGenres(value.length === allGenres.length ? null : value)
  }

  const renderGenreValue = () => {
    if (allSelected) return t('promptSettings.allSelected')
    if (activeGenres.length === 0) return '—'
    return t('promptSettings.genresSelected', { count: activeGenres.length })
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('promptSettings.title')}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>{t('promptSettings.outputLanguage')}</InputLabel>
          <Select
            value={promptLanguage}
            label={t('promptSettings.outputLanguage')}
            onChange={handleLanguageChange}
          >
            <MenuItem value="DE">{t('promptSettings.languageDE')}</MenuItem>
            <MenuItem value="EN">{t('promptSettings.languageEN')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 280 }}>
          <InputLabel>{t('promptSettings.genreFilter')}</InputLabel>
          <Select
            multiple
            value={activeGenres}
            label={t('promptSettings.genreFilter')}
            onChange={handleGenreChange}
            renderValue={renderGenreValue}
          >
            <MenuItem value={SELECT_ALL_VALUE}>
              <Checkbox checked={allSelected} indeterminate={!allSelected && activeGenres.length > 0} />
              <ListItemText
                primary={allSelected ? t('promptSettings.deselectAll') : t('promptSettings.selectAll')}
              />
            </MenuItem>
            {allGenres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={activeGenres.includes(genre)} />
                <ListItemText primary={genre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  )
}
