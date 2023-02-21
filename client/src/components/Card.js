import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tag from './Tag'
// import { createChat } from '../reducers/chatReducer'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { likeUser } from '../reducers/likesReducer'
import { matchUsers } from '../reducers/matchesReducer'

const Card = ({ user, socket }) => {
  const loggedInUser = useSelector(({ user }) => user)
  const likes = useSelector(({ likes }) => likes)
  const dispatch = useDispatch()

  const handleLike = (toLikeId) => {
    const otherHasLiked = likes.filter(
      (like) => like.user1 === toLikeId && like.user2 === loggedInUser.id
    )
    dispatch(likeUser(loggedInUser.id, toLikeId))
    //notification to other user they were liked
    if (otherHasLiked.length !== 0) {
      dispatch(matchUsers(loggedInUser.id, toLikeId))
      //NOTIFICATION/ MESSAGE TO ME: NEW MATCH!
      //setupChat
    }
  }

  console.log('OH MY LIKES: ', likes)

  // const handleUnlike = (toUnlikeId) => {
  //   dispatch(removeLikes(loggedUser.id, toUnlikeId))
  //   dispatch(addUnlikes(loggedUser.id, toUnlikeId))

  //   //when unlike button: remove like if exists, add unlike
  //   //remove match if exists
  //   //block profile list?
  // }

  // const setupChat = () => {
  //   console.log('setup chat')
  //   const newChat = {
  //     loggedUserId: loggedInUser.id,
  //     loggedUserImg: loggedInUser.profilePicture,
  //     loggedUserUsername: loggedInUser.username,
  //     recipientId: user.id,
  //     recipientImg: user.profilePicture,
  //     recipientUsername: user.username,
  //   }
  //   dispatch(createChat(newChat))
  // }

  const usernamePath = `/${user.username}`

  return (
    <div className="p-3 flex flex-col items-center">
      <div className="w-80 h-min rounded-lg bg-white border border-gray-400 shadow-lg">
        <img
          src={`http://localhost:3001/uploads/${user.profilePicture}`}
          className="w-full rounded-t-lg user-image p-1"
          title="tphoto"
          alt="Profile pics"
        />
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-xl">
              {/* TO DO: on username click, redirect to profile page */}
              <Link to={usernamePath}>
                <span className="font-bold text-chitty-chitty hover:text-blue-800 cursor-pointer">
                  {user.username},{' '}
                </span>
              </Link>
              <span className="font-light text-gray-400">{user.age}</span>
            </div>

            <div className="text-lg text-gray-500">
              {/* TO DO: change number to flame or stars? */}
              {user.fame}
            </div>
          </div>

          <div className="text-sm text-gray-400">
            {user.city}, {user.distance} km away
          </div>

          <div className="my-4">
            <div className="text-sm">
              <span className="text-chitty-chitty"></span>
              <div className="flex flex-wrap gap-2 mb-3">
                {user.tags.map((tag) => (
                  <Tag key={tag} tagName={tag} hover="none" />
                ))}
              </div>
            </div>
            <div className="text-sm">
              <span className="text-chitty-chitty">Bio: </span>
              <span className="text-gray-400">{user.bio}</span>
            </div>
            <div className="flex flex-row justify-between">
              <button className="w-10 mt-4" onClick={() => handleLike(user.id)}>
                <HeartIcon className="h-8 w-8" />
              </button>
              <button className="w-10 mt-4">
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
