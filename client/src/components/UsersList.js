import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const UsersList = () => {
  const filteredUsers = useSelector(({ filteredUsers }) => filteredUsers)
	const loggedInUser = useSelector(({ user }) => user)

  console.log('in UsersList filteredUsers is: ', filteredUsers)

  return (
    <div className="flex flex-col gap-8">
      {filteredUsers.map((user) => (
        loggedInUser.id !== user.id ? <Card key={user.id} user={user} /> : <p></p>
      ))}
    </div>
  )
}

export default UsersList
