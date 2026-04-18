import { useState } from 'react'
import { Download, Plus, Search, Users, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react'
import { MOCK_LEARNERS } from '../data/modules'

const STATUS_STYLE = {
  Passed: 'badge-pass',
  Failed: 'badge-fail',
  'In Progress': 'badge-progress',
  Locked: 'badge-locked',
}

export default function InstructorDashboard() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_LEARNERS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.role.toLowerCase().includes(search.toLowerCase())
  )

  const summaryStats = [
    { icon: <Users size={20} />, label: 'Total Learners', value: '48', sub: '+6 this week', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    { icon: <TrendingUp size={20} />, label: 'Overall Pass Rate', value: '34%', sub: '↑ vs 31% last month', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    { icon: <RefreshCw size={20} />, label: 'Avg Attempts / Module', value: '2.8', sub: 'Per completion', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    { icon: <AlertCircle size={20} />, label: 'Pending Reviews', value: '7', sub: 'Flagged for manual check', bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
  ]

  const moduleStats = [
    { name: 'Adult CPR', icon: '❤️', passRate: 72, attempts: 94, avgAttempts: 3.1, color: '#ef4444' },
    { name: 'AED Use', icon: '⚡', passRate: 81, attempts: 45, avgAttempts: 2.4, color: '#f59e0b' },
    { name: 'Heimlich', icon: '🫁', passRate: 65, attempts: 22, avgAttempts: 3.8, color: '#8b5cf6' },
  ]

  const hardestCriteria = [
    { name: 'Rhythm Consistency', failRate: 58, module: 'CPR' },
    { name: 'Compression Rate', failRate: 44, module: 'CPR' },
    { name: 'Chest Recoil', failRate: 31, module: 'CPR' },
    { name: 'Pad Placement', failRate: 29, module: 'AED' },
    { name: 'Clear Call', failRate: 22, module: 'AED' },
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-7 px-6">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-7 flex-wrap gap-4">
          <div>
            <h1 className="text-[26px] font-black text-slate-900 tracking-tight mb-1">Instructor Dashboard</h1>
            <p className="text-slate-500 text-sm">St. Mary's Medical Center · Spring 2025 Cohort</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary text-sm">
              <Download size={14} /> Export CSV
            </button>
            <button className="btn-primary text-sm">
              <Plus size={14} /> Add Learners
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryStats.map((s, i) => (
            <div key={i} className="card p-5">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-11 h-11 rounded-xl ${s.bg} ${s.text} border ${s.border} flex items-center justify-center`}>
                  {s.icon}
                </div>
                <span className="text-slate-400 text-[11px] font-medium">{s.sub}</span>
              </div>
              <div className={`text-[30px] font-black ${s.text} leading-none mb-1`}>{s.value}</div>
              <div className="text-slate-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Analytics row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-5">
          {/* Module performance */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-extrabold text-slate-900 text-base">Module Performance</h3>
              <span className="text-slate-400 text-xs">Pass rate by module</span>
            </div>
            <div className="flex flex-col gap-5">
              {moduleStats.map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span>{m.icon}</span>
                      <span className="font-semibold text-slate-900 text-sm">{m.name}</span>
                      <span className="text-slate-400 text-xs">· {m.attempts} attempts · avg {m.avgAttempts} tries</span>
                    </div>
                    <span className="font-black text-lg" style={{ color: m.color }}>{m.passRate}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${m.passRate}%`, background: `linear-gradient(90deg, ${m.color}88, ${m.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hardest criteria */}
          <div className="card p-6">
            <h3 className="font-extrabold text-slate-900 text-base mb-4">Hardest Criteria</h3>
            <div className="flex flex-col gap-2.5">
              {hardestCriteria.map((c, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2.5">
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{c.name}</div>
                    <div className="text-slate-400 text-xs">{c.module} module</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${c.failRate > 50 ? 'bg-red-100 text-red-700' : c.failRate > 30 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-slate-600'}`}>
                    {c.failRate}% fail
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learner table */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex flex-wrap justify-between items-center gap-3">
            <h3 className="font-extrabold text-slate-900 text-base">Learner Progress</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="input pl-8 py-2 w-48 text-sm"
                  placeholder="Search learners..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  {['Learner', 'Role', 'CPR', 'AED', 'Heimlich', 'Avg Score', 'Attempts', 'Last Active'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-slate-500 tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={l.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    {/* Learner */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: `hsl(${l.id * 47 + 210}, 65%, 55%)` }}>
                          {l.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{l.name}</div>
                          {l.certified && <div className="text-emerald-600 text-[10px] font-bold">✓ CERTIFIED</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-sm">{l.role}</td>
                    {[l.cpr, l.aed, l.heimlich].map((status, si) => (
                      <td key={si} className="px-5 py-3.5">
                        <span className={STATUS_STYLE[status] || 'badge-locked'}>{status}</span>
                      </td>
                    ))}
                    <td className="px-5 py-3.5">
                      <span className={`text-base font-black ${l.avgScore >= 80 ? 'text-emerald-500' : l.avgScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                        {l.avgScore}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-sm text-center">{l.totalAttempts}</td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs">{l.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-50 flex justify-between text-xs text-slate-400">
            <span>Showing {filtered.length} of {MOCK_LEARNERS.length} learners</span>
            <span>St. Mary's Medical Center · Spring 2025</span>
          </div>
        </div>
      </div>
    </div>
  )
}
