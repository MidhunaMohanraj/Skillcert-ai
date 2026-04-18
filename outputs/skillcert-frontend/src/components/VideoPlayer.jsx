import { useState } from 'react'
import { Play, Pause, Volume2, Maximize } from 'lucide-react'

export default function VideoPlayer({ title = 'AI-Generated Reference Video', subtitle = 'Luma Photon · Annotated technique walkthrough' }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(35)

  const annotations = [
    { label: 'Hand placement', top: '60%', left: '45%', color: '#3b82f6' },
    { label: 'Arm position ✓', top: '25%', right: '18%', color: '#10b981' },
    { label: 'Rate: 112/min', top: '35%', left: '12%', color: '#06b6d4' },
  ]

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0a0f1e] shadow-xl border border-white/5">
      {/* Video area */}
      <div
        className="relative cursor-pointer"
        style={{ paddingBottom: '56.25%' }}
        onClick={() => setPlaying(!playing)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a3a] to-[#1a0f40]">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          {/* Glow */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 60%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />

          {/* Manikin silhouette */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-40 h-64 rounded-[80px] bg-white/[0.04] border border-white/[0.08]" />

          {/* Annotations */}
          {annotations.map((a, i) => (
            <div key={i} className="absolute text-xs font-semibold px-2 py-1 rounded-md border"
              style={{
                top: a.top, left: a.left, right: a.right,
                color: a.color, borderColor: `${a.color}60`, background: `${a.color}18`,
                backdropFilter: 'blur(4px)', whiteSpace: 'nowrap'
              }}>
              {a.label}
            </div>
          ))}

          {/* Play overlay */}
          {!playing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/15 transition-colors">
                <Play size={26} className="text-white ml-1" />
              </div>
              <p className="text-white/80 text-sm font-medium">{title}</p>
              <p className="text-white/40 text-xs">{subtitle}</p>
            </div>
          )}

          {/* LIVE badge */}
          {playing && (
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white text-xs font-bold tracking-wide">PLAYING</span>
            </div>
          )}

          {/* Module badge */}
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10 text-white/70 text-xs font-semibold">
            Luma Photon ✦ HD
          </div>
        </div>
      </div>

      {/* Controls bar */}
      <div className="bg-[#111827] px-4 py-3 flex items-center gap-3.5">
        <button
          onClick={() => setPlaying(!playing)}
          className="text-white hover:text-blue-400 transition-colors flex-shrink-0"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Progress */}
        <div
          className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            setProgress(Math.round((e.clientX - rect.left) / rect.width * 100))
          }}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <span className="text-slate-500 text-xs font-mono flex-shrink-0">
          {Math.floor(progress * 2.34 / 100 * 60).toString().padStart(2,'0')}s / 2:34
        </span>

        <Volume2 size={15} className="text-slate-600 flex-shrink-0" />
        <Maximize size={13} className="text-slate-600 flex-shrink-0 cursor-pointer hover:text-slate-400" />
      </div>
    </div>
  )
}
