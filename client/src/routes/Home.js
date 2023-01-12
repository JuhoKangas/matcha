import usersService from '../services/users'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'

const Home = (props) => {
  const users = useSelector(({ users }) => users)
  const user = useSelector(({ user }) => user)

  console.log('home users: ', users)
  console.log('home user is: ', user)

  var sortedList = [...users.data.rows]
  // const [lastDirection, setLastDirection] = useState()

  // const swiped = (direction, nameToDelete) => {
  //   console.log('removing: ' + nameToDelete)
  //   setLastDirection(direction)
  // }

  // const outOfFrame = (name) => {
  //   console.log(name + ' left the screen!')
  // }

  console.log(
    'in home users.data.rows[0].username is: ',
    users.data.rows[0].username
  )
  return (
    <div>
      <h1>Home</h1>
      <h2>Filters</h2>
      <h2>Possible matches</h2>

      <div>
        {sortedList.map((users) => (
          <Card key={users.firstname} user={users} />
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
