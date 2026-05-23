import { memo, type MouseEvent } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import ThumbDown from '@mui/icons-material/ThumbDown'
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined'
import SentimentNeutral from '@mui/icons-material/SentimentNeutral'
import SentimentNeutralOutlined from '@mui/icons-material/SentimentNeutralOutlined'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined'
import { useTranslation } from 'react-i18next'
import { useLibraryStore } from '../../../store/useLibraryStore'
import type { AppRating } from '../../../shared/types'
import styles from './BookRating.module.scss'

interface BookRatingProps {
  bookId: string
  currentRating: AppRating
}

const RATING_OPTIONS = [
  {
    value: 'DISLIKED' as const,
    FilledIcon: ThumbDown,
    OutlinedIcon: ThumbDownOutlined,
    color: 'error' as const,
    tooltipKey: 'AppRating.DISLIKED',
  },
  {
    value: 'NEUTRAL' as const,
    FilledIcon: SentimentNeutral,
    OutlinedIcon: SentimentNeutralOutlined,
    color: 'warning' as const,
    tooltipKey: 'AppRating.NEUTRAL',
  },
  {
    value: 'LOVED' as const,
    FilledIcon: Favorite,
    OutlinedIcon: FavoriteOutlined,
    color: 'success' as const,
    tooltipKey: 'AppRating.LOVED',
  },
]

const BookRating = memo(function BookRating({ bookId, currentRating }: BookRatingProps) {
  const { t } = useTranslation()
  const setRating = useLibraryStore((state) => state.setRating)

  const handleClick = (e: MouseEvent, value: AppRating) => {
    e.stopPropagation()
    setRating(bookId, currentRating === value ? 'UNRATED' : value)
  }

  return (
    <div className={styles.container}>
      {RATING_OPTIONS.map((option) => {
        const isActive = currentRating === option.value
        const Icon = isActive ? option.FilledIcon : option.OutlinedIcon

        return (
          <Tooltip key={option.value} title={t(option.tooltipKey)}>
            <IconButton
              size="small"
              color={isActive ? option.color : 'default'}
              aria-label={t(option.tooltipKey)}
              onClick={(e) => handleClick(e, option.value)}
            >
              <Icon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      })}
    </div>
  )
})

export default BookRating
