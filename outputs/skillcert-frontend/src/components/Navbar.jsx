import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutGrid, LogOut, BarChart2 } from 'lucide-react'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isApp = ['/dashboard', '/module', '/upload', '/processing', '/feedback', '/instructor'].some(p => pathname.startsWith(p))
  const isInstructor = pathname.startsWith('/instructor')

  return (
    <nav className="bg-navy-900 border-b border-white/[0.07] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-lg shadow-md">
            🏥
          </div>
          <div>
            <div className="text-white font-black text-[17px] tracking-tight leading-tight">
              SkillCert<span className="text-cyan-400">AI</span>
            </div>
            <div className="text-slate-600 text-[9px] font-bold tracking-[1.8px] leading-tight">
              CLINICAL VERIFICATION
            </div>
          </div>
        </Link>

        {/* Nav actions */}
        {isApp ? (
          <div className="flex items-center gap-4">
            {isInstructor ? (
              <Link to="/instructor" className="btn-ghost text-slate-400 hover:text-white">
                <BarChart2 size={15} /> Dashboard
              </Link>
            ) : (
              <Link to="/dashboard" className="btn-ghost text-slate-400 hover:text-white">
                <LayoutGrid size={15} /> My Modules
              </Link>
            )}

            <div className="w-px h-5 bg-white/10" />

            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                {isInstructor ? 'DR' : 'SC'}
              </div>
              <span className="text-slate-300 text-sm font-medium">
                {isInstructor ? 'Dr. Rivera' : 'Sarah Chen'}
              </span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              <LogOut size={17} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/auth" className="px-4 py-2 rounded-lg text-white text-sm font-medium border border-white/15 hover:border-white/25 transition-colors">
              Log In
            </Link>
            <Link to="/auth" className="btn-primary text-sm">
              Get Started →
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
