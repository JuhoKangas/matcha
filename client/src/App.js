import React, { useEffect } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './routes/Register'
import Login from './routes/Login'
import Footer from './components/Footer'

import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from './reducers/usersReducer'
import Home from './routes/Home'
import Landing from './routes/Landing'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(({ user }) => user)
  console.log('This is user from App.js: ', user)

  return (
    <div className="flex flex-col justify-between bg-almost-black">
      <div className="mb-auto">
        <Router>
          {user.username && <Navbar user={user} />}
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            {user.username && <Route path="/home" element={<Home />}></Route>}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App
