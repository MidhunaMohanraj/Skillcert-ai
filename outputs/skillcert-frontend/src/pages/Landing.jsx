import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, Shield, Award, Zap } from 'lucide-react'
import { MODULES } from '../data/modules'
import ModuleCard from '../components/ModuleCard'

const STEPS = [
  { icon: '🎬', title: 'Watch', desc: 'AI-generated reference video with annotated technique overlays', color: '#3b82f6' },
  { icon: '📱', title: 'Record', desc: 'Film yourself on any smartphone or webcam', color: '#8b5cf6' },
  { icon: '⬆️', title: 'Upload', desc: 'Instantly upload to Butterbase secure cloud storage', color: '#06b6d4' },
  { icon: '🤖', title: 'Verify', desc: 'Claude Vision scores each rubric criterion frame-by-frame', color: '#10b981' },
  { icon: '📊', title: 'Feedback', desc: 'Timestamped, criterion-level results with improvement guidance', color: '#f59e0b' },
  { icon: '🎓', title: 'Certify', desc: 'Unlock the next module and earn your verified certificate', color: '#ef4444' },
]

const STATS = [
  { value: '350K+', label: 'Cardiac arrests outside hospitals in the US annually', color: '#ef4444' },
  { value: '70–80%', label: 'Of certified individuals perform CPR below AHA guidelines', color: '#f59e0b' },
  { value: '$8B+', label: 'US compliance training market ready for disruption', color: '#3b82f6' },
]

const PARTNERS = ['Luma Photon', 'Butterbase', 'Cumulus Labs', 'Claude Vision']

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────── */}
      <section className="hero-bg grid-bg min-h-[92vh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 60%)' }} />

        <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
          {/* Hackathon badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <span className="text-xs font-bold text-blue-300 tracking-[1px]">
              🏆 HACKATHON TRACK 1 · AI VIDEO AGENTS FOR VERTICAL INDUSTRIES
            </span>
          </div>

          <h1 className="text-[clamp(36px,6vw,72px)] font-black text-white leading-[1.08] tracking-[-2.5px] mb-6 animate-fade-in-up">
            Clinical Skills Verification<br />
            <span className="gradient-text">Powered by AI Vision</span>
          </h1>

          <p className="text-[clamp(16px,2vw,20px)] text-slate-400 max-w-[580px] mx-auto mb-10 leading-relaxed animate-fade-in-up">
            Watch the reference. Record your technique. Get AI-scored, timestamped feedback
            against clinical rubrics. Pass every criterion before you certify.
          </p>

          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up">
            <button
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-[17px] border-0 cursor-pointer transition-all"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', boxShadow: '0 8px 32px rgba(59,130,246,0.45)' }}
            >
              Start Certification <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/module/cpr')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-[17px] glass border-0 cursor-pointer hover:bg-white/15 transition-all"
            >
              ▷ View Demo Module
            </button>
          </div>

          {/* Partners */}
          <div className="flex items-center gap-4 justify-center mt-16 flex-wrap">
            <span className="text-slate-600 text-xs font-medium">Powered by</span>
            {PARTNERS.map(p => (
              <span key={p} className="glass text-slate-300 rounded-xl px-3.5 py-1.5 text-[13px] font-semibold">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section className="bg-white py-20 px-6 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-black text-slate-900 tracking-tight mb-3">The stakes are real</h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">Healthcare certification hasn't changed in decades. SkillCert AI changes that.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="card-hover p-8 text-center">
                <div className="text-[52px] font-black tracking-tight leading-none mb-3" style={{ color: s.color }}>{s.value}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <span className="section-chip mb-4">THE CORE LOOP</span>
            <h2 className="text-[36px] font-black text-slate-900 tracking-tight mt-4 mb-3">Six steps to verified competency</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STEPS.map((s, i) => (
              <div key={i} className="card-hover p-5 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                  style={{ background: `${s.color}18` }}>
                  {s.icon}
                </div>
                <div className="text-[10px] font-bold text-slate-400 tracking-[1.5px] mb-1">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-extrabold text-slate-900 text-base mb-2">{s.title}</div>
                <p className="text-slate-500 text-[12px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES PREVIEW ───────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-black text-slate-900 tracking-tight mb-3">Skill module library</h2>
            <p className="text-slate-500 text-base">AI-scored rubrics for every critical care skill</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map(m => <ModuleCard key={m.id} module={m} />)}
          </div>
        </div>
      </section>

      {/* ── WHY ───────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-6 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={22} />, title: 'Clinically Accurate', desc: 'Reference videos and rubric criteria developed with clinical subject matter experts, meeting AHA standards.' },
              { icon: <Zap size={22} />, title: '20-Second Feedback', desc: 'GPU-accelerated AI inference via Cumulus Labs delivers timestamped results in under 20 seconds.' },
              { icon: <Award size={22} />, title: 'Gated Progression', desc: 'All criteria must pass before the next module unlocks — no more checkbox-only certification.' },
            ].map((f, i) => (
              <div key={i} className="card p-7">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg,#0f172a,#1e1b4b)' }}>
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[40px] font-black text-white tracking-tight mb-4 leading-tight">
            Better than any recertification session
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            See exactly which second your compression rate dropped and what you need to fix — in 20 seconds flat.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="px-10 py-4 rounded-2xl text-white font-bold text-lg cursor-pointer border-0 mb-4 inline-flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', boxShadow: '0 8px 32px rgba(59,130,246,0.4)' }}
          >
            Start Free Certification <ArrowRight size={18} />
          </button>
          <p className="text-slate-600 text-sm">
            Built with Luma Photon · Butterbase · Cumulus Labs · Claude Vision
          </p>
        </div>
      </section>
    </div>
  )
}
