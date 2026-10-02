import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Topic from './pages/Topic'
import NotFound from './pages/NotFound'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <div className="grain" />
      <ScrollTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:levelId/:topicId" element={<Topic />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
