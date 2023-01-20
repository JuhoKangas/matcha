import React, { useEffect } from "react"
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Register from "./routes/Register"
import Login from "./routes/Login"
import Matches from "./routes/Matches"
import Browse from "./routes/Browse"
import Profile from "./routes/Profile"
import Settings from "./routes/Settings"
import Photos from "./routes/Photos"
import Blocked from "./routes/Blocked"
import Footer from "./components/Footer"

import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "./reducers/usersReducer"
import Home from "./routes/Home"
import Landing from "./routes/Landing"
import { Toaster } from "react-hot-toast"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(({ user }) => user)
  console.log("This is user from App.js: ", user)

  return (
    <div className="flex flex-col justify-between min-h-screen bg-almost-black">
      <Router>
        {user.username && <Navbar user={user} />}
          <Toaster position="top-center" reverseOrder={false} />
        <div className="grow">
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            {user.username && <Route path="/home" element={<Home />}></Route>}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/settings" element={<Settings user={user} />} />
			<Route path="/photos" element={<Photos />} />
			<Route path="/blocked" element={<Blocked />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App
