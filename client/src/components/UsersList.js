import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const UsersList = () => {
  const filteredUsers = useSelector(({ filteredUsers }) => filteredUsers)

  console.log('in UsersList filteredUsers is: ', filteredUsers)

  return (
    <div className="flex flex-col gap-8">
      {filteredUsers.map((user) => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UsersList
