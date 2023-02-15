import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const UsersList = () => {
  const filteredUsers = useSelector(({ filteredUsers }) => filteredUsers)
  const sortingFilter = useSelector(({ sortingFilters }) => sortingFilters)
  const loggedInUser = useSelector(({ loggedInUser }) => loggedInUser)

  const commonTags = ({ user1, user2 }) => {
    var common = 0
    if (user1.tags.every((tag) => user2.tags.includes(tag)) === true) {
      common = common + 1
    }
    return common
  }

  const sortedUsers = [...filteredUsers]

  if (sortingFilter === 'Tags') {
    console.log('   sorting by tags')
    sortedUsers.sort(
      (a, b) =>
        commonTags(loggedInUser, b.tags) - commonTags(loggedInUser, a.tags)
    )
  } else if (sortingFilter === 'Age') {
    console.log('   sorting by age')
    sortedUsers.sort((a, b) => a.age - b.age)
  } else if (sortingFilter === 'Fame') {
    console.log('   sorting by fame')
    sortedUsers.sort((a, b) => b.fame - a.fame)
  } else {
    console.log('   sorting by distance')
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
