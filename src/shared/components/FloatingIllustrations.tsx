import { memo, type CSSProperties } from 'react'
import styles from './FloatingIllustrations.module.scss'

// Genre-themed line-art scenes that drift in the page background. Purely
// decorative: pointer-events disabled, aria-hidden, behind all content.
//
// NOTE: These SVGs are placeholder line drawings ported from the design
// handoff (design_handoff_promptible/components/background-art.jsx). They are
// intended to be replaced with professionally illustrated pencil sketches
// (PNG/WebP) while keeping the same `sceneReveal` animation timing (#31).
//
// Stroke/fill use `currentColor`, so the line color follows the wrapper's
// `color: var(--text-light)` and adapts automatically to the active theme.

interface SceneProps {
  size: number
}

function SceneFantasy({ size }: SceneProps) {
  const w = size,
    h = size * 0.75
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <line x1={0} y1={h * 0.92} x2={w} y2={h * 0.92} strokeWidth="0.6" />
      {/* Knight */}
      <circle cx={w * 0.22} cy={h * 0.52} r={w * 0.035} />
      <polygon points={`${w * 0.19},${h * 0.48} ${w * 0.22},${h * 0.43} ${w * 0.25},${h * 0.48}`} />
      <line x1={w * 0.22} y1={h * 0.555} x2={w * 0.22} y2={h * 0.72} strokeWidth="2" />
      <line x1={w * 0.22} y1={h * 0.72} x2={w * 0.18} y2={h * 0.9} strokeWidth="1.5" />
      <line x1={w * 0.22} y1={h * 0.72} x2={w * 0.26} y2={h * 0.9} strokeWidth="1.5" />
      <line x1={w * 0.22} y1={h * 0.6} x2={w * 0.3} y2={h * 0.5} strokeWidth="1.3" />
      <line x1={w * 0.3} y1={h * 0.5} x2={w * 0.36} y2={h * 0.32} strokeWidth="1.8" />
      <line x1={w * 0.29} y1={h * 0.5} x2={w * 0.33} y2={h * 0.52} strokeWidth="1.5" />
      <line x1={w * 0.22} y1={h * 0.6} x2={w * 0.15} y2={h * 0.62} strokeWidth="1.3" />
      <ellipse cx={w * 0.13} cy={h * 0.64} rx={w * 0.03} ry={w * 0.04} strokeWidth="1.2" />
      <line x1={w * 0.13} y1={h * 0.6} x2={w * 0.13} y2={h * 0.68} strokeWidth="0.7" />
      <line x1={w * 0.1} y1={h * 0.64} x2={w * 0.16} y2={h * 0.64} strokeWidth="0.7" />
      {/* Dragon */}
      <ellipse cx={w * 0.62} cy={h * 0.5} rx={w * 0.14} ry={w * 0.1} strokeWidth="1.5" />
      <polygon points={`${w * 0.48},${h * 0.42} ${w * 0.42},${h * 0.38} ${w * 0.44},${h * 0.46}`} strokeWidth="1.3" />
      <circle cx={w * 0.5} cy={h * 0.4} r={w * 0.04} strokeWidth="1.2" />
      <circle cx={w * 0.485} cy={h * 0.385} r={w * 0.008} fill="currentColor" stroke="none" />
      <line x1={w * 0.52} y1={h * 0.37} x2={w * 0.55} y2={h * 0.28} strokeWidth="1" />
      <line x1={w * 0.5} y1={h * 0.36} x2={w * 0.51} y2={h * 0.27} strokeWidth="1" />
      <polygon points={`${w * 0.58},${h * 0.42} ${w * 0.68},${h * 0.15} ${w * 0.75},${h * 0.22} ${w * 0.7},${h * 0.38}`} strokeWidth="1" />
      <line x1={w * 0.68} y1={h * 0.15} x2={w * 0.63} y2={h * 0.32} strokeWidth="0.7" />
      <line x1={w * 0.72} y1={h * 0.19} x2={w * 0.66} y2={h * 0.36} strokeWidth="0.7" />
      <polygon points={`${w * 0.66},${h * 0.4} ${w * 0.78},${h * 0.2} ${w * 0.84},${h * 0.28} ${w * 0.76},${h * 0.42}`} strokeWidth="0.9" />
      <line x1={w * 0.55} y1={h * 0.58} x2={w * 0.52} y2={h * 0.78} strokeWidth="1.3" />
      <line x1={w * 0.52} y1={h * 0.78} x2={w * 0.48} y2={h * 0.8} strokeWidth="1" />
      <line x1={w * 0.68} y1={h * 0.58} x2={w * 0.7} y2={h * 0.78} strokeWidth="1.3" />
      <line x1={w * 0.7} y1={h * 0.78} x2={w * 0.74} y2={h * 0.8} strokeWidth="1" />
      <polyline points={`${w * 0.76},${h * 0.5} ${w * 0.84},${h * 0.55} ${w * 0.9},${h * 0.48} ${w * 0.95},${h * 0.52} ${w * 0.98},${h * 0.42}`} strokeWidth="1.2" />
      <polygon points={`${w * 0.42},${h * 0.38} ${w * 0.36},${h * 0.34} ${w * 0.38},${h * 0.4}`} strokeWidth="0.8" opacity="0.6" />
      <polygon points={`${w * 0.4},${h * 0.36} ${w * 0.33},${h * 0.32} ${w * 0.35},${h * 0.38}`} strokeWidth="0.7" opacity="0.5" />
      <polygon points={`${w * 0.38},${h * 0.38} ${w * 0.32},${h * 0.36} ${w * 0.34},${h * 0.42}`} strokeWidth="0.7" opacity="0.4" />
    </svg>
  )
}

