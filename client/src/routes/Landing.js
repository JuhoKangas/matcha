import React from "react"
import { useNavigate } from "react-router-dom"
import "../styles.css"
// import { useSelector } from 'react-redux'

const Landing = () => {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate("/login")
  }

  const navigateSignup = () => {
    navigate("/register")
  }

  return (
    <>
      <div className="flex flex-col bg-almost-black">
        <h1
          className="text-center font-montserrat font-bold font-style: italic leading-tight text-almost-white
		 text-4xl mt-20 mb-20"
        >
          Find your perfect match with us!
        </h1>
        <div className="flex justify-center items-between">
          <div className="">
            <div className="p-10 min-w-90">
              <p
                className="text-center font-montserrat font-medium leading-tight text-almost-white
		 		text-2xl mt-20 mb-20"
              >
                Already a user?
              </p>
              <button
                className="w-full bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
                onClick={navigateLogin}
              >
                Log in
              </button>
            </div>
            <hr className="w-full" />
            <div className="p-10 min-w-90">
              <p
                className="text-center font-montserrat leading-tight text-almost-white
		 		text-2xl mb-20"
              >
                Want to join our community?
              </p>
              <button
                className="w-full bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
                onClick={navigateSignup}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
