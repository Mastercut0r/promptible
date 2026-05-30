import { memo, useEffect, useState, type CSSProperties } from 'react'
import clsx from 'clsx'
import styles from './FloatingIllustrations.module.scss'
import fantasy from '../../assets/scenes/fantasy.webp'
import sciFi from '../../assets/scenes/sci-fi.webp'
import crime from '../../assets/scenes/crime.webp'
import adventure from '../../assets/scenes/adventure.webp'
import horror from '../../assets/scenes/horror.webp'
import romance from '../../assets/scenes/romance.webp'

// Genre-themed pencil illustrations that drift in the page background. Purely
// decorative: pointer-events disabled, aria-hidden, behind all content.
//
// These replace the earlier placeholder line-art SVGs (#31). The .webp assets
// are pre-processed to white line-art on a real transparent background, so they
// read as light strokes directly on the dark themes.
//
// Display model: a single slot on the LEFT and a single slot on the RIGHT, both
// anchored a fixed distance from the page centre so they flank the centred book
// at any viewport width (no growing gap on wide screens). Scenes rotate through
// the two slots one at a time, alternating sides — each scene fades in, grows
// while fading out, and is replaced by the next one. So at most two scenes are
// ever visible (one per side), never the cluttered all-at-once overlap.

// Rotation order. Six genres, one per slot per step.
const SCENE_LIST: readonly string[] = [fantasy, sciFi, crime, adventure, romance, horror]

// One rotation step. The `sceneCycle` animation (8s, defined in the stylesheet)
// runs for less than two steps so each scene has fully faded out before the same
// side is reused — keep STEP_MS and that duration in sync: animation < 2 × STEP_MS.
const STEP_MS = 5000

// Respect the user's reduced-motion preference: when set we skip the rotation
// timer entirely (the stylesheet shows each scene at a steady low opacity), so
// reduced-motion users get no swapping or scaling motion at all.
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface FloatingIllustrationsProps {
  /** Shifts the starting phase/order so the two host pages feel distinct. */
  variant?: 'import' | 'prompt'
}

const CONTAINER_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 0,
}

function FloatingIllustrations({ variant = 'import' }: FloatingIllustrationsProps) {
  // Stagger the prompt page by one step so it doesn't mirror the import page.
  const [tick, setTick] = useState(variant === 'prompt' ? 1 : 0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS)
    return () => clearInterval(id)
  }, [])

  // Even ticks refresh the left slot, odd ticks the right slot, so the two sides
  // update on alternate steps (offset by STEP_MS). Each slot shows the scene
  // from its most recent tick; the scene index walks the list via modulo.
  const leftTick = tick % 2 === 0 ? tick : tick - 1
  const rightTick = tick % 2 === 0 ? tick - 1 : tick

  const slots = [
    { side: 'left' as const, tick: leftTick },
    { side: 'right' as const, tick: rightTick },
  ].filter((slot) => slot.tick >= 0)

  return (
    <div aria-hidden="true" style={CONTAINER_STYLE}>
      {slots.map(({ side, tick: slotTick }) => {
        const src = SCENE_LIST[slotTick % SCENE_LIST.length]
        return (
          // key includes the tick so a new scene remounts the element, replaying
          // the one-shot sceneCycle animation from the start.
          <div key={`${side}-${slotTick}`} className={clsx(styles.slot, styles[side])}>
            <img className={styles.scene} src={src} alt="" decoding="async" />
          </div>
        )
      })}
    </div>
  )
}

export default memo(FloatingIllustrations)