function SceneSciFi({ size }: SceneProps) {
  const w = size,
    h = size * 0.7
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx={w * 0.5} cy={h * 0.5} rx={w * 0.3} ry={w * 0.08} strokeWidth="1.5" />
      <ellipse cx={w * 0.5} cy={h * 0.42} rx={w * 0.1} ry={w * 0.1} strokeWidth="1.2" />
      {/* Alien */}
      <ellipse cx={w * 0.5} cy={h * 0.38} rx={w * 0.04} ry={w * 0.05} strokeWidth="0.9" />
      <circle cx={w * 0.485} cy={h * 0.37} r={w * 0.012} fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx={w * 0.515} cy={h * 0.37} r={w * 0.012} fill="currentColor" stroke="none" opacity="0.5" />
      <line x1={w * 0.5} y1={h * 0.43} x2={w * 0.5} y2={h * 0.48} strokeWidth="0.8" />
      <line x1={w * 0.5} y1={h * 0.44} x2={w * 0.46} y2={h * 0.47} strokeWidth="0.7" />
      <line x1={w * 0.5} y1={h * 0.44} x2={w * 0.54} y2={h * 0.47} strokeWidth="0.7" />
      <line x1={w * 0.5} y1={h * 0.33} x2={w * 0.5} y2={h * 0.26} strokeWidth="0.7" />
      <circle cx={w * 0.5} cy={h * 0.25} r={2} fill="currentColor" stroke="none" opacity="0.4" />
      {/* Engine flames */}
      <polygon points={`${w * 0.22},${h * 0.48} ${w * 0.15},${h * 0.5} ${w * 0.22},${h * 0.52}`} strokeWidth="0.9" opacity="0.7" />
      <polygon points={`${w * 0.18},${h * 0.47} ${w * 0.1},${h * 0.5} ${w * 0.18},${h * 0.53}`} strokeWidth="0.7" opacity="0.5" />
      <polygon points={`${w * 0.14},${h * 0.48} ${w * 0.06},${h * 0.5} ${w * 0.14},${h * 0.52}`} strokeWidth="0.5" opacity="0.3" />
      <line x1={w * 0.35} y1={h * 0.45} x2={w * 0.28} y2={h * 0.35} strokeWidth="1.2" />
      <line x1={w * 0.65} y1={h * 0.45} x2={w * 0.72} y2={h * 0.35} strokeWidth="1.2" />
      <circle cx={w * 0.38} cy={h * 0.49} r={w * 0.015} strokeWidth="0.8" />
      <circle cx={w * 0.62} cy={h * 0.49} r={w * 0.015} strokeWidth="0.8" />
      {/* Stars */}
      <circle cx={w * 0.08} cy={h * 0.15} r={2} fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx={w * 0.88} cy={h * 0.12} r={2.5} fill="currentColor" stroke="none" opacity="0.4" />
      <circle cx={w * 0.75} cy={h * 0.75} r={1.5} fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx={w * 0.15} cy={h * 0.8} r={1.5} fill="currentColor" stroke="none" opacity="0.3" />
      <rect x={w * 0.92} y={h * 0.3} width={4} height={4} transform={`rotate(45 ${w * 0.92 + 2} ${h * 0.3 + 2})`} strokeWidth="0.7" />
      <rect x={w * 0.05} y={h * 0.4} width={3} height={3} transform={`rotate(45 ${w * 0.05 + 1.5} ${h * 0.4 + 1.5})`} strokeWidth="0.7" />
      {/* Ringed planet */}
      <circle cx={w * 0.85} cy={h * 0.65} r={w * 0.05} strokeWidth="1" />
      <ellipse cx={w * 0.85} cy={h * 0.65} rx={w * 0.09} ry={w * 0.015} strokeWidth="0.6" />
    </svg>
  )
}

