import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import ParchmentSurface from '../../../shared/components/ParchmentSurface'
import CornerFlourish from '../../../shared/components/CornerFlourish'
import OrnamentDivider from '../../../shared/components/OrnamentDivider'
import { type AppField, type ColumnMapping, APP_FIELDS } from '../types'
import styles from './ColumnMappingModal.module.scss'

const REQUIRED_MAPPING_FIELDS: AppField[] = ['title', 'authors']

interface ColumnMappingModalProps {
  open: boolean
  headers: string[]
  mapping: ColumnMapping
  onMappingChange: (mapping: ColumnMapping) => void
  autoConvert: boolean
  onAutoConvertChange: (value: boolean) => void
  onContinue: () => void
  onCancel: () => void
}

export default function ColumnMappingModal({
  open,
  headers,
  mapping,
  onMappingChange,
  autoConvert,
  onAutoConvertChange,
  onContinue,
  onCancel,
}: ColumnMappingModalProps) {
  const { t } = useTranslation()
  const onCancelRef = useRef(onCancel)
  const triggerRef = useRef<Element | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onCancelRef.current = onCancel
  })

  const handleChange = (field: AppField, value: string) => {
    onMappingChange({ ...mapping, [field]: value })
  }

  const isMappingValid = REQUIRED_MAPPING_FIELDS.every(
    (field) => mapping[field] && mapping[field].trim() !== '',
  )

  // Escape key, body scroll lock, focus management
  useEffect(() => {
    if (!open) return

    // Save trigger element for focus restore
    triggerRef.current = document.activeElement

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Focus first interactive element
    requestAnimationFrame(() => {
      const firstSelect = dialogRef.current?.querySelector('select')
      firstSelect?.focus()
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancelRef.current()
        return
      }

      // Focus trap: cycle Tab within the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'select, input, button, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus to trigger element
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus()
      }
    }
  }, [open])

  if (!open) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onCancel()
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mapping-dialog-title"
      ref={dialogRef}
      className={styles.backdrop}
      onClick={handleBackdropClick}
    >
      <ParchmentSurface className={styles.modalInner}>
        <CornerFlourish corner="top-left" size={40} color="var(--cover-accent)" />
        <CornerFlourish corner="top-right" size={40} color="var(--cover-accent)" />
        <CornerFlourish corner="bottom-left" size={40} color="var(--cover-accent)" />
        <CornerFlourish corner="bottom-right" size={40} color="var(--cover-accent)" />

        {/* Title */}
        <h2 id="mapping-dialog-title" className={styles.title}>
          {t('mapping.title')}
        </h2>
        <p className={styles.subtitle}>{t('mapping.subtitle')}</p>

        {/* Field mapping rows */}
        <div className={styles.fields}>
          {APP_FIELDS.map((field) => {
            const isRequired = REQUIRED_MAPPING_FIELDS.includes(field)
            const isMissing = isRequired && !mapping[field]
            return (
              <div key={field} className={styles.fieldRow}>
                <span
                  className={clsx(
                    styles.fieldLabel,
                    isMissing && styles.fieldLabelMissing,
                  )}
                >
                  {t(`mapping.field_${field}`)}
                  {isRequired ? ' *' : ''}
                </span>
                <select
                  className={clsx(styles.select, isMissing && styles.selectError)}
                  value={mapping[field] ?? ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                >
                  <option value="">— {t('mapping.not_mapped')} —</option>
                  {headers.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className={styles.dividerWrap}>
          <OrnamentDivider />
        </div>

        {/* Auto-convert checkbox */}
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkboxHidden}
            checked={autoConvert}
            onChange={(e) => onAutoConvertChange(e.target.checked)}
          />
          <span
            className={clsx(
              styles.checkbox,
              autoConvert && styles.checkboxChecked,
            )}
          />
          <span className={styles.checkboxLabel}>
            {t('mapping.auto_convert')}
          </span>
        </label>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={onCancel}
          >
            {t('mapping.cancel')}
          </button>
          <button
            type="button"
            className={styles.btnContinue}
            disabled={!isMappingValid}
            onClick={onContinue}
          >
            {t('mapping.continue')}
          </button>
        </div>
      </ParchmentSurface>
    </div>,
    document.body,
  )
}
