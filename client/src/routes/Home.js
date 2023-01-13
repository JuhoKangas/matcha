import usersService from '../services/users'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/Card'
import Filter from '../components/Filter'
import { initializeFilters } from '../reducers/filterReducer'

const Home = (props) => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users)
  const user = useSelector(({ user }) => user)

  console.log('home users: ', users)
  console.log('home user is: ', user)

  //TODO: get all tags from backend
  const allTags = [
    'stars',
    'cars',
    'photography',
    'climbing',
    'cats',
    'dogs',
    'food',
  ]

  const filters = useSelector(({ filters }) => filters)

  // useEffect(() => {
  //   dispatch(initializeFilters())
  // }, [dispatch])

  var sortedList = [...users.data.rows]

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

  console.log('in home sortedList is: ', sortedList)
  console.log('in home filters is: ', filters)
  return (
    <div>
      <div
        className="text-center font-montserrat font-bold leading-tight text-almost-white
		 text-lg my-10"
      >
        Filter by
        {/* <div className="flex flex-wrap gap-2 my-3 justify-center">
          {filters.map((filter) => (
            <Filter key={filter} filter={filter} />
          ))}
        </div> */}
        <div className="flex flex-wrap gap-2 my-3 justify-center">
          {allTags.map((tags) => (
            <Filter key={tags} filter={tags} />
          ))}
        </div>
      </div>
      {/* <div
        className="text-center font-montserrat font-bold leading-tight text-almost-white
		 text-lg my-10"
      >
        Now filtering by
        <div className="flex flex-wrap gap-2 my-3 justify-center">
          {filters.map((filter) => (
            <Filter key={filter} filter={filter} />
          ))}
        </div>
      </div> */}
      <div
        className="text-center font-montserrat font-bold leading-tight text-almost-white
		 text-2xl my-5"
      >
        Anyone you fancy?
      </div>
      <div className="flex flex-col gap-8">
        {sortedList.map((user) => (
          <Card key={user.firstname} user={user} />
        ))}
      </div>

      {/* <div>
        {sortedList.map((users) => (
          <TinderCard
            key={users.firstname}
            onSwipe={(dir) => swiped(dir, users.firstname)}
            onCardLeftScreen={() => outOfFrame(users.firstname)}
          >
            <div>
              <ListGroup className="list-group-flush user-info">
                <div
                  style={{
                    backgroundImage: 'url(' + users.image + ')',
                  }}
                  className="user-card"
                >
                  <h3>{users.firstname}</h3>
                </div>

                <ListGroup.Item>
                  Location: {users.city}, {users.country}
                </ListGroup.Item>
                <ListGroup.Item>Interests: Harvesting souls</ListGroup.Item>
                <ListGroup.Item>Bio: {users.bio}</ListGroup.Item>
                <ListGroup.Item>Fame rate: {users.fame}</ListGroup.Item>
              </ListGroup>
            </div>
          </TinderCard>
        ))}
      </div> */}
    </div>
  )
}

export default Home
