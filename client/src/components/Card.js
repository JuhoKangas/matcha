import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tag from './Tag'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { likeUser } from '../reducers/likesReducer'
import { unlikeUser } from '../reducers/unlikesReducer'

const Card = ({ user, socket }) => {
  const loggedInUser = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const cardUserRef = useRef()

  const handleLike = (userToLike) => {
    dispatch(likeUser(loggedInUser, userToLike, socket))
    cardUserRef.current.style.display = 'none'
  }

  const handleUnlike = (userToUnlike) => {
    dispatch(unlikeUser(loggedInUser, userToUnlike, socket))
    cardUserRef.current.style.display = 'none'
  }

  const usernamePath = `/${user.username}`

  return (
    <div ref={cardUserRef} className="p-3 flex flex-col items-center">
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
              <Link to={usernamePath}>
                <span className="font-bold text-chitty-chitty hover:text-blue-800 cursor-pointer">
                  {user.username},{' '}
                </span>
              </Link>
              <span className="font-light text-gray-400">{user.age}</span>
            </div>

            <div className="text-lg text-gray-500">
              <HeartIcon className="h-4 w-4 inline-block fill-chitty-chitty" />{' '}
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
              <button className="w-10 mt-4" onClick={() => handleLike(user)}>
                <HeartIcon className="h-8 w-8" />
              </button>
              <button className="w-10 mt-4" onClick={() => handleUnlike(user)}>
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
