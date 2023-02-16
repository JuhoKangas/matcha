import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const UsersList = () => {
  const loggedInUser = useSelector(({ user }) => user)
  const filteredUsers = useSelector(({ filteredUsers }) => filteredUsers)
  const sortingFilter = useSelector(({ sortingFilters }) => sortingFilters)

  const commonTags = (user1, user2) => {
    const common = user1.tags.filter((tag) => user2.tags.includes(tag))
    if (common.length > 0) {
      return common.length
    } else return 0
  }

  const sortedUsers = [...filteredUsers]

  if (sortingFilter === 'Tags') {
    sortedUsers.sort(
      (a, b) => commonTags(loggedInUser, b) - commonTags(loggedInUser, a)
    )
  } else if (sortingFilter === 'Age') {
    sortedUsers.sort((a, b) => a.age - b.age)
  } else if (sortingFilter === 'Fame') {
    sortedUsers.sort((a, b) => b.fame - a.fame)
  } else {
    sortedUsers.sort((a, b) => a.distance - b.distance)
  }

  return (
    <div className="flex flex-col gap-8">
      {sortedUsers.map((u) => (
        <Card key={u.id} user={u} />
      ))}
    </div>
  )
}

export default UsersList
