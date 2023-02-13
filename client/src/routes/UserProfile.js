import React, { useEffect } from 'react'
import { createChat } from '../reducers/chatReducer'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'

const UserProfile = ({ loggedUser, selectedUser }) => {
  console.log('In other user profile page, user info: ', selectedUser)
  const dispatch = useDispatch

  const setupChat = () => {
    const newChat = {
      loggedUserId: loggedUser.id,
      loggedUserImg: loggedUser.profilePicture,
      loggedUserUsername: loggedUser.username,
      recipientId: selectedUser.id,
      recipientImg: selectedUser.profile_picture,
      recipientUsername: selectedUser.username,
    }
    dispatch(createChat(newChat))
  }

  return (
    <div className='flex flex-col ml-32 mr-56 mt-20 text-almost-white'>
      <div className='flex flex-col items-center justify-center'>
        <img
          src={require(`../assets/img/${selectedUser.profile_picture}`)}
          className='object-cover rounded-full h-60 w-60 border border-almost-white mb-10'
          alt='profile-pic'
        ></img>
      </div>
      <div className='flex justify-center items-center text-xl'>
        <div className='w-80'>
          <p className='mb-3'>Username: {selectedUser.username}</p>
          <p className='mb-3'>Name: {selectedUser.firstname}</p>
          <p className='mb-3'>Age: {selectedUser.age}</p>
					<p className='mb-3'>Gender identity: {selectedUser.gender_identity}</p>
					<p className='mb-3'>Interested in: {selectedUser.gender_interest === 'female' ? 'women' : 'men'}</p>
        </div>
        <div>
          <p>City: {selectedUser.city}</p>
					<p>Country: {selectedUser.country}</p>
					<p>Fame: {selectedUser.fame}</p>
        </div>
      </div>

      <div className='flex flex-row justify-between mr-64 ml-64'>
        <button className='w-10 mt-4' onClick={setupChat}>
          <HeartIcon className='h-12 w-12' />
        </button>
        <button className='w-10 mt-4'>
          <XMarkIcon className='h-12 w-12' />
        </button>
      </div>
      {/* <div className='flex items-center justify-center h-96 p-2 mt-10 gap-10 mb-10'>
          {selectedUser.photos.map((photo) => (
            <img
              src={require(`../assets/img/${photo.photo}`)}
              alt=''
              className='object-cover h-96 w-96 border border-almost-white hover:cursor-pointer rounded-lg hover:border-bang-bang hover:border-4'
            />
          ))}
        </div> */}
    </div>
  )
}

export default UserProfile
