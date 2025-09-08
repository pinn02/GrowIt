import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/organisms/Navigation'
import Home from './pages/Home'
import Company from './pages/Company'
import Projects from './pages/Projects'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
