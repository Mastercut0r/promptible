import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import styles from './DragHint.module.scss'

interface DragHintProps {
  visible: boolean
}

export default function DragHint({ visible }: DragHintProps) {
  const { t } = useTranslation()

  return (
    <div className={clsx(styles.hint, visible && styles.visible)} aria-hidden>
      {t('library.dragHint')}
    </div>
  )
}
