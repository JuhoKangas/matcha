import React, { useEffect } from 'react'
// import { createChat } from '../reducers/chatReducer'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import moment from 'moment'
//import usersService from '../services/users'

const UserProfile = ({ socket, selectedUser }) => {
  console.log('In other user profile page, user info: ', selectedUser)
  // const dispatch = useDispatch()
  const loggedUser = useSelector(({ user }) => user)

	const showOnlineStatus = () => {
		const status = selectedUser.online === 1 ? "ONLINE" : moment(selectedUser.lastSeen).format('MMMM Do, h:mm:ss a')
		return status
	}

  // const setupChat = () => {
  //   const newChat = {
  //     loggedUserId: loggedUser.id,
  //     loggedUserImg: loggedUser.profilePicture,
  //     loggedUserUsername: loggedUser.username,
  //     recipientId: selectedUser.id,
  //     recipientImg: selectedUser.profile_picture,
  //     recipientUsername: selectedUser.username,
  //   }
  //   dispatch(createChat(newChat))
  // }

  useEffect(() => {
    console.log('ONE IN USERPROFILE')
    socket.emit('notification', {
      user1: loggedUser.id,
      user2: selectedUser.id,
      content: `${loggedUser.username} viewed your profile.`,
      type: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //const photos = usersService.getSelectedUserPhotos(selectedUser.id)
  //console.log("Photos of selecetd user", photos)

  return (
    <div className='flex flex-col ml-32 mr-56 mt-20 text-almost-white'>
      <div className='flex flex-col items-center justify-center'>
        <img
          src={`http://localhost:3001/uploads/${selectedUser.profilePicture}`}
          className='object-cover rounded-full h-60 w-60 border border-almost-white mb-10'
          alt='profile-pic'
        ></img>
      </div>
      <div className='flex justify-center mb-3'>
        <p className='text-chitty-chitty text-3xl'>{selectedUser.username}</p>
      </div>
			<div className='flex justify-center mb-3'>
     		{showOnlineStatus()}
      </div>
      <div className='flex justify-center text-xl mt-10'>
        <div className='flex flex-col justify-center'>
          <div className='mb-3 flex items-center'><div className='text-chitty-chitty flex w-80'>Name:</div> {selectedUser.firstname}</div>
          <div className='mb-3 flex items-center'><div className='text-chitty-chitty flex w-80'>Age:</div> {selectedUser.age}</div>
          <div className='mb-3 flex items-center'><div className='text-chitty-chitty flex w-80'>Gender Identity:</div> {selectedUser.genderIdentity}</div>
          <div className='mb-3 flex items-center'>
					<div className='text-chitty-chitty flex w-80'>Interested in:</div>{' '}
            {selectedUser.gender_interest === 'female' ? 'women' : 'men'}
          </div>
          <div className='mb-3 flex items-center'><div className='text-chitty-chitty flex w-80'>City:</div> {selectedUser.city}</div>
          <div className='mb-3 flex items-center'><div className='text-chitty-chitty flex w-80'>Country:</div> {selectedUser.country}</div>
          <div className='mb-3 flex items-center'><div className='text-chitty-chitty flex w-80'>Fame:</div> {selectedUser.fame}</div>
        </div>
      </div>

      <div className='flex flex-row justify-center items-center mt-10 '>
        <div className='flex gap-96 '>
          <button className='w-10 mt-4'>
            {/* <button className="w-10 mt-4" onClick={setupChat}> */}
            <HeartIcon className='h-12 w-12' />
          </button>
          <button className='w-10 mt-4'>
            <XMarkIcon className='h-12 w-12' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
