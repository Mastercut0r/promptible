import { useRef } from 'react'

function GoldenParticles() {
  const particles = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    })),
  ).current

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--gold)',
            opacity: 0,
            animation: `promptPageParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes promptPageParticleFloat {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          20% { opacity: 0.6; }
          80% { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-70px) scale(1.3); }
        }
      `}</style>
    </div>
  )
}

export default GoldenParticles
