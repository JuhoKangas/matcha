import React, { useEffect } from 'react'
// import { createChat } from '../reducers/chatReducer'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
//import getSelectedUserPhotos from '../services/users'

const UserProfile = ({ socket, selectedUser }) => {
  console.log('In other user profile page, user info: ', selectedUser)
  // const dispatch = useDispatch()
  const loggedUser = useSelector(({ user }) => user)

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
      content: `${selectedUser.username} viewed your profile.`,
      type: 1,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //const photos = getSelectedUserPhotos(selectedUser.id)
  //console.log("Photos of selecetd user", photos)

  return (
    <div className="flex flex-col ml-32 mr-56 mt-20 text-almost-white">
      <div className="flex flex-col items-center justify-center">
        <img
          src={`http://localhost:3001/uploads/${selectedUser.profilePicture}`}
          className="object-cover rounded-full h-60 w-60 border border-almost-white mb-10"
          alt="profile-pic"
        ></img>
      </div>
      <div className="flex justify-center items-center text-xl">
        <div className="w-80">
          <p className="mb-3">Username: {selectedUser.username}</p>
          <p className="mb-3">Name: {selectedUser.firstname}</p>
          <p className="mb-3">Age: {selectedUser.age}</p>
          <p className="mb-3">
            Gender identity: {selectedUser.gender_identity}
          </p>
          <p className="mb-3">
            Interested in:{' '}
            {selectedUser.gender_interest === 'female' ? 'women' : 'men'}
          </p>
        </div>
        <div>
          <p>City: {selectedUser.city}</p>
          <p>Country: {selectedUser.country}</p>
          <p>Fame: {selectedUser.fame}</p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center mt-10 ">
        <div className="flex gap-96 ">
          <button className="w-10 mt-4">
            {/* <button className="w-10 mt-4" onClick={setupChat}> */}
            <HeartIcon className="h-12 w-12" />
          </button>
          <button className="w-10 mt-4">
            <XMarkIcon className="h-12 w-12" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
