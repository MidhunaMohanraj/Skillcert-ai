import { useNavigate } from 'react-router-dom'
import { Upload, Play } from 'lucide-react'
import { MODULES } from '../data/modules'
import ModuleCard from '../components/ModuleCard'

export default function LearnerDashboard() {
  const navigate = useNavigate()

  const stats = [
    { label: 'MODULES CERTIFIED', value: '0/6', color: '#10b981' },
    { label: 'ATTEMPTS MADE', value: '2', color: '#3b82f6' },
    { label: 'BEST SCORE', value: '60%', color: '#f59e0b' },
    { label: 'PASS RATE', value: '0%', color: '#94a3b8' },
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-[28px] font-black text-slate-900 tracking-tight mb-1">Welcome back, Sarah 👋</h1>
            <p className="text-slate-500 text-base">ICU Nurse · St. Mary's Medical Center</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="card px-5 py-3 text-center min-w-[100px]">
                <div className="text-[22px] font-black leading-tight" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Module Banner */}
        <div className="rounded-2xl p-6 mb-7 flex justify-between items-center flex-wrap gap-4"
          style={{ background: 'linear-gradient(135deg,#1e3a5f,#1e40af)' }}>
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">❤️</div>
            <div>
              <div className="text-blue-300 text-xs font-bold tracking-[1.5px] mb-1">CURRENT MODULE</div>
              <div className="text-white text-xl font-black">Adult CPR</div>
              <div className="text-blue-300 text-sm mt-1">Attempt 2 · Last score: 60% · 2/5 criteria passed</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/module/cpr')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm border border-white/20 bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
            >
              <Play size={14} />Watch Reference
            </button>
            <button
              onClick={() => navigate('/upload/cpr')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-blue-900 font-bold text-sm border-0 bg-white hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Upload size={14} />Upload New Attempt
            </button>
          </div>
        </div>

        {/* Previous attempt CTA */}
        <div className="card px-5 py-4 mb-7 flex items-center gap-4 border-l-4 border-l-amber-400">
          <div className="text-2xl">⚠️</div>
          <div className="flex-1">
            <div className="font-bold text-slate-900 text-sm">Retry needed — Attempt #2 scored 60%</div>
            <div className="text-slate-500 text-xs mt-0.5">3 criteria failed: Compression Rate, Chest Recoil, Rhythm Consistency</div>
          </div>
          <button onClick={() => navigate('/feedback/cpr')} className="btn-secondary text-sm">View Feedback</button>
          <button onClick={() => navigate('/upload/cpr')} className="btn-primary text-sm">Retry</button>
        </div>

        {/* Module Grid */}
        <h2 className="text-lg font-extrabold text-slate-900 mb-4">All Skill Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map(m => (
            <ModuleCard key={m.id} module={m} highlight={m.id === 'cpr'} />
          ))}
        </div>

        {/* Recent activity */}
        <div className="card p-6 mt-8">
          <h3 className="font-extrabold text-slate-900 text-base mb-4">Recent Activity</h3>
          <div className="flex flex-col gap-3">
            {[
              { icon: '📊', action: 'Feedback received for CPR Attempt #2', detail: '60% — 2/5 criteria passed', time: '2 hours ago', color: '#f59e0b' },
              { icon: '📤', action: 'Video submitted for CPR Attempt #2', detail: 'cpr_attempt_2.mp4 · 47MB', time: '2 hours ago', color: '#3b82f6' },
              { icon: '🎬', action: 'Watched CPR reference video', detail: 'Full walkthrough · 2:34', time: '2 hours ago', color: '#8b5cf6' },
              { icon: '📊', action: 'Feedback received for CPR Attempt #1', detail: '40% — 1/5 criteria passed', time: 'Yesterday', color: '#ef4444' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3.5 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${a.color}15` }}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm truncate">{a.action}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{a.detail}</div>
                </div>
                <span className="text-slate-400 text-xs flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
