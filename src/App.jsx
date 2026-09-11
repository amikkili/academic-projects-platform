import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import VivaMockTest from './pages/VivaMockTest'
import ProjectFit from './pages/ProjectFit'
import InternalMarksEstimator from './pages/InternalMarksEstimator'
import InterviewReadiness from './pages/InterviewReadiness'
import HRPrep from './pages/HRPrep'
import ProjectInterview from './pages/ProjectInterview'
import ResumeBuilder from './pages/ResumeBuilder'
import CodingPractice from './pages/CodingPractice'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"                        element={<Home />} />
          <Route path="/projects"                element={<Projects />} />
<Route path="/projects/:id"            element={<ProjectDetail />} />
          <Route path="/projects/:id/viva-test"      element={<VivaMockTest />} />
          <Route path="/projects/:id/interview-prep" element={<ProjectInterview />} />
          <Route path="/project-fit"             element={<ProjectFit />} />
          <Route path="/internal-marks"          element={<InternalMarksEstimator />} />
          <Route path="/interview-readiness"     element={<InterviewReadiness />} />
          <Route path="/hr-prep"                 element={<HRPrep />} />
          <Route path="/resume-builder"          element={<ResumeBuilder />} />
          <Route path="/coding-practice"         element={<CodingPractice />} />
          <Route path="/about"                   element={<About />} />
          <Route path="/contact"                 element={<Contact />} />
          <Route path="/pricing"                 element={<Pricing />} />
          <Route path="/login"                   element={<Login />} />
          <Route path="*"                        element={<Projects />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
