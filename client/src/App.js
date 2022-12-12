import React from 'react'
import './index.css'
import { UsersContextProvider } from './context/UsersContext'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'
import Footer from './components/Footer'

const App = () => {
  return (
    <UsersContextProvider>
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <div className="mb-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UsersContextProvider>
  )
}

export default App
