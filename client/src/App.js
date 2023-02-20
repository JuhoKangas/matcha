import React, { useEffect } from 'react'
import './index.css'
import { Routes, Route, useMatch } from 'react-router-dom'
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
import Chat from './routes/Chat'
import UserProfile from './routes/UserProfile'
import Footer from './components/Footer'

import { useSelector } from 'react-redux'
import Home from './routes/Home'
import Landing from './routes/Landing'
import { Toaster } from 'react-hot-toast'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3001')

const App = () => {
  const users = useSelector(({ users }) => users)
  const user = useSelector(({ user }) => user)
  const match = useMatch('/:username')
  const selectedUser = match
    ? users.find((user) => user.username === match.params.username)
    : null
		
		useEffect(() => {
			// join the room
			if (user) {
				socket && socket.emit('join-room', user.id)
	/* 			socket.emit('is-online', user.id)
				socket.on('online-users', (users) => {
					setOnlineUsers(users)
				}) */
			}
		}, [user])

  return (
    <div className='flex flex-col justify-between min-h-screen bg-almost-black'>
      {user.bio && <Navbar user={user} socket={socket} />}
      <Toaster position='top-center' reverseOrder={false} />
      <div className='grow'>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          {user.bio && <Route path='/home' element={<Home socket={socket} />}></Route>}
          <Route path='/login' element={<Login user={user} />}></Route>
          <Route path='/register' element={<Register />} />
          {user.bio && <Route path='/matches' element={<Matches />} />}
          {user.bio && <Route path='/browse' element={<Browse />} />}
          {user.bio && (
            <Route path='/profile' element={<Profile user={user} />} />
          )}
          {user.bio && (
            <Route path='/settings' element={<Settings user={user} />} />
          )}
          {user.bio && (
            <Route path='/photos' element={<Photos user={user} />} />
          )}
          {user.bio && <Route path='/blocked' element={<Blocked />} />}
          {<Route path='/setup' element={<Setup user={user} />} />}
          {user.bio && <Route path='/chat' element={<Chat socket={socket} />} />}
          {selectedUser && (
            <Route
              path='/:username'
              element={
                <UserProfile loggedUser={user} selectedUser={selectedUser} />
              }
            />
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
