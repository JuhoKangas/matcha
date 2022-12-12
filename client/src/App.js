import React from 'react'
import './index.css'
import { UsersContextProvider } from './context/UsersContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <UsersContextProvider>
      <Router>
        <Routes>{/* bunch of routes here */}</Routes>
      </Router>
    </UsersContextProvider>
  )
}

export default App
