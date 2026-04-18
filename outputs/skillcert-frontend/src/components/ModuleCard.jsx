import { useNavigate } from 'react-router-dom'
import { Lock, Clock, CheckSquare } from 'lucide-react'
import clsx from 'clsx'

const STATUS_TAGS = {
  'demo-ready': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'planned-v2': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'planned-v3': { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
}

export default function ModuleCard({ module, highlight = false }) {
  const navigate = useNavigate()
  const isClickable = !module.locked || module.attempts > 0
  const tagStyle = STATUS_TAGS[module.status] || STATUS_TAGS['planned-v3']

  const handleClick = () => {
    if (isClickable) navigate(`/module/${module.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'bg-white rounded-2xl p-5 border transition-all duration-200',
        isClickable
          ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg'
          : 'cursor-not-allowed opacity-60',
        highlight ? 'border-blue-200 shadow-blue-50 shadow-md' : 'border-gray-100'
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div
          className="w-12 h-12 rounded-[14px] bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shadow-sm"
          style={{ filter: module.locked ? 'grayscale(0.5)' : 'none' }}
        >
          {module.icon}
        </div>
        <div className="flex items-center gap-2">
          {module.locked && module.attempts === 0 && (
            <Lock size={14} className="text-gray-300" />
          )}
          <span className={clsx(
            'text-[11px] font-bold px-2.5 py-1 rounded-full border',
            tagStyle.bg, tagStyle.text, tagStyle.border
          )}>
            {module.tag}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-1">
        <h3 className="font-extrabold text-slate-900 text-[15px] leading-tight">{module.title}</h3>
        <p className="text-slate-400 text-[12px] mt-0.5">{module.subtitle}</p>
      </div>

      {/* Meta */}
      <div className="flex gap-3 text-xs text-slate-400 mb-3 mt-2">
        <span className="flex items-center gap-1"><Clock size={11} />{module.duration}</span>
        <span className="flex items-center gap-1"><CheckSquare size={11} />{module.criteriaCount} criteria</span>
      </div>

      {/* Progress (if started) */}
      {module.attempts > 0 && module.lastScore !== null && (
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500">Last attempt</span>
            <span className="font-bold text-blue-600">{module.lastScore}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-700"
              style={{ width: `${module.lastScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">{module.attempts} attempt{module.attempts !== 1 ? 's' : ''} · {module.passed ? 'Passed ✓' : 'Retry needed'}</p>
        </div>
      )}

      {/* Locked state */}
      {module.locked && module.attempts === 0 && (
        <p className="text-xs text-slate-400 mt-1">Complete previous modules to unlock</p>
      )}

      {/* Not started */}
      {!module.locked && module.attempts === 0 && (
        <p className="text-xs text-blue-500 font-semibold mt-1">Ready to attempt →</p>
      )}
    </div>
  )
}
