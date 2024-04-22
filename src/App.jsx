import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashbord from './pages/Dashbord'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './Context/TokenAuth'

function App() {

  const { isAuthorised, setAuthorised } = useContext(tokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />
        <Route path='/dashbord' element={isAuthorised ? <Dashbord /> : <Navigate to={'/login'} />} />
        <Route path='/projects' element={isAuthorised ? <Projects /> : <Navigate to={'/login'} />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
