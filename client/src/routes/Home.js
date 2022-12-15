import usersService from '../services/users'
import { useEffect, useState } from 'react'

const Home = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users.data.rows))
  }, [])

  console.log(users)

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
