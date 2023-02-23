import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const UsersList = ({ socket }) => {
  const loggedInUser = useSelector(({ user }) => user)
  const filteredUsers = useSelector(({ filteredUsers }) => filteredUsers)
  const sortingFilter = useSelector(({ sortingFilters }) => sortingFilters)

  const likes = useSelector(({ likes }) => likes)
  const unlikes = useSelector(({ unlikes }) => unlikes)

  const commonTags = (user1, user2) => {
    const common = user1.tags.filter((tag) => user2.tags.includes(tag))
    if (common.length > 0) {
      return common.length
    } else return 0
  }

  const sortedUsers = [...filteredUsers]
  sortedUsers.sort((a, b) => a.distance - b.distance)
  sortedUsers.sort((a, b) => b.fame - a.fame)

  if (sortingFilter === 'Tags') {
    sortedUsers.sort(
      (a, b) => commonTags(loggedInUser, b) - commonTags(loggedInUser, a)
    )
  } else if (sortingFilter === 'Age') {
    sortedUsers.sort((a, b) => a.age - b.age)
  } else if (sortingFilter === 'Fame') {
    sortedUsers.sort((a, b) => b.fame - a.fame)
  } else if (sortingFilter === 'Distance') {
    sortedUsers.sort((a, b) => a.distance - b.distance)
  }

  function passesLikes(u) {
    if (
      likes.find(
        (like) => like.user1 === loggedInUser.id && like.user2 === u.id
      ) ||
      unlikes.find(
        (unlike) =>
          (unlike.user1 === loggedInUser.id && unlike.user2 === u.id) ||
          (unlike.user2 === loggedInUser.id && unlike.user1 === u.id)
      )
    ) {
      return false
    }
    return true
  }

  return (
    <div className="flex flex-col gap-8">
      {sortedUsers.map((u) =>
        passesLikes(u) === true ? (
          <Card key={u.id} user={u} socket={socket} />
        ) : (
          ''
        )
      )}
    </div>
  )
}

export default UsersList
