import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, loginUser } from '../reducers/userReducer'
import { useCookies } from 'react-cookie'

const Card = ({ user }) => {
  const dispatch = useDispatch()
  // const [cookie, setCookie, removeCookie] = useCookies(['user'])
  // const [coordinates, setCoordinates] = useState(null)

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         setCoordinates({
  //           lat: pos.coords.latitude,
  //           lon: pos.coords.longitude,
  //         })
  //       },
  //       // todo: Handle error with notification or not at all
  //       (err) => console.log(err)
  //     )
  //   }
  // }, [])

  return (
    <div className="h-screen flex flex-col">
      <div>
        <h1
          className="text-center font-montserrat font-bold leading-tight text-almost-white
		 text-4xl mt-20 mb-20"
        >
          One card
        </h1>
      </div>

      {/* start card */}
      <div class="p-3 flex flex-col items-center">
        <div class="w-80 h-min rounded-lg bg-white border border-gray-400 shadow-lg">
          <img
            src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            class="w-full user-image "
            title="tphoto"
            alt="Tinder Photo"
          />

          <div class="flex justify-between">
            <div class="text-xl float-left p-4">
              {/* TO DO: on username click, redirect to profile page */}
              <span class="font-bold text-chitty-chitty hover:text-blue-800">
                {user.firstname},{' '}
              </span>
              <span class="font-light text-gray-400">{user.age}</span>
            </div>

            <div class="tinfo text-lg float-right text-gray-500 p-4">
              {/* TO DO: change number to flame or stars? */}
              Fame rate: {user.fame}
            </div>
          </div>

          <span class="pl-4 text-gray-400">
            3 km away, Location: {user.city}, {user.country}
          </span>

          <div class="mt-5 mb-5">
            <div class="pl-4 text-sm">
              <span class="text-chitty-chitty">Interests: </span>
              <span class="text-gray-400">
                Tags could be displayed as clickable areas
              </span>
            </div>
            <div class="pl-4 text-sm">
              <span class="text-chitty-chitty">Bio: </span>
              <span class="text-gray-400">
                Here would go the bio {user.bio}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* end card */}
    </div>
  )
}

export default Card
