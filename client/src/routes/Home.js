import usersService from '../services/users'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UsersList from '../components/UsersList'
import Filters from '../components/Filters'

const Home = (props) => {
  // const dispatch = useDispatch()
  // const user = useSelector(({ user }) => user)

  // const filters = useSelector(({ filters }) => filters)

  // useEffect(() => {
  //   dispatch(initializeFilters())
  // }, [dispatch])

  // if (filters.length > 0) {
  //   const filteredList = sortedList.filter((a) =>
  //     a.content.toLowerCase().includes(filters.toLowerCase())
  //   )
  //   sortedList = filteredList
  // }
  // TODO: sort by location
  // sortedList.sort((a, b) => b.distance - a.distance)

  // const [lastDirection, setLastDirection] = useState()

  // const swiped = (direction, nameToDelete) => {
  //   console.log('removing: ' + nameToDelete)
  //   setLastDirection(direction)
  // }

  // const outOfFrame = (name) => {
  //   console.log(name + ' left the screen!')
  // }

  // console.log('in home sortedList is: ', sortedList)
  // console.log('in home filters is: ', filters)

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
