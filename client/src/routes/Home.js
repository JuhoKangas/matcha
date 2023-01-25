import UsersList from '../components/UsersList'
import Filters from '../components/Filters'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setFilteredUsers } from '../reducers/filteredUsersReducer'
import { initializeUsers } from '../reducers/usersReducer'

const Home = (props) => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const tagFilters = useSelector(({ tagFilters }) => tagFilters)

  useEffect(() => {
    if (tagFilters.length > 0) {
      var filteredList = [...users]

      tagFilters.forEach((element) => {
        filteredList = filteredList.filter((u) => u.tags.includes(element))
        dispatch(setFilteredUsers(filteredList))
      })
    } else {
      dispatch(setFilteredUsers([...users]))
    }
  }, [users, tagFilters, dispatch])

  return (
    <div>
      <div
        className="text-center font-montserrat font-bold leading-tight text-almost-white
		 text-lg my-10"
      >
        Filter by
        <Filters />
      </div>
      <div
        className="text-center font-montserrat font-bold leading-tight text-almost-white
		 text-2xl my-5"
      >
        Anyone you fancy?
      </div>
      <UsersList />
    </div>
  )
}

export default Home
