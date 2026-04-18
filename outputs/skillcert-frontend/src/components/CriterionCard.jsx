import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, ChevronDown, Play } from 'lucide-react'
import clsx from 'clsx'

const STATUS_CONFIG = {
  pass: {
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    badge: 'badge-pass',
    badgeLabel: '✓ Pass',
    borderClass: 'criterion-pass',
    expandBg: 'bg-emerald-50/60',
  },
  partial: {
    icon: AlertCircle,
    iconColor: 'text-amber-500',
    badge: 'badge-partial',
    badgeLabel: '⚠ Partial',
    borderClass: 'criterion-partial',
    expandBg: 'bg-amber-50/60',
  },
  fail: {
    icon: XCircle,
    iconColor: 'text-red-500',
    badge: 'badge-fail',
    badgeLabel: '✗ Fail',
    borderClass: 'criterion-fail',
    expandBg: 'bg-red-50/50',
  },
}

export default function CriterionCard({ criterion, referenceTimestamp, onWatchReference }) {
  const [expanded, setExpanded] = useState(criterion.status !== 'pass')
  const cfg = STATUS_CONFIG[criterion.status] || STATUS_CONFIG.pass
  const Icon = cfg.icon

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm',
        cfg.borderClass,
        expanded && 'shadow-md'
      )}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <Icon size={20} className={cfg.iconColor} />
          <div>
            <div className="font-extrabold text-slate-900 text-[15px]">{criterion.name}</div>
            <div className="text-slate-400 text-xs mt-0.5">{criterion.weight}% weight</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Timestamp pills preview */}
          {criterion.timestamps.slice(0, 2).map((ts, i) => (
            <span key={i} className={clsx('ts-pill', criterion.status === 'fail' && 'ts-pill-fail')}>
              ⏱ {ts.start}–{ts.end}
            </span>
          ))}
          <span className={cfg.badge}>{cfg.badgeLabel}</span>
          <ChevronDown
            size={16}
            className={clsx('text-slate-400 transition-transform duration-200', expanded && 'rotate-180')}
          />
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className={clsx('px-5 pb-5 pt-1 border-t border-gray-50', cfg.expandBg)}>
          {/* AI Feedback */}
          <p className="text-slate-700 text-sm leading-relaxed mb-4">{criterion.feedback}</p>

          {/* Failure timestamps */}
          {criterion.timestamps.length > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 mb-4">
              <div className="text-red-700 font-bold text-xs mb-2.5 tracking-wide">
                FAILURE TIMESTAMPS
              </div>
              <div className="flex flex-col gap-2">
                {criterion.timestamps.map((ts, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="ts-pill-fail font-bold">
                      ⏱ {ts.start} – {ts.end}
                    </span>
                    <span className="text-red-600 text-sm">{ts.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Watch reference link */}
          {criterion.status !== 'pass' && (
            <button
              onClick={onWatchReference}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-blue-200 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              <Play size={12} />
              Watch reference at {referenceTimestamp}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
