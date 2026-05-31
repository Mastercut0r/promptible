import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import OrnamentDivider from '../../../shared/components/OrnamentDivider'
import { getGenreStyle, withOpacity } from '../../../shared/theme'
import { genreLabel } from '../../../shared/utils/genreUtils'
import { usePromptSettingsStore, type PromptLanguage } from '../../../store/usePromptSettingsStore'
import { useUniqueGenres } from '../../../store/useLibraryStore'
import styles from './PromptSettingsPage.module.scss'

interface PromptSettingsPageProps {
  onReveal: () => void
  hasPrompt: boolean
}

export default function PromptSettingsPage({ onReveal, hasPrompt }: PromptSettingsPageProps) {
  const { t } = useTranslation()
  const allGenres = useUniqueGenres()
  const { promptLanguage, selectedGenres, setPromptLanguage, setSelectedGenres, pruneGenres } =
    usePromptSettingsStore()

  useEffect(() => {
    pruneGenres(allGenres)
  }, [allGenres, pruneGenres])

  const activeGenres = useMemo(() => {
    if (selectedGenres === null) return allGenres
    return selectedGenres.filter((g) => allGenres.includes(g))
  }, [selectedGenres, allGenres])

  const activeSet = useMemo(() => new Set(activeGenres), [activeGenres])
  const allSelected = selectedGenres === null || activeGenres.length === allGenres.length

  const toggleGenre = (genre: string) => {
    if (allSelected) {
      setSelectedGenres(allGenres.filter((g) => g !== genre))
    } else if (activeSet.has(genre)) {
      setSelectedGenres(activeGenres.filter((g) => g !== genre))
    } else {
      const next = [...activeGenres, genre]
      setSelectedGenres(next.length === allGenres.length ? null : next)
    }
  }

  const toggleAll = () => {
    setSelectedGenres(allSelected ? [] : null)
  }

  const canReveal = activeGenres.length > 0 && hasPrompt
  // Explain why the reveal button is disabled (genre vs. unrated-books reason).
  const disabledHint = !canReveal
    ? activeGenres.length === 0
      ? t('settingsPage.revealHintNoGenre')
      : // genres selected but no rated books in those genres → no prompt to reveal
        t('settingsPage.revealHintNoBooks')
    : null

  return (
    <div className={styles.page}>
      <h3 className={styles.title}>{t('settingsPage.title')}</h3>
      <p className={styles.subtitle}>{t('settingsPage.subtitle')}</p>
      <OrnamentDivider className={styles.divider} />

      <div className={styles.form}>
        {/* Language */}
        <div>
          <label className={styles.fieldLabel} htmlFor="prompt-language">
            {t('settingsPage.languageLabel')}
          </label>
          <select
            id="prompt-language"
            className={styles.languageSelect}
            value={promptLanguage}
            onChange={(e) => setPromptLanguage(e.target.value as PromptLanguage)}
          >
            <option value="DE">{t('settingsPage.languageDE')}</option>
            <option value="EN">{t('settingsPage.languageEN')}</option>
          </select>
        </div>

        {/* Genre pills */}
        <div>
          <div className={styles.genreHeader}>
            <span className={styles.fieldLabel}>{t('settingsPage.genreLabel')}</span>
            <button type="button" className={styles.toggleAll} aria-pressed={allSelected} onClick={toggleAll}>
              {allSelected ? t('settingsPage.deselectAll') : t('settingsPage.selectAll')}
            </button>
          </div>
          <div className={styles.pills}>
            {allGenres.map((genre) => {
              const genreStyle = getGenreStyle(genre)
              const isActive = allSelected || activeSet.has(genre)
              return (
                <button
                  key={genre}
                  type="button"
                  aria-pressed={isActive}
                  className={clsx(styles.pill, isActive && styles.pillActive)}
                  style={
                    isActive
                      ? {
                          background: withOpacity(genreStyle.spine, 0.20),
                          borderColor: withOpacity(genreStyle.spine, 0.40),
                        }
                      : undefined
                  }
                  onClick={() => toggleGenre(genre)}
                >
                  <span
                    className={styles.dot}
                    style={{
                      background: genreStyle.spine,
                      boxShadow: isActive ? `0 0 6px ${withOpacity(genreStyle.spine, 0.533)}` : undefined,
                    }}
                  />
                  {genreLabel(genre, t)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Reveal button */}
        <button
          type="button"
          className={clsx(styles.revealButton, !canReveal && styles.revealButtonDisabled)}
          // Use aria-disabled (not the HTML disabled attr) so the button stays
          // focusable and screen readers can reach its aria-describedby hint.
          aria-disabled={!canReveal || undefined}
          aria-describedby={disabledHint ? 'reveal-hint' : undefined}
          onClick={canReveal ? onReveal : undefined}
        >
          {t('settingsPage.revealButton')}
        </button>

        {disabledHint && (
          <p id="reveal-hint" className={styles.revealHint} role="note">
            {disabledHint}
          </p>
        )}
      </div>
    </div>
  )
}
