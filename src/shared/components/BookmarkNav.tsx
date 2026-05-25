import clsx from 'clsx'
import type { View } from '../types'
import styles from './BookmarkNav.module.scss'

interface Tab {
  view: View
  emoji: string
  label: string
}

const TABS: Tab[] = [
  { view: 'import', emoji: '📜', label: 'The Beginning' },
  { view: 'library', emoji: '📚', label: 'The Library' },
  { view: 'prompt', emoji: '✦', label: 'The Revelation' },
]

interface BookmarkNavProps {
  currentView: View
  onNavigate: (view: View) => void
  booksImported: boolean
}

function BookmarkNav({ currentView, onNavigate, booksImported }: BookmarkNavProps) {
  return (
    <nav className={styles.nav}>
      {TABS.map(({ view, emoji, label }) => {
        const locked = view !== 'import' && !booksImported
        const active = currentView === view
        const className = clsx(styles.tab, { [styles.active]: active, [styles.disabled]: locked })

        return (
          <button
            key={view}
            className={className}
            onClick={() => onNavigate(view)}
            aria-current={active ? 'page' : undefined}
            disabled={locked}
            type="button"
          >
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.label}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BookmarkNav