function SceneCrime({ size }: SceneProps) {
  const w = size,
    h = size * 0.8
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <line x1={0} y1={h * 0.92} x2={w} y2={h * 0.92} strokeWidth="0.6" />
      {/* Detective */}
      <circle cx={w * 0.3} cy={h * 0.28} r={w * 0.035} />
      <line x1={w * 0.24} y1={h * 0.26} x2={w * 0.36} y2={h * 0.26} strokeWidth="1.5" />
      <rect x={w * 0.27} y={h * 0.2} width={w * 0.06} height={w * 0.04} rx={1} />
      <polygon points={`${w * 0.27},${h * 0.32} ${w * 0.33},${h * 0.32} ${w * 0.36},${h * 0.7} ${w * 0.24},${h * 0.7}`} strokeWidth="1.2" />
      <line x1={w * 0.3} y1={h * 0.32} x2={w * 0.3} y2={h * 0.65} strokeWidth="0.7" />
      <line x1={w * 0.27} y1={h * 0.7} x2={w * 0.25} y2={h * 0.9} strokeWidth="1.3" />
      <line x1={w * 0.33} y1={h * 0.7} x2={w * 0.35} y2={h * 0.9} strokeWidth="1.3" />
      <line x1={w * 0.33} y1={h * 0.42} x2={w * 0.42} y2={h * 0.52} strokeWidth="1.2" />
      <circle cx={w * 0.46} cy={h * 0.56} r={w * 0.04} strokeWidth="1.5" />
      <line x1={w * 0.43} y1={h * 0.53} x2={w * 0.42} y2={h * 0.52} strokeWidth="2" />
      <line x1={w * 0.27} y1={h * 0.42} x2={w * 0.25} y2={h * 0.52} strokeWidth="1" />
      {/* Chalk outline */}
      <ellipse cx={w * 0.68} cy={h * 0.82} rx={w * 0.08} ry={w * 0.02} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1={w * 0.68} y1={h * 0.84} x2={w * 0.68} y2={h * 0.88} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1={w * 0.68} y1={h * 0.85} x2={w * 0.62} y2={h * 0.87} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1={w * 0.68} y1={h * 0.85} x2={w * 0.74} y2={h * 0.83} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1={w * 0.68} y1={h * 0.88} x2={w * 0.64} y2={h * 0.92} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1={w * 0.68} y1={h * 0.88} x2={w * 0.72} y2={h * 0.92} strokeWidth="0.8" strokeDasharray="3 3" />
      {/* Crime tape */}
      <line x1={w * 0.52} y1={h * 0.55} x2={w * 0.92} y2={h * 0.55} strokeWidth="1" strokeDasharray="8 4" />
      <line x1={w * 0.52} y1={h * 0.55} x2={w * 0.52} y2={h * 0.92} strokeWidth="0.8" />
      <line x1={w * 0.92} y1={h * 0.55} x2={w * 0.92} y2={h * 0.92} strokeWidth="0.8" />
      <ellipse cx={w * 0.5} cy={h * 0.78} rx={3} ry={5} transform={`rotate(-15 ${w * 0.5} ${h * 0.78})`} strokeWidth="0.7" />
      <ellipse cx={w * 0.55} cy={h * 0.82} rx={3} ry={5} transform={`rotate(-10 ${w * 0.55} ${h * 0.82})`} strokeWidth="0.7" />
      {/* Lamp post */}
      <line x1={w * 0.12} y1={h * 0.15} x2={w * 0.12} y2={h * 0.92} strokeWidth="1.5" />
      <circle cx={w * 0.12} cy={h * 0.13} r={w * 0.025} strokeWidth="1" />
      <circle cx={w * 0.12} cy={h * 0.13} r={w * 0.015} fill="currentColor" stroke="none" opacity="0.3" />
    </svg>
  )
}

