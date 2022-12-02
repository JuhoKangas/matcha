import Title from './components/Title'
import React from 'react'
import './index.css'

export const UserContext = React.createContext()

function App() {
  return (
    <UserContext.Provider value="Hello Juho">
      <Title />
    </UserContext.Provider>
  )
}

export default App
