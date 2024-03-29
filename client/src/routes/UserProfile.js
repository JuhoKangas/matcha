import React, { useEffect, useRef, useState } from 'react'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { likeUser } from '../reducers/likesReducer'
import { initializeUnlikes, unlikeUser } from '../reducers/unlikesReducer'
import { useNavigate } from 'react-router-dom'
import photosService from '../services/photos'

import likesService from '../services/likes'
import { toast } from 'react-hot-toast'
import emailService from '../services/email'

const UserProfile = ({ socket, selectedUser }) => {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(({ user }) => user)
  const likes = useSelector(({ likes }) => likes)
  const navigate = useNavigate()
  const [selectedUserPhotos, setSelectedUserPhotos] = useState({})
  const [visiblePhoto, setVisiblePhoto] = useState(loggedInUser.profilePicture)
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    const checkBlocked = async () => {
      const blocked = await likesService.isUnlikedBy(
        loggedInUser.id,
        selectedUser.id
      )
      if (blocked.data === 1) {
        dispatch(initializeUnlikes())
        navigate('/home')
      } else {
        socket.emit('notification', {
          user1: loggedInUser.id,
          user2: selectedUser.id,
          content: `${loggedInUser.username} viewed your profile.`,
          type: 1,
          category: `view`,
        })
      }
    }
    checkBlocked()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasLiked = likes.find(
    (like) => like.user1 === loggedInUser.id && like.user2 === selectedUser.id
  )

  useEffect(() => {
    const getUserPhotos = async () => {
      const userPhotos = await photosService.getUserPhotos(selectedUser.id)
      setSelectedUserPhotos(userPhotos.photos.rows)
      setVisiblePhoto(selectedUser.profilePicture)
    }
    getUserPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showOnlineStatus = () => {
    const status =
      selectedUser.online === 1
        ? 'ONLINE'
        : moment(selectedUser.lastSeen).format('MMMM Do, h:mm:ss a')
    return status
  }

  const likeButtonRef = useRef()

  const handleLike = (userToLike) => {
    dispatch(likeUser(loggedInUser, userToLike, socket))
    likeButtonRef.current.style.visibility = 'hidden'
  }

  const handleUnlike = (userToUnlike) => {
    dispatch(unlikeUser(loggedInUser, userToUnlike, socket))
    navigate('/home')
  }

  const getNextPhoto = () => {
    if (photoIndex < selectedUserPhotos.length) {
      setVisiblePhoto(selectedUserPhotos[photoIndex].photo)
      setPhotoIndex(photoIndex + 1)
    } else {
      setVisiblePhoto(selectedUser.profilePicture)
      setPhotoIndex(0)
    }
  }

  const handleReportAccountClick = async (e) => {
    e.preventDefault()
    emailService.reportAccount(loggedInUser.id, selectedUser.id)

    toast.success(
      `You reported this user as fake. The team takes this seriously and will look into it before taking action. Meanwhile, you can block the user.`,
      { duration: 6000 }
    )
  }

  return (
    <div className="flex flex-col ml-32 mr-56 mt-20 text-almost-white">
      <div className="flex flex-col items-center justify-center">
        <img
          onClick={getNextPhoto}
          src={`http://localhost:3001/uploads/${visiblePhoto}`}
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
      <div className="flex items-center justify-center mt-10 mb-10">
        <button
          className="ring-1 ring-chitty-chitty rounded-xl whitespace-nowrap px-2 inline-block align-baseline font-semibold text-sm text-chitty-chitty  hover:bg-chitty-chitty hover:text-white"
          onClick={handleReportAccountClick}
        >
          Report this account as fake
        </button>
      </div>
    </div>
  )
}

export default UserProfile
