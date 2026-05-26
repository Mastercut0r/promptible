import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import styles from './BookDropZone.module.scss'

interface BookDropZoneProps {
  onFileDrop: (file: File) => void
  fileLoaded: boolean
}

export default function BookDropZone({ onFileDrop, fileLoaded }: BookDropZoneProps) {
  const { t } = useTranslation()

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) onFileDrop(accepted[0])
    },
    [onFileDrop],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
      'text/plain': ['.csv'],
    },
    multiple: false,
    noClick: fileLoaded,
    noDrag: fileLoaded,
  })

  return (
    <div
      {...getRootProps()}
      className={clsx(styles.dropZone, isDragActive && styles.dragOver)}
    >
      <input {...getInputProps()} />
      {fileLoaded ? (
        <div>
          <div className={styles.successIcon}>✦</div>
          <p className={styles.successTitle}>{t('importPage.dropSuccess')}</p>
          <p className={styles.successHint}>{t('importPage.dropSuccessHint')}</p>
        </div>
      ) : (
        <div>
          <div className={styles.iconCircle}>↓</div>
          <p className={styles.dropTitle}>{t('importPage.dropTitle')}</p>
          <p className={styles.dropSubtitle}>{t('importPage.dropSubtitle')}</p>
        </div>
      )}
    </div>
  )
}