function SceneRomance({ size }: SceneProps) {
  const w = size,
    h = size * 0.8
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <line x1={w * 0.1} y1={h * 0.92} x2={w * 0.9} y2={h * 0.92} strokeWidth="0.6" />
      {/* Person 1 */}
      <circle cx={w * 0.42} cy={h * 0.28} r={w * 0.04} />
      <line x1={w * 0.38} y1={h * 0.25} x2={w * 0.37} y2={h * 0.35} strokeWidth="1" />
      <line x1={w * 0.39} y1={h * 0.24} x2={w * 0.38} y2={h * 0.33} strokeWidth="0.8" />
      <line x1={w * 0.42} y1={h * 0.32} x2={w * 0.42} y2={h * 0.55} strokeWidth="1.5" />
      <polygon points={`${w * 0.42},${h * 0.55} ${w * 0.36},${h * 0.82} ${w * 0.48},${h * 0.82}`} strokeWidth="1" />
      <line x1={w * 0.39} y1={h * 0.82} x2={w * 0.38} y2={h * 0.92} strokeWidth="1.2" />
      <line x1={w * 0.45} y1={h * 0.82} x2={w * 0.46} y2={h * 0.92} strokeWidth="1.2" />
      <line x1={w * 0.42} y1={h * 0.4} x2={w * 0.5} y2={h * 0.48} strokeWidth="1.2" />
      {/* Person 2 */}
      <circle cx={w * 0.56} cy={h * 0.26} r={w * 0.04} />
      <line x1={w * 0.56} y1={h * 0.3} x2={w * 0.56} y2={h * 0.6} strokeWidth="1.8" />
      <line x1={w * 0.56} y1={h * 0.6} x2={w * 0.53} y2={h * 0.82} strokeWidth="1.5" />
      <line x1={w * 0.53} y1={h * 0.82} x2={w * 0.52} y2={h * 0.92} strokeWidth="1.3" />
      <line x1={w * 0.56} y1={h * 0.6} x2={w * 0.59} y2={h * 0.82} strokeWidth="1.5" />
      <line x1={w * 0.59} y1={h * 0.82} x2={w * 0.6} y2={h * 0.92} strokeWidth="1.3" />
      <line x1={w * 0.56} y1={h * 0.38} x2={w * 0.5} y2={h * 0.48} strokeWidth="1.2" />
      <line x1={w * 0.56} y1={h * 0.4} x2={w * 0.48} y2={h * 0.42} strokeWidth="1" />
      <circle cx={w * 0.5} cy={h * 0.48} r={w * 0.015} strokeWidth="1" />
      <line x1={w * 0.44} y1={h * 0.27} x2={w * 0.47} y2={h * 0.27} strokeWidth="0.5" opacity="0.5" />
      {/* Hearts */}
      <polygon points={`${w * 0.48},${h * 0.12} ${w * 0.5},${h * 0.08} ${w * 0.52},${h * 0.12} ${w * 0.5},${h * 0.16}`} strokeWidth="0.8" />
      <polygon points={`${w * 0.58},${h * 0.1} ${w * 0.6},${h * 0.06} ${w * 0.62},${h * 0.1} ${w * 0.6},${h * 0.14}`} strokeWidth="0.7" opacity="0.6" />
      <polygon points={`${w * 0.38},${h * 0.14} ${w * 0.4},${h * 0.1} ${w * 0.42},${h * 0.14} ${w * 0.4},${h * 0.18}`} strokeWidth="0.6" opacity="0.4" />
      {/* Stars */}
      <circle cx={w * 0.15} cy={h * 0.1} r={1.5} fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx={w * 0.85} cy={h * 0.15} r={1.5} fill="currentColor" stroke="none" opacity="0.3" />
      <rect x={w * 0.75} y={h * 0.08} width={3} height={3} transform={`rotate(45 ${w * 0.75 + 1.5} ${h * 0.08 + 1.5})`} strokeWidth="0.7" opacity="0.5" />
    </svg>
  )
}

