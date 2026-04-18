import { useNavigate, useParams } from 'react-router-dom'
import { RefreshCw, Play, Download, ChevronLeft } from 'lucide-react'
import { MOCK_FEEDBACK } from '../data/modules'
import CriterionCard from '../components/CriterionCard'
import ScoreRing from '../components/ScoreRing'

export default function FeedbackPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const r = MOCK_FEEDBACK

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Result Banner */}
      <div style={{ background: 'linear-gradient(135deg,#7f1d1d,#991b1b)' }} className="px-6 py-7">
        <div className="max-w-[900px] mx-auto">
          <button onClick={() => navigate('/dashboard')} className="btn-ghost text-red-300 hover:text-white px-0 mb-4">
            <ChevronLeft size={16} /> Back to Dashboard
          </button>
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">⚠️</div>
              <div>
                <div className="text-red-300 text-xs font-bold tracking-[1.5px] mb-1">ATTEMPT #{r.attemptNumber} · ADULT CPR</div>
                <h1 className="text-white text-[26px] font-black tracking-tight mb-1">Retry Required</h1>
                <p className="text-red-300 text-sm">
                  {r.passedCriteria} of {r.totalCriteria} criteria passed · {r.totalCriteria - r.passedCriteria} criteria need improvement
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <ScoreRing score={r.score} size={105} />
              <div>
                <div className="text-red-300 text-xs font-bold tracking-wider mb-1">OVERALL SCORE</div>
                <div className="text-red-200 text-sm">Need 100% to pass</div>
                <div className="text-red-200 text-sm">All 5 criteria required</div>
                <div className="text-red-300 text-xs mt-2">
                  Processed in {(r.processingTimeMs / 1000).toFixed(1)}s on Cumulus GPU
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-7">
        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={() => navigate(`/module/${id}`)} className="btn-secondary">
            <Play size={14} className="text-blue-500" />
            Watch Reference at {r.referenceTimestamp}
          </button>
          <button onClick={() => navigate(`/upload/${id}`)} className="btn-primary">
            <RefreshCw size={14} /> Try Again
          </button>
          <div className="flex-1" />
          <button className="btn-secondary text-slate-400">
            <Download size={14} /> Export Report
          </button>
        </div>

        {/* Status summary chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {r.criteriaResults.map(c => {
            const cfg = { pass: ['bg-emerald-50 border-emerald-200 text-emerald-700', '✓'], partial: ['bg-amber-50 border-amber-200 text-amber-700', '⚠'], fail: ['bg-red-50 border-red-200 text-red-700', '✗'] }
            const [cls, sym] = cfg[c.status] || cfg.pass
            return (
              <span key={c.id} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${cls}`}>
                {sym} {c.name}
              </span>
            )
          })}
        </div>

        {/* Failure timeline */}
        <div className="card p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Failure timeline</h3>
            <span className="text-slate-400 text-xs">30-compression cycle (0:00 – 0:30)</span>
          </div>
          <div className="relative h-10">
            {/* Background bar */}
            <div className="absolute top-3 left-0 right-0 h-3 bg-gray-100 rounded-full" />
            {/* Passing segment */}
            <div className="absolute top-3 left-0 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300" style={{ width: '13%' }} />
            {/* Failure / partial segments */}
            {[
              { left: '13%', width: '8%', color: '#ef4444' },
              { left: '33%', width: '20%', color: '#10b981' },
              { left: '40%', width: '10%', color: '#f59e0b' },
              { left: '53%', width: '7%', color: '#ef4444' },
              { left: '60%', width: '7%', color: '#f59e0b' },
              { left: '67%', width: '33%', color: '#ef4444' },
            ].map((seg, i) => (
              <div key={i} className="absolute top-3 h-3 rounded-sm"
                style={{ left: seg.left, width: seg.width, background: seg.color }} />
            ))}
            {/* Time labels */}
            {['0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30'].map((t, i) => (
              <span key={t} className="absolute text-[10px] text-slate-400 bottom-0"
                style={{ left: `${(i / 6) * 100}%`, transform: 'translateX(-50%)' }}>{t}</span>
            ))}
          </div>
          {/* Legend */}
          <div className="flex gap-4 mt-2 flex-wrap">
            {[['#10b981', 'Passing'], ['#f59e0b', 'Partial'], ['#ef4444', 'Failing']].map(([color, label]) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-3 h-2 rounded-sm inline-block" style={{ background: color }} /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Criteria cards */}
        <h3 className="font-extrabold text-slate-900 text-base mb-4">Criterion-by-Criterion Breakdown</h3>
        <div className="flex flex-col gap-4 mb-10">
          {r.criteriaResults.map(criterion => (
            <CriterionCard
              key={criterion.id}
              criterion={criterion}
              referenceTimestamp={r.referenceTimestamp}
              onWatchReference={() => navigate(`/module/${id}`)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
          <h3 className="font-extrabold text-slate-900 text-lg mb-2">Ready to try again?</h3>
          <p className="text-slate-500 text-sm mb-5">
            Focus on compression rate (aim for 110/min), full chest recoil, and steady rhythm. Watch the reference at <strong>0:14</strong> for guidance.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <button onClick={() => navigate(`/module/${id}`)} className="btn-secondary">
              ▷ Watch Reference Video
            </button>
            <button
              onClick={() => navigate(`/upload/${id}`)}
              className="btn-primary px-8"
              style={{ boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}
            >
              <RefreshCw size={15} /> Retry Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
