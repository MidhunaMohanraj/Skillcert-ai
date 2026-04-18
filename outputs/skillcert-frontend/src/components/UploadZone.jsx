import { useState, useRef } from 'react'
import { UploadCloud, Video, CheckCircle } from 'lucide-react'
import clsx from 'clsx'

export default function UploadZone({ onUpload }) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setUploading(true)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 14 + 4
      if (p >= 100) {
        clearInterval(iv)
        setProgress(100)
        setTimeout(() => onUpload?.(f), 500)
      } else {
        setProgress(Math.min(p, 99))
      }
    }, 180)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f?.type.startsWith('video/')) handleFile(f)
  }

  return (
    <div
      className={clsx('upload-zone p-12 text-center transition-all', dragging && 'active')}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !uploading && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={e => handleFile(e.target.files[0])}
      />

      {uploading ? (
        <div>
          {progress === 100 ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle size={48} className="text-emerald-500" />
              <p className="font-bold text-slate-800 text-lg">Upload complete!</p>
              <p className="text-slate-500 text-sm">Starting AI verification...</p>
            </div>
          ) : (
            <div className="max-w-xs mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 mx-auto mb-4 flex items-center justify-center">
                <UploadCloud size={28} className="text-blue-500" />
              </div>
              <p className="font-bold text-slate-800 text-lg mb-1">Uploading via Butterbase...</p>
              <p className="text-slate-500 text-sm mb-4">{file?.name}</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-blue-600 font-bold text-sm mt-2">{Math.round(progress)}%</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 mx-auto mb-4 flex items-center justify-center">
            <UploadCloud size={30} className="text-gray-400" />
          </div>
          <p className="font-extrabold text-slate-800 text-lg mb-2">Drop your video here</p>
          <p className="text-slate-500 text-sm mb-5">
            or <span className="text-blue-500 font-semibold underline cursor-pointer">browse files</span>
          </p>
          <p className="text-slate-400 text-xs">MP4, MOV, WebM · Max 500MB</p>
        </div>
      )}
    </div>
  )
}