function SceneAdventure({ size }: SceneProps) {
  const w = size,
    h = size * 0.7
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <line x1={0} y1={h * 0.92} x2={w} y2={h * 0.92} strokeWidth="0.6" />
      {/* Lion */}
      <ellipse cx={w * 0.5} cy={h * 0.6} rx={w * 0.18} ry={w * 0.08} strokeWidth="1.5" />
      <circle cx={w * 0.35} cy={h * 0.48} r={w * 0.08} strokeWidth="1.3" />
      <circle cx={w * 0.33} cy={h * 0.48} r={w * 0.045} strokeWidth="1" />
      <circle cx={w * 0.315} cy={h * 0.47} r={w * 0.008} fill="currentColor" stroke="none" />
      <ellipse cx={w * 0.29} cy={h * 0.5} rx={w * 0.02} ry={w * 0.012} strokeWidth="0.8" />
      <line x1={w * 0.27} y1={h * 0.5} x2={w * 0.26} y2={h * 0.48} strokeWidth="0.6" />
      <polygon points={`${w * 0.34},${h * 0.4} ${w * 0.36},${h * 0.36} ${w * 0.38},${h * 0.4}`} strokeWidth="0.8" />
      <polygon points={`${w * 0.3},${h * 0.41} ${w * 0.32},${h * 0.37} ${w * 0.34},${h * 0.41}`} strokeWidth="0.8" />
      <line x1={w * 0.38} y1={h * 0.66} x2={w * 0.35} y2={h * 0.82} strokeWidth="1.5" />
      <line x1={w * 0.35} y1={h * 0.82} x2={w * 0.33} y2={h * 0.84} strokeWidth="1" />
      <line x1={w * 0.42} y1={h * 0.66} x2={w * 0.4} y2={h * 0.85} strokeWidth="1.3" />
      <line x1={w * 0.4} y1={h * 0.85} x2={w * 0.38} y2={h * 0.87} strokeWidth="1" />
      <line x1={w * 0.6} y1={h * 0.65} x2={w * 0.62} y2={h * 0.8} strokeWidth="1.5" />
      <line x1={w * 0.62} y1={h * 0.8} x2={w * 0.64} y2={h * 0.82} strokeWidth="1" />
      <line x1={w * 0.64} y1={h * 0.65} x2={w * 0.67} y2={h * 0.82} strokeWidth="1.3" />
      <line x1={w * 0.67} y1={h * 0.82} x2={w * 0.69} y2={h * 0.84} strokeWidth="1" />
      <polyline points={`${w * 0.68},${h * 0.57} ${w * 0.75},${h * 0.5} ${w * 0.8},${h * 0.52} ${w * 0.82},${h * 0.46}`} strokeWidth="1.2" />
      <circle cx={w * 0.83} cy={h * 0.44} r={w * 0.015} fill="currentColor" stroke="none" opacity="0.3" />
      {/* Rider */}
      <circle cx={w * 0.5} cy={h * 0.3} r={w * 0.035} />
      <line x1={w * 0.5} y1={h * 0.335} x2={w * 0.5} y2={h * 0.52} strokeWidth="1.5" />
      <line x1={w * 0.5} y1={h * 0.4} x2={w * 0.56} y2={h * 0.28} strokeWidth="1.2" />
      <line x1={w * 0.5} y1={h * 0.4} x2={w * 0.44} y2={h * 0.3} strokeWidth="1.2" />
      <line x1={w * 0.5} y1={h * 0.52} x2={w * 0.44} y2={h * 0.58} strokeWidth="1.2" />
      <line x1={w * 0.5} y1={h * 0.52} x2={w * 0.56} y2={h * 0.58} strokeWidth="1.2" />
      <polyline points={`${w * 0.5},${h * 0.35} ${w * 0.55},${h * 0.38} ${w * 0.58},${h * 0.32} ${w * 0.62},${h * 0.36}`} strokeWidth="0.9" />
      {/* Dust */}
      <circle cx={w * 0.25} cy={h * 0.88} r={w * 0.02} strokeWidth="0.6" opacity="0.4" />
      <circle cx={w * 0.2} cy={h * 0.86} r={w * 0.015} strokeWidth="0.5" opacity="0.3" />
      <circle cx={w * 0.18} cy={h * 0.9} r={w * 0.012} strokeWidth="0.4" opacity="0.25" />
    </svg>
  )
}

