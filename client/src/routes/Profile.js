import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedChat } from '../reducers/chatReducer'
//import photo from "../assets/woman.jpg"

const Profile = ({ user }) => {
  console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSelectedChat(null))
  }, [dispatch])

  const navigateUserSettings = () => {
    navigate('/settings')
  }

  const navigateUserPhotos = () => {
    navigate('/photos')
  }

  return (
    <div>
      <h2 className='text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20'>
        ✨ My Information ✨
      </h2>
      <div className='flex flex-col items-center justify-center gap-12 mt-10'>
        <img
          src={`http://localhost:3001/uploads/${user.profilePicture}`}
          className='object-cover rounded-full h-60 w-60 border border-almost-white'
          alt='profile-pic'
        ></img>
        <p className='font-bold font-montserrat text-chitty-chitty text-2xl'>
          {user.username}, {user.age}
        </p>
        <p className='font-montserrat text-almost-white text-lg max-w-lg text-center'>
          {user.bio}
        </p>
      </div>
      <div className='p-10 flex justify-center gap-10 mt-10'>
        <button
          className='bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat min-w-[10%]'
          onClick={navigateUserSettings}
        >
          Modify my information
        </button>
      </div>
      <hr className='w-96 h-0.5 mx-auto bg-almost-white border-0 rounded md:my-10 dark:bg-gray-700 opacity-80' />
      <h2 className='text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20'>
        ✨ My Images ✨
      </h2>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center h-96 p-2 mt-10 gap-10 mb-10'>
          {/* {user.photos.map((photo) => (
            <img
              src={require(`../assets/img/${photo.photo}`)}
              alt=''
              className='object-cover h-96 w-96 border border-almost-white hover:cursor-pointer rounded-lg hover:border-bang-bang hover:border-4'
            />
          ))} */}
        </div>
      </div>
      <div className='p-10 flex justify-center gap-10 mt-8'>
        <button
          className='bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat min-w-[10%]'
          onClick={navigateUserPhotos}
        >
          Modify my photos
        </button>
      </div>
    </div>
  )
}

export default Profile
