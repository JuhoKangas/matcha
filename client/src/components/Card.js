import React from 'react'
import Tag from './Tag'

const Card = ({ user }) => {
  return (
    <div className="p-3 flex flex-col items-center">
      <div className="w-80 h-min rounded-lg bg-white border border-gray-400 shadow-lg">
        <img
          src={require(`../assets/img/${user.profilePicture}`)}
          className="w-full rounded-t-lg user-image p-1"
          title="tphoto"
          alt="Profile pics"
        />
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-xl">
              {/* TO DO: on username click, redirect to profile page */}
              <span className="font-bold text-chitty-chitty hover:text-blue-800 cursor-pointer">
                {user.username},{' '}
              </span>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