function SceneHorror({ size }: SceneProps) {
  const w = size,
    h = size * 0.85
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Sea */}
      <polyline points={`${0},${h * 0.65} ${w * 0.08},${h * 0.62} ${w * 0.15},${h * 0.66} ${w * 0.22},${h * 0.62} ${w * 0.3},${h * 0.66} ${w * 0.38},${h * 0.63} ${w * 0.45},${h * 0.67} ${w * 0.52},${h * 0.62} ${w * 0.6},${h * 0.66} ${w * 0.68},${h * 0.63} ${w * 0.75},${h * 0.67} ${w * 0.82},${h * 0.62} ${w * 0.9},${h * 0.66} ${w},${h * 0.63}`} strokeWidth="1" />
      <polyline points={`${0},${h * 0.72} ${w * 0.1},${h * 0.7} ${w * 0.2},${h * 0.73} ${w * 0.3},${h * 0.69} ${w * 0.4},${h * 0.73} ${w * 0.5},${h * 0.7} ${w * 0.6},${h * 0.74} ${w * 0.7},${h * 0.7} ${w * 0.8},${h * 0.73} ${w * 0.9},${h * 0.7} ${w},${h * 0.73}`} strokeWidth="0.8" opacity="0.6" />
      <polyline points={`${0},${h * 0.8} ${w * 0.12},${h * 0.78} ${w * 0.25},${h * 0.81} ${w * 0.38},${h * 0.78} ${w * 0.5},${h * 0.82} ${w * 0.62},${h * 0.78} ${w * 0.75},${h * 0.81} ${w * 0.88},${h * 0.78} ${w},${h * 0.81}`} strokeWidth="0.6" opacity="0.4" />
      {/* Cthulhu head */}
      <ellipse cx={w * 0.5} cy={h * 0.35} rx={w * 0.14} ry={w * 0.15} strokeWidth="1.5" />
      <circle cx={w * 0.44} cy={h * 0.3} r={w * 0.025} strokeWidth="1" />
      <circle cx={w * 0.44} cy={h * 0.3} r={w * 0.01} fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx={w * 0.56} cy={h * 0.3} r={w * 0.025} strokeWidth="1" />
      <circle cx={w * 0.56} cy={h * 0.3} r={w * 0.01} fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx={w * 0.5} cy={h * 0.25} r={w * 0.018} strokeWidth="0.8" />
      <circle cx={w * 0.5} cy={h * 0.25} r={w * 0.007} fill="currentColor" stroke="none" opacity="0.4" />
      {/* Wings */}
      <polygon points={`${w * 0.38},${h * 0.3} ${w * 0.2},${h * 0.12} ${w * 0.15},${h * 0.2} ${w * 0.22},${h * 0.35} ${w * 0.36},${h * 0.38}`} strokeWidth="1" />
      <line x1={w * 0.2} y1={h * 0.12} x2={w * 0.28} y2={h * 0.28} strokeWidth="0.6" />
      <line x1={w * 0.17} y1={h * 0.17} x2={w * 0.26} y2={h * 0.32} strokeWidth="0.6" />
      <polygon points={`${w * 0.62},${h * 0.3} ${w * 0.8},${h * 0.12} ${w * 0.85},${h * 0.2} ${w * 0.78},${h * 0.35} ${w * 0.64},${h * 0.38}`} strokeWidth="1" />
      <line x1={w * 0.8} y1={h * 0.12} x2={w * 0.72} y2={h * 0.28} strokeWidth="0.6" />
      <line x1={w * 0.83} y1={h * 0.17} x2={w * 0.74} y2={h * 0.32} strokeWidth="0.6" />
      {/* Tentacles */}
      <polyline points={`${w * 0.44},${h * 0.48} ${w * 0.4},${h * 0.55} ${w * 0.38},${h * 0.62} ${w * 0.35},${h * 0.58} ${w * 0.3},${h * 0.65} ${w * 0.25},${h * 0.6}`} strokeWidth="1.5" />
      <polyline points={`${w * 0.48},${h * 0.5} ${w * 0.45},${h * 0.58} ${w * 0.42},${h * 0.65} ${w * 0.4},${h * 0.6} ${w * 0.38},${h * 0.68}`} strokeWidth="1.3" />
      <polyline points={`${w * 0.52},${h * 0.5} ${w * 0.55},${h * 0.58} ${w * 0.58},${h * 0.65} ${w * 0.6},${h * 0.6} ${w * 0.62},${h * 0.68}`} strokeWidth="1.3" />
      <polyline points={`${w * 0.56},${h * 0.48} ${w * 0.6},${h * 0.55} ${w * 0.62},${h * 0.62} ${w * 0.65},${h * 0.58} ${w * 0.7},${h * 0.65} ${w * 0.75},${h * 0.6}`} strokeWidth="1.5" />
      <polyline points={`${w * 0.42},${h * 0.52} ${w * 0.35},${h * 0.56} ${w * 0.3},${h * 0.54} ${w * 0.25},${h * 0.58} ${w * 0.2},${h * 0.55}`} strokeWidth="1.1" />
      <polyline points={`${w * 0.58},${h * 0.52} ${w * 0.65},${h * 0.56} ${w * 0.7},${h * 0.54} ${w * 0.75},${h * 0.58} ${w * 0.8},${h * 0.55}`} strokeWidth="1.1" />
      <polyline points={`${w * 0.25},${h * 0.6} ${w * 0.23},${h * 0.56} ${w * 0.22},${h * 0.58}`} strokeWidth="0.9" />
      <polyline points={`${w * 0.75},${h * 0.6} ${w * 0.77},${h * 0.56} ${w * 0.78},${h * 0.58}`} strokeWidth="0.9" />
      {/* Sky */}
      <polyline points={`${w * 0.12},${h * 0.05} ${w * 0.14},${h * 0.12} ${w * 0.11},${h * 0.14} ${w * 0.13},${h * 0.2}`} strokeWidth="0.8" opacity="0.5" />
      <ellipse cx={w * 0.2} cy={h * 0.06} rx={w * 0.08} ry={w * 0.025} strokeWidth="0.6" opacity="0.4" />
      <ellipse cx={w * 0.8} cy={h * 0.08} rx={w * 0.1} ry={w * 0.03} strokeWidth="0.6" opacity="0.4" />
    </svg>
  )
}

