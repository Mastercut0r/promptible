import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useUniqueGenres } from '../../../store/useLibraryStore'
import { getGenreStyle, withOpacity } from '../../../shared/theme'
import { genreLabel } from '../../../shared/utils/genreUtils'
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
              background: withOpacity(genreStyle.spine, 0.20),
              borderColor: withOpacity(genreStyle.spine, 0.40),
              color: genreStyle.text,
            } : isActive ? {
              background: 'var(--bg-shelf)',
              color: 'var(--gold)',
            } : undefined}
            onClick={() => onGenreChange(genre)}
          >
            {genreStyle && (
              <span
                className={styles.dot}
                style={{
                  background: genreStyle.spine,
                  boxShadow: isActive ? `0 0 6px ${withOpacity(genreStyle.spine, 0.533)}` : undefined,
                }}
              />
            )}
            {isAll ? t('library.genreAll') : genreLabel(genre, t)}
          </button>
        )
      })}
    </div>
  )
}
