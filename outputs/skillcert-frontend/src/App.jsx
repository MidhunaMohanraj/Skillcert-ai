import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import LearnerDashboard from './pages/LearnerDashboard'
import ModulePage from './pages/ModulePage'
import UploadPage from './pages/UploadPage'
import ProcessingPage from './pages/ProcessingPage'
import FeedbackPage from './pages/FeedbackPage'
import InstructorDashboard from './pages/InstructorDashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/"               element={<Landing />} />
        <Route path="/auth"           element={<Auth />} />
        <Route path="/dashboard"      element={<LearnerDashboard />} />
        <Route path="/module/:id"     element={<ModulePage />} />
        <Route path="/upload/:id"     element={<UploadPage />} />
        <Route path="/processing/:id" element={<ProcessingPage />} />
        <Route path="/feedback/:id"   element={<FeedbackPage />} />
        <Route path="/instructor"     element={<InstructorDashboard />} />
        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
