import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useUniqueGenres } from '../../../store/useLibraryStore'
import { getGenreStyle } from '../../../shared/theme'
import styles from './GenreFilterBar.module.scss'

interface GenreFilterBarProps {
  activeGenre: string
  onGenreChange: (genre: string) => void
}

export default function GenreFilterBar({ activeGenre, onGenreChange }: GenreFilterBarProps) {
  const { t } = useTranslation()
  const genres = useUniqueGenres()
  const allGenres = ['All', ...genres]

  return (
    <div className={styles.bar}>
      {allGenres.map((genre) => {
        const isAll = genre === 'All'
        const isActive = activeGenre === genre
        const genreStyle = isAll ? null : getGenreStyle(genre)

        return (
          <button
            key={genre}
            type="button"
            className={clsx(styles.pill, isActive && styles.pillActive)}
            style={isActive && genreStyle ? {
              background: genreStyle.spine + '33',
              borderColor: genreStyle.spine + '66',
              color: genreStyle.text,
            } : isActive ? {
              background: 'var(--bg-shelf)',
              color: 'var(--gold)',
            } : undefined}
            onClick={() => onGenreChange(genre)}
          >
            {genreStyle && (
              <span
                className={clsx(styles.dot, isActive && styles.dotActive)}
                style={{
                  background: genreStyle.spine,
                  boxShadow: isActive ? `0 0 6px ${genreStyle.spine}88` : undefined,
                }}
              />
            )}
            {isAll ? t('library.genreAll') : genre}
          </button>
        )
      })}
    </div>
  )
}
