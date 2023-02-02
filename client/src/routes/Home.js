import UsersList from '../components/UsersList'
import Filters from '../components/Filters'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Home = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

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
