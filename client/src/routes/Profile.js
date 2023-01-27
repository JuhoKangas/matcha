import React from "react"
import { useNavigate } from "react-router-dom"
//import photo from "../assets/woman.jpg"

const Profile = ({ user }) => {
  const navigate = useNavigate()

  const navigateUserSettings = () => {
    navigate("/settings")
  }

  const navigateUserPhotos = () => {
	navigate("/photos")
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-12 mt-10">
        <img
          src={require(`../assets/img/${user.profilePicture}`)}
          className="object-cover rounded-full h-60 w-60 border border-almost-white"
          alt="profile-pic"
        ></img>
        <p className="font-bold font-montserrat text-chitty-chitty text-2xl">{user.username}, {user.age}</p>
		<p className="font-montserrat text-almost-white text-lg max-w-lg text-center">{user.bio}</p>
      </div>
      <div className="p-10 flex justify-center gap-10 mt-10">
        <button
          className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat min-w-[10%]"
          onClick={navigateUserSettings}
        >
          Modify my information
        </button>
		<button
          className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat min-w-[10%]"
          onClick={navigateUserPhotos}
        >
          Upload photos
        </button>
      </div>
    </div>
  )
}

export default Profile
