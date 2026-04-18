import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const STEPS = [
  { icon: '☁️', label: 'Uploading to secure storage', detail: 'Butterbase S3-compatible object store · Encrypted at rest', ms: 2000 },
  { icon: '🎬', label: 'Extracting video frames', detail: 'Sampling at 10fps for frame-level analysis', ms: 2500 },
  { icon: '🤖', label: 'Running Claude Vision analysis', detail: 'Cumulus Labs GPU · Serverless inference endpoint', ms: 4500 },
  { icon: '📐', label: 'Scoring rubric criteria', detail: 'CPR rubric · 5 criteria · 30-compression cycle', ms: 2500 },
  { icon: '📊', label: 'Generating timestamped report', detail: 'Identifying failure moments and improvement areas', ms: 1500 },
]

export default function ProcessingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const total = STEPS.reduce((a, s) => a + s.ms, 0)
  const progress = Math.round((step / STEPS.length) * 100)

  useEffect(() => {
    let acc = 0
    const timers = STEPS.map((s, i) => {
      acc += s.ms
      return setTimeout(() => setStep(i + 1), acc)
    })
    const done = setTimeout(() => navigate(`/feedback/${id}`), acc + 600)
    const tick = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { timers.forEach(clearTimeout); clearTimeout(done); clearInterval(tick) }
  }, [])

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[500px] text-center">

        {/* Animated brain icon */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          {/* Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-100 animate-pulse-slow" />
          <div className="absolute inset-3 rounded-full border-2 border-blue-100/60 animate-pulse-slow" style={{ animationDelay: '0.3s' }} />
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center text-[40px]">🧠</div>
          {/* Orbiting dots */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <div key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{
                background: ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'][i],
                transform: `rotate(${deg}deg) translateX(52px) translateY(-50%)`,
                transformOrigin: '0 50%',
                animation: `spin ${2 + i * 0.25}s linear infinite`,
              }}
            />
          ))}
        </div>

        <h2 className="text-[26px] font-black text-slate-900 tracking-tight mb-3">
          Analyzing Your Technique
        </h2>
        <p className="text-slate-500 text-base mb-8 leading-relaxed">
          Claude Vision is scoring each criterion frame-by-frame on Cumulus Labs GPU infrastructure
        </p>

        {/* Steps */}
        <div className="card p-6 mb-6 text-left shadow-md">
          {STEPS.map((s, i) => {
            const state = i < step ? 'done' : i === step ? 'active' : 'pending'
            return (
              <div key={i}
                className={`flex items-center gap-3.5 py-3 ${i < STEPS.length - 1 ? 'border-b border-gray-50' : ''} transition-opacity duration-300 ${state === 'pending' ? 'opacity-35' : 'opacity-100'}`}
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${state === 'done' ? 'bg-emerald-50' : state === 'active' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  {state === 'done'
                    ? <CheckCircle size={16} className="text-emerald-500" />
                    : state === 'active'
                    ? <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />
                    : <span className="text-base">{s.icon}</span>
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${state === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{s.label}</div>
                  <div className="text-slate-400 text-xs mt-0.5 truncate">{s.detail}</div>
                </div>

                {state === 'done' && <span className="text-emerald-500 text-xs font-bold flex-shrink-0">Done</span>}
                {state === 'active' && <span className="text-blue-500 text-xs font-bold flex-shrink-0 animate-pulse">Running...</span>}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#3b82f6,#06b6d4)' }}
          />
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          <span>{progress}% complete</span>
          <span>{elapsed}s elapsed · ~{Math.max(0, Math.round((total - elapsed * 1000) / 1000))}s remaining</span>
        </div>

        {/* Tech badges */}
        <div className="flex gap-2 justify-center mt-6 flex-wrap">
          {['Claude Vision', 'Cumulus GPU', 'Butterbase Storage'].map(t => (
            <span key={t} className="bg-slate-100 text-slate-500 rounded-full px-3 py-1 text-xs font-semibold">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
