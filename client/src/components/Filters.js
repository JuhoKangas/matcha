import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { setFilteredUsers } from '../reducers/filteredUsersReducer'
import TagFilters from './TagFilters'
import AgeFilters from './AgeFilters'
import DistanceFilters from './DistanceFilters'

const Filters = () => {
  const dispatch = useDispatch()

  const users = useSelector(({ users }) => users)
  const loggedInUser = useSelector(({ user }) => user)

  const tagFilters = useSelector(({ tagFilters }) => tagFilters)
  const ageFilters = useSelector(({ ageFilters }) => ageFilters)
  // const distanceFilters = useSelector(({ distanceFilters }) => distanceFilters)

  useEffect(() => {
    const allUsers = [...users]

    function passesFilters(u) {
      if (u.id === loggedInUser.id) return false
      if (u.age < ageFilters[0]) return false
      if (u.age > ageFilters[1]) return false
      if (tagFilters.length > 0) {
        if (tagFilters.every((tag) => u.tags.includes(tag)) !== true)
          return false
      }
      return true
    }

    const filteredAll = allUsers.filter(passesFilters)

    dispatch(setFilteredUsers(filteredAll))
  }, [users, ageFilters, tagFilters, loggedInUser, dispatch])

  return (
    <div className="flex items-center flew-wrap flex-col gap-2 my-3 justify-center">
      <TagFilters />
      <AgeFilters />
      {/* <FameFilters /> */}
      <DistanceFilters />
    </div>
  )
}

export default Filters
