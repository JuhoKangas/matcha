import UsersList from '../components/UsersList'
import Filters from '../components/Filters'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import Sorting from '../components/Sorting'
import { setSelectedChat } from '../reducers/chatReducer'

const Home = ({socket}) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeUsers(loggedInUser))
		dispatch(setSelectedChat(null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div>
      <div
        className="text-center font-montserrat font-bold leading-tight text-almost-white
		 text-lg my-10"
      >
        Sort by
        <Sorting />
      </div>
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
      <UsersList socket={socket} />
    </div>
  )
}

export default Home
