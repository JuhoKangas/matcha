import React, { useEffect, useRef } from 'react'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { likeUser } from '../reducers/likesReducer'
import { unlikeUser } from '../reducers/unlikesReducer'
import { useNavigate } from 'react-router-dom'

const UserProfile = ({ socket, selectedUser }) => {
  const loggedInUser = useSelector(({ user }) => user)
  const likes = useSelector(({ likes }) => likes)
  const navigate = useNavigate()

  const hasLiked = likes.find(
    (like) => like.user1 === loggedInUser.id && like.user2 === selectedUser.id
  )

  const showOnlineStatus = () => {
    const status =
      selectedUser.online === 1
        ? 'ONLINE'
        : moment(selectedUser.lastSeen).format('MMMM Do, h:mm:ss a')
    return status
  }

  useEffect(() => {
    socket.emit('notification', {
      user1: loggedInUser.id,
      user2: selectedUser.id,
      content: `${loggedInUser.username} viewed your profile.`,
      type: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch()
  const likeButtonRef = useRef()

  const handleLike = (userToLike) => {
    dispatch(likeUser(loggedInUser, userToLike))
    likeButtonRef.current.style.visibility = 'hidden'
  }

  const handleUnlike = (userToUnlike) => {
    dispatch(unlikeUser(loggedInUser, userToUnlike))
    navigate('/home')
  }

  return (
    <div className="flex flex-col ml-32 mr-56 mt-20 text-almost-white">
      <div className="flex flex-col items-center justify-center">
        <img
          src={`http://localhost:3001/uploads/${selectedUser.profilePicture}`}
          className="object-cover rounded-full h-60 w-60 border border-almost-white mb-10"
          alt="profile-pic"
        ></img>
      </div>
      <div className="flex justify-center mb-3">
        <p className="text-chitty-chitty text-3xl">{selectedUser.username}</p>
      </div>
      <div className="flex justify-center mb-3">{showOnlineStatus()}</div>
      <div className="flex justify-center text-xl mt-10">
        <div className="flex flex-col justify-center">
          <div className="mb-3 flex items-center">
            <div className="text-chitty-chitty flex w-80">Name:</div>{' '}
            {selectedUser.firstname} {selectedUser.lastname}
          </div>
          <div className="mb-3 flex items-center">
            <div className="text-chitty-chitty flex w-80">Age:</div>{' '}
            {selectedUser.age}
          </div>
          <div className="mb-3 flex items-center">
            <div className="text-chitty-chitty flex w-80">Gender Identity:</div>{' '}
            {selectedUser.genderIdentity}
          </div>
          <div className="mb-3 flex items-center">
            <div className="text-chitty-chitty flex w-80">Interested in:</div>{' '}
            {selectedUser.gender_interest === 'female' ? 'women' : 'men'}
          </div>
          <div className="mb-3 flex items-center">
            <div className="text-chitty-chitty flex w-80">City:</div>{' '}
            {selectedUser.city}
          </div>
          <div className="mb-3 flex items-center">
            <div className="text-chitty-chitty flex w-80">Country:</div>{' '}
            {selectedUser.country}
          </div>
          <div className="mb-3 flex items-center">
            <div className="text-chitty-chitty flex w-80">Fame:</div>{' '}
            {selectedUser.fame}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mt-10 ">
        <div className="flex gap-96 ">
          {!hasLiked ? (
            <button
              ref={likeButtonRef}
              className="w-10 mt-4"
              onClick={() => handleLike(selectedUser)}
            >
              <HeartIcon className="h-12 w-12" />
            </button>
          ) : (
            ''
          )}
          <button
            className="w-10 mt-4"
            onClick={() => handleUnlike(selectedUser)}
          >
            <XMarkIcon className="h-12 w-12" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
