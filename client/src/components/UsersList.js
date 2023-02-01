import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const UsersList = () => {
  const filteredUsers = useSelector(({ filteredUsers }) => filteredUsers)
  const loggedInUser = useSelector(({ user }) => user)

  console.log('in UsersList filteredUsers is: ', filteredUsers)

  return (
    <div className="flex flex-col gap-8">
      {filteredUsers.map((u) =>
        loggedInUser.id !== u.id ? <Card key={u.id} user={u} /> : ''
      )}
    </div>
  )
}

export default UsersList
