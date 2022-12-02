import { UserContext } from '../App'
import React from 'react'

const Title = () => {
  const title = React.useContext(UserContext)

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold underline text-red-600">{title}</h1>
    </div>
  )
}

export default Title
