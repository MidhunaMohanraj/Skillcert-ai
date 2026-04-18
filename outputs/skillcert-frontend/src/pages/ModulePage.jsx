import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Clock, CheckSquare, Target, RefreshCw } from 'lucide-react'
import { MODULES, CPR_RUBRIC } from '../data/modules'
import VideoPlayer from '../components/VideoPlayer'

export default function ModulePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const module = MODULES.find(m => m.id === id) || MODULES[0]

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e1b4b)' }} className="px-6 py-8">
        <div className="max-w-[1280px] mx-auto">
          <button onClick={() => navigate(-1)} className="btn-ghost text-slate-400 hover:text-white mb-5 px-0">
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex gap-4 items-center">
            <span className="text-4xl">{module.icon}</span>
            <div>
              <div className="text-blue-300 text-xs font-bold tracking-[1.5px] mb-1">MODULE 01 · DEMO READY</div>
              <h1 className="text-white text-[30px] font-black tracking-tight">{module.title}</h1>
              <p className="text-slate-400 text-sm mt-1">{module.subtitle} · AHA Guidelines</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 items-start">
        {/* Left column */}
        <div>
          {/* Video Player */}
          <div className="mb-6">
            <VideoPlayer
              title="AI-Generated Reference Video"
              subtitle="Luma Photon · Annotated technique walkthrough"
            />
          </div>

          {/* Module info */}
          <div className="card p-6 mb-5">
            <h3 className="font-extrabold text-slate-900 text-base mb-3">About this module</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{module.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ['⏱ Duration', module.estimatedTime],
                ['✓ Criteria', `${module.criteriaCount} criteria scored`],
                ['🎯 Passing', 'All criteria must pass'],
                ['🔄 Attempts', 'Unlimited retries'],
              ].map(([label, value]) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-[11px] font-bold text-slate-400 mb-1">{label.split(' ')[0]}</div>
                  <div className="font-bold text-slate-800 text-sm">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key skills */}
          <div className="card p-6">
            <h3 className="font-extrabold text-slate-900 text-sm mb-3">Key skills assessed</h3>
            <div className="flex flex-wrap gap-2">
              {module.keySkills.map(skill => (
                <span key={skill} className="bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-xs font-semibold">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Rubric */}
          <div className="card overflow-hidden mb-5">
            <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-[15px]">Scoring Rubric</h3>
              <span className="text-slate-400 text-xs">20% weight each</span>
            </div>
            {CPR_RUBRIC.map((criterion, i) => (
              <div key={criterion.id} className={`px-5 py-3.5 flex gap-3 items-start ${i < CPR_RUBRIC.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="w-6 h-6 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-black text-slate-500 flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">{criterion.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5 leading-snug">{criterion.description}</div>
                  <span className="mt-1.5 inline-block bg-gray-50 text-slate-500 rounded-full px-2 py-0.5 text-[10px] font-semibold border border-gray-100">
                    {criterion.scoring}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Attempt history */}
          <div className="card p-5 mb-5">
            <h3 className="font-extrabold text-slate-900 text-sm mb-4">Attempt History</h3>
            {[
              { n: 2, score: 60, date: 'Today, 2:34 PM', passed: false, criteria: '2/5' },
              { n: 1, score: 40, date: 'Yesterday, 10:12 AM', passed: false, criteria: '1/5' },
            ].map((a, i) => (
              <div key={a.n} className={`flex justify-between items-center py-3 ${i < 1 ? 'border-b border-gray-50' : ''}`}>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">Attempt #{a.n}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{a.date} · {a.criteria} criteria passed</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={`text-lg font-black ${a.score >= 80 ? 'text-emerald-500' : a.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                    {a.score}%
                  </span>
                  <button
                    onClick={() => navigate('/feedback/cpr')}
                    className="text-xs text-blue-500 font-semibold hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/upload/cpr')}
            className="w-full py-3.5 rounded-xl text-white font-bold text-[15px] border-0 cursor-pointer flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}
          >
            <RefreshCw size={16} /> Start New Attempt
          </button>
          <p className="text-slate-400 text-xs text-center mt-2">Unlimited retries · All criteria must pass</p>
        </div>
      </div>
    </div>
  )
}
