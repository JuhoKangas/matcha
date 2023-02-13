import React from 'react'
import { useDispatch } from 'react-redux'
import Tag from './Tag'
import { createChat } from '../reducers/chatReducer'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { otherUserProfile } from '../reducers/usersReducer'

const Card = ({ user, loggedUser }) => {
	console.log("This is user from card ", user)
	const dispatch = useDispatch()

	const setupChat = () => {
		const newChat = {
			loggedUserId: loggedUser.id,
			loggedUserImg: loggedUser.profilePicture,
			loggedUserUsername: loggedUser.username,
			recipientId: user.id,
			recipientImg: user.profile_picture,
			recipientUsername: user.username
		}
		dispatch(createChat(newChat))
	}

	const otherProfile = (userId) => {
		dispatch(otherUserProfile(userId))
  };

  return (
    <div className='p-3 flex flex-col items-center'>
      <div className='w-80 h-min rounded-lg bg-white border border-gray-400 shadow-lg'>
        <img
          src={require(`../assets/img/${user.profile_picture}`)}
          className='w-full rounded-t-lg user-image p-1'
          title='tphoto'
          alt='Profile pics'
        />
        <div className='p-4'>
          <div className='flex justify-between'>
            <div className='text-xl'>
              {/* TO DO: on username click, redirect to profile page */}
              <span className='font-bold text-chitty-chitty hover:text-blue-800 cursor-pointer' onClick={otherProfile(user.id)}>
                {user.username},{' '}
              </span>
              <span className='font-light text-gray-400'>{user.age}</span>
            </div>

            <div className='text-lg text-gray-500'>
              {/* TO DO: change number to flame or stars? */}
              {user.fame}
            </div>
          </div>

          <div className='text-sm text-gray-400'>{user.city}, 3 km away</div>

          <div className='my-4'>
            <div className='text-sm'>
              <span className='text-chitty-chitty'></span>
              <div className='flex flex-wrap gap-2 mb-3'>
                {user.tags.map((tag) => (
                  <Tag key={tag} tagName={tag} hover='none' />
                ))}
              </div>
            </div>
            <div className='text-sm'>
              <span className='text-chitty-chitty'>Bio: </span>
              <span className='text-gray-400'>{user.bio}</span>
            </div>
						<div className='flex flex-row justify-between'>
							<button
									className='w-10 mt-4'
									onClick={setupChat}
								>
									<HeartIcon className='h-8 w-8' />
								</button>
								<button
									className='w-10 mt-4'
								>
									<XMarkIcon className='h-8 w-8' />
								</button>
						</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
