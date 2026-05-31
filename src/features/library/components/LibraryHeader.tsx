import { useTranslation } from 'react-i18next'
import styles from './LibraryHeader.module.scss'

interface LibraryHeaderProps {
  totalBooks: number
  ratedBooks: number
}

export default function LibraryHeader({ totalBooks, ratedBooks }: LibraryHeaderProps) {
  const { t } = useTranslation()
  const unrated = totalBooks - ratedBooks

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{t('library.title')}</h2>
      <p className={styles.stats}>
        {t('library.stats', { rated: ratedBooks, total: totalBooks, unrated })}
        {ratedBooks >= 3 && (
          <span className={styles.readyBadge}>
            <span className={styles.sparkle}>✦</span>
            {t('library.readyToConjure')}
          </span>
        )}
      </p>
    </div>
  )
}
