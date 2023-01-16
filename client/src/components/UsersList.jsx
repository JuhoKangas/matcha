import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const UsersList = () => {
  const users = useSelector(({ users }) => users)
  //TODO: get filters and filter list
  // const filters = useSelector(({filters}) => filters)

  var sortedList = [...users.data.rows]

  //   if (filters.length > 0) {
  //   const filteredList = sortedList.filter((a) =>
  //     a.content.toLowerCase().includes(filters.toLowerCase())
  //   )
  //   sortedList = filteredList
  // }
  // TODO: sort by location or other
  // sortedList.sort((a, b) => b.distance - a.distance)

  return (
    <div className="flex flex-col gap-8">
      {sortedList.map((user) => (
        <Card key={user.firstname} user={user} />
      ))}
    </div>
  )
}

export default UsersList
