import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import VivaMockTest from './pages/VivaMockTest'
import About from './pages/About'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"                        element={<Home />} />
          <Route path="/projects"                element={<Projects />} />
          <Route path="/projects/:id"            element={<ProjectDetail />} />
          <Route path="/projects/:id/viva-test"  element={<VivaMockTest />} />
          <Route path="/about"                   element={<About />} />
          <Route path="*"                        element={<Projects />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
