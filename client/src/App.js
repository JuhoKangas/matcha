import React from 'react'
import './index.css'
import { UsersContextProvider } from './context/UsersContext'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'

const App = () => {
  return (
    <UsersContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UsersContextProvider>
  )
}

export default App
