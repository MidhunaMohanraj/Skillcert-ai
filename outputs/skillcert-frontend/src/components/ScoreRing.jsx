export default function ScoreRing({ score, size = 120 }) {
  const r = size * 0.38
  const circumference = 2 * Math.PI * r
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ width: size, height: size, position: 'relative' }} className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#e2e8f0" strokeWidth={size * 0.065}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={size * 0.065}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s ease' }}
        />
      </svg>
      <div className="text-center">
        <div style={{ fontSize: size * 0.22, fontWeight: 900, color, lineHeight: 1 }}>{score}%</div>
        <div style={{ fontSize: size * 0.09, color: '#94a3b8', fontWeight: 600, marginTop: 2, letterSpacing: '1px' }}>SCORE</div>
      </div>
    </div>
  )
}