const SCENE_COMPONENTS = [SceneFantasy, SceneSciFi, SceneCrime, SceneRomance, SceneAdventure, SceneHorror]

// Absolute viewport anchor points (in %, top-left of each scene). Scenes hug the
// left/right edges (some clipped off-screen) so the central vertical band stays
// clear for the page title and the centered book — keeping that content readable.
const SCENE_POSITIONS = [
  { x: -3, y: 4 }, // top-left
  { x: 73, y: 3 }, // top-right
  { x: -4, y: 52 }, // bottom-left
  { x: 72, y: 50 }, // bottom-right
  { x: -5, y: 28 }, // mid-left
  { x: 75, y: 30 }, // mid-right
] as const

interface FloatingIllustrationsProps {
  /** Controls which scene lands in which position slot. */
  variant?: 'import' | 'prompt'
}

const CONTAINER_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 0,
  color: 'var(--text-light)',
}

// Memoized: the scenes are static and only depend on `variant`, so this avoids
// re-rendering 6 heavy SVGs whenever a host page (ImportPage / PromptOutputPanel)
// re-renders for unrelated state changes.
function FloatingIllustrations({ variant = 'import' }: FloatingIllustrationsProps) {
  // Rotate the position assignment so the two pages feel distinct.
  const sceneSeed = variant === 'prompt' ? 3 : 0

  return (
    <div aria-hidden="true" style={CONTAINER_STYLE}>
      {SCENE_COMPONENTS.map((SceneComp, i) => {
        const pos = SCENE_POSITIONS[(i + sceneSeed) % SCENE_POSITIONS.length]
        const size = 300 + (i % 3) * 30
        // Duration 30–55s, staggered 6s apart (sceneReveal animation).
        const duration = 30 + i * 5
        const delay = i * 6
        return (
          <div
            key={i}
            className={styles.scene}
            // The animation is driven by the .scene CSS class via these custom
            // properties (not an inline `animation`), so the reduced-motion rule
            // can override it without needing !important. styles.sceneReveal
            // resolves to the CSS-Modules-scoped keyframe name.
            style={
              {
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                '--scene-keyframes': styles.sceneReveal,
                '--scene-duration': `${duration}s`,
                '--scene-delay': `${delay}s`,
              } as CSSProperties
            }
          >
            <SceneComp size={size} />
          </div>
        )
      })}
    </div>
  )
}

export default memo(FloatingIllustrations)
