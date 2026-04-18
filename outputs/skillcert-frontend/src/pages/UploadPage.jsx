import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Video, CheckCircle } from 'lucide-react'
import UploadZone from '../components/UploadZone'

export default function UploadPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-10 px-6">
      <div className="max-w-[680px] mx-auto">
        <button onClick={() => navigate(`/module/${id}`)} className="btn-ghost px-0 mb-6 text-slate-500">
          <ChevronLeft size={16} /> Back to Module
        </button>

        <div className="mb-8">
          <h1 className="text-[28px] font-black text-slate-900 tracking-tight mb-2">Submit Your CPR Assessment</h1>
          <p className="text-slate-500 text-[15px]">Upload a video of you performing CPR. The AI will score each criterion frame-by-frame using Claude Vision.</p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <div className="font-bold text-blue-800 text-sm mb-1.5">Recording tips for best results</div>
            <div className="text-blue-600 text-sm leading-relaxed">
              Film from a <strong>45° side angle</strong> · Ensure <strong>good lighting</strong> · Keep full body visible · Complete <strong>30 compressions</strong> · Hold camera steady
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="mb-6">
          <UploadZone onUpload={() => navigate(`/processing/${id}`)} />
        </div>

        {/* OR divider */}
        <div className="relative flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-slate-400 text-sm font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Record button */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate(`/processing/${id}`)}
            className="btn-secondary px-7 py-3 text-[15px]"
          >
            <Video size={18} className="text-blue-500" /> Record Video Now
          </button>
          <p className="text-slate-400 text-xs mt-2">Uses your device camera · No additional software needed</p>
        </div>

        {/* Requirements */}
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Verification requirements</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              'Minimum 30 compressions',
              'Clear side-angle view',
              'Video under 10 minutes',
              'Patient/manikin visible',
              'Hands clearly visible',
              'Good lighting required',
            ].map(req => (
              <div key={req} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={10} className="text-emerald-600" />
                </div>
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* Technical info */}
        <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
          <div className="text-slate-500 text-xs leading-relaxed text-center">
            Videos are uploaded to <strong>Butterbase S3-compatible object storage</strong>, then processed by Claude Vision on <strong>Cumulus Labs GPU infrastructure</strong>. Cold-start time: ~12.5s. Results delivered in under 20 seconds.
          </div>
        </div>
      </div>
    </div>
  )
}
