import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('ICU Nurse')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl shadow-lg"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>
            🏥
          </div>
          <h1 className="font-black text-[26px] text-slate-900 tracking-tight">
            SkillCert<span className="text-blue-500">AI</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Clinical skills verification platform</p>
        </div>

        <div className="card p-8 shadow-lg">
          {/* Tabs */}
          <div className="flex bg-gray-50 rounded-xl p-1 mb-7">
            {['login', 'register'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all border-0 cursor-pointer ${tab === t ? 'bg-white text-slate-900 shadow' : 'bg-transparent text-slate-500 hover:text-slate-700'}`}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === 'register' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input className="input" placeholder="Sarah Chen" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input className="input" type="email" placeholder="you@hospital.org" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
                <select className="input bg-white" value={role} onChange={e => setRole(e.target.value)}>
                  {['ICU Nurse', 'Ward Nurse', 'EMT / Paramedic', 'Care Worker', 'First Responder', 'Nursing Student', 'Other'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            )}

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                {tab === 'login' && <button type="button" className="text-blue-500 text-xs font-medium hover:underline bg-transparent border-0 cursor-pointer p-0">Forgot password?</button>}
              </div>
              <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <button type="submit"
              className="w-full py-3 rounded-xl font-bold text-white text-[15px] border-0 cursor-pointer mt-1"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }}>
              {tab === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 flex items-center">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="px-3 text-slate-400 text-xs font-medium">or continue as</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Demo shortcuts */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => navigate('/dashboard')} className="btn-secondary justify-center text-[13px]">
              👩‍⚕️ Demo Learner
            </button>
            <button onClick={() => navigate('/instructor')} className="btn-secondary justify-center text-[13px]">
              👩‍💼 Demo Instructor
            </button>
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-5">
          🔒 Secure login · HIPAA-compliant infrastructure · SOC 2 Type II
        </p>
      </div>
    </div>
  )
}
