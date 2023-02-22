import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { setFilteredUsers } from '../reducers/filteredUsersReducer'
import TagFilters from './TagFilters'
import AgeFilters from './AgeFilters'
import DistanceFilters from './DistanceFilters'
import FameFilters from './FameFilters'

const Filters = () => {
  const dispatch = useDispatch()

  const users = useSelector(({ users }) => users)
  const loggedInUser = useSelector(({ user }) => user)

  const tagFilters = useSelector(({ tagFilters }) => tagFilters)
  const ageFilters = useSelector(({ ageFilters }) => ageFilters)
  const distanceFilters = useSelector(({ distanceFilters }) => distanceFilters)
  const fameFilters = useSelector(({ fameFilters }) => fameFilters)
  const likes = useSelector(({ likes }) => likes)
  const unlikes = useSelector(({ unlikes }) => unlikes)

  const handleApplyClick = () => {
    const allUsers = [...users]

    function passesFilters(u) {
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
      if (u.age < ageFilters[0] || u.age > ageFilters[1]) return false
      if (tagFilters.length > 0) {
        if (tagFilters.every((tag) => u.tags.includes(tag)) !== true)
          return false
      }
      if (u.distance < distanceFilters[0] || u.distance > distanceFilters[1])
        return false
      if (u.fame < fameFilters[0] || u.fame > fameFilters[1]) return false
      if (
        loggedInUser.genderIdentity !== u.genderInterest &&
        u.genderInterest !== 'everyone'
      ) {
        return false
      }
      if (
        loggedInUser.genderInterest !== u.genderIdentity &&
        loggedInUser.genderInterest !== 'everyone'
      ) {
        return false
      }
      return true
    }

    const filteredAll = allUsers.filter(passesFilters)
    dispatch(setFilteredUsers(filteredAll))
  }

  return (
    <div className="flex items-center flew-wrap flex-col gap-2 my-3 justify-center">
      <TagFilters />
      <AgeFilters />
      <DistanceFilters />
      <FameFilters />
      <button
        className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center m-2"
        onClick={() => handleApplyClick()}
      >
        Apply filters
      </button>
    </div>
  )
}

export default Filters
