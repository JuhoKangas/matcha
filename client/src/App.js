import React, { useEffect, useState } from 'react'
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
import { Hearts } from 'react-loader-spinner'

import { useDispatch, useSelector } from 'react-redux'
import Home from './routes/Home'
import Landing from './routes/Landing'
import { Toaster } from 'react-hot-toast'
import authService from './services/auth'
import axios from 'axios'
import Cookies from 'js-cookie'
import { setUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (Cookies.get('authorization')) {
      setIsLoading(true)
      authService
        .checkToken()
        .then((res) => {
          // Todo: move axios to services
          axios.get(`http://localhost:3001/users/${res.id}`).then((res) => {
            dispatch(setUser(res.data.data.rows[0]))
            setIsLoading(false)
          })
        })
        .catch((err) => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col justify-between min-h-screen bg-almost-black">
      <Router>
        {user.bio && <Navbar user={user} />}
        <Toaster position="top-center" reverseOrder={false} />
        <div className="grow">
          {isLoading ? (
            // Todo: fix the css to position the hearts to the middle of the page
            <Hearts
              height="80"
              width="80"
              color="#007991"
              ariaLabel="hearts-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <Routes>
              <Route path="/" element={<Landing />} />
              {user.bio && <Route path="/home" element={<Home />} />}
              <Route path="/login" element={<Login />} />
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
              <Route path="/setup" element={<Setup user={user} />} />
            </Routes>
          )}
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App
