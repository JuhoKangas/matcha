import React from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './routes/Register'
import Login from './routes/Login'
import Matches from './routes/Matches'
import Browse from './routes/Browse'
import Profile from './routes/Profile'
import Settings from './routes/Settings'
import Photos from './routes/Photos'
import Blocked from './routes/Blocked'
import Setup from './routes/Setup'
import Footer from './components/Footer'

import { useSelector } from 'react-redux'
import Home from './routes/Home'
import Landing from './routes/Landing'
import { Toaster } from 'react-hot-toast'
import authService from './services/auth'

const App = () => {
  const user = useSelector(({ user }) => user)
  authService.checkToken().then((res) => console.log('res is ', res))

  return (
    <div className="flex flex-col justify-between min-h-screen bg-almost-black">
      <Router>
        {user.bio && <Navbar user={user} />}
        <Toaster position="top-center" reverseOrder={false} />
        <div className="grow">
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            {user.bio && <Route path="/home" element={<Home />}></Route>}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />} />
            {user.bio && <Route path="/matches" element={<Matches />} />}
            {user.bio && <Route path="/browse" element={<Browse />} />}
            {user.bio && (
              <Route path="/profile" element={<Profile user={user} />} />
            )}
            {user.bio && (
              <Route path="/settings" element={<Settings user={user} />} />
            )}
            {user.bio && <Route path="/photos" element={<Photos />} />}
            {user.bio && <Route path="/blocked" element={<Blocked />} />}
            {<Route path="/setup" element={<Setup user={user} />} />}
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App
