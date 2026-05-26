import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import styles from './WaxSealButton.module.scss'

interface WaxSealButtonProps {
  textToCopy: string
}

function WaxSealButton({ textToCopy }: WaxSealButtonProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
    } catch {
      // clipboard API may fail in insecure contexts — still show visual feedback
    }
    setCopied(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 2000)
  }, [textToCopy])

  return (
    <button
      className={clsx(styles.seal, copied && styles.sealCopied)}
      onClick={handleClick}
      type="button"
    >
      <span className={styles.label}>
        {copied ? t('promptPage.copiedLabel') : t('promptPage.copyLabel')}
      </span>
      <span className={styles.subLabel}>
        {copied ? t('promptPage.copiedSubLabel') : t('promptPage.copySubLabel')}
      </span>
    </button>
  )
}

export default WaxSealButton
