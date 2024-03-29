import React, { useEffect, useState } from 'react'
import './index.css'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './routes/Register'
import Login from './routes/Login'
import Browse from './routes/Browse'
import Profile from './routes/Profile'
import Settings from './routes/Settings'
import Photos from './routes/Photos'
import Setup from './routes/Setup'
import Chat from './routes/Chat'
import UserProfile from './routes/UserProfile'
import Notifications from './routes/Notifications'
import Footer from './components/Footer'
import ResetPassword from './routes/ResetPassword'
import { Hearts } from 'react-loader-spinner'

import { useDispatch, useSelector } from 'react-redux'
import Home from './routes/Home'
import Landing from './routes/Landing'
import { Toaster } from 'react-hot-toast'
import authService from './services/auth'
import Cookies from 'js-cookie'
import { setUser } from './reducers/userReducer'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3001')

const App = () => {
  const users = useSelector(({ users }) => users)
  const loggedInUser = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const match = useMatch('/:username')
  const selectedUser = match
    ? users.find((user) => user.username === match.params.username)
    : null

  useEffect(() => {
    if (loggedInUser) {
      socket && socket.emit('join-room', loggedInUser.id)
    }
  }, [loggedInUser])

  useEffect(() => {
    if (Cookies.get('authorization')) {
      setIsLoading(true)
      authService
        .checkToken()
        .then((res) => {
          authService.authUser(res.id).then((res) => {
            dispatch(setUser(res))
            setIsLoading(false)
          })
        })
        .catch((err) => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col justify-between min-h-screen bg-almost-black">
      {loggedInUser.bio && <Navbar socket={socket} />}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grow">
        {isLoading ? (
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
            <Route
              path="/"
              element={
                loggedInUser.username ? <Home socket={socket} /> : <Landing />
              }
            />
            {loggedInUser.completed === true && (
              <Route path="/home" element={<Home socket={socket} />} />
            )}
            <Route
              path="/login"
              element={
                loggedInUser.username === undefined ? (
                  <Login />
                ) : (
                  <Navigate replace to="/setup" />
                )
              }
            />
            <Route path="/register" element={<Register />} />
            {loggedInUser.completed && (
              <Route path="/browse" element={<Browse />} />
            )}
            {loggedInUser.completed && (
              <Route
                path="/profile"
                element={<Profile user={loggedInUser} />}
              />
            )}
            {loggedInUser.completed && (
              <Route
                path="/settings"
                element={<Settings user={loggedInUser} />}
              />
            )}
            {loggedInUser.completed && (
              <Route path="/photos" element={<Photos />} />
            )}
            <Route
              path="/setup"
              element={
                loggedInUser.completed === false ? (
                  <Setup />
                ) : (
                  <Navigate replace to="/home" />
                )
              }
            />
            {loggedInUser.completed && (
              <Route path="/notifications" element={<Notifications />} />
            )}
            {loggedInUser.completed && (
              <Route path="/chat" element={<Chat socket={socket} />} />
            )}
            {selectedUser && (
              <Route
                path="/:username"
                element={
                  <UserProfile selectedUser={selectedUser} socket={socket} />
                }
              />
            )}
            {!loggedInUser.username && (
              <Route path="/reset_password" element={<ResetPassword />} />
            )}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App
