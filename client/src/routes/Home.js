import usersService from "../services/users"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Home = (props) => {
  const users = useSelector(({ users }) => users)
  const user = useSelector(({ user }) => user)

  console.log("home users: ", users)
  console.log("home user is: ", user)

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
