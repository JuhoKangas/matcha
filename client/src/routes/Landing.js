import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles.css'

const Landing = () => {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate('/login')
  }

  const navigateSignup = () => {
    navigate('/register')
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-cover bg-landing-bg">
        <div className="bg-almost-black/75 w-1/5 mt-32 ml-96 rounded-3xl">
          <h1
            className="text-center font-script font-bold font-style: italic leading-tight text-almost-white
		 md:text-5xl mt-10 p-5"
          >
            In Life, It's Not Where You Go, It's Who You Travel With
          </h1>

          <hr className="md:w-64 h-1 mx-auto bg-almost-white border-0 rounded md:my-10 dark:bg-gray-700" />

          <div className="">
            <div className="flex flex-col items-center p-5 min-w-90">
              <p
                className="text-center font-montserrat italic leading-tight text-almost-white
		 		md:text-2xl mb-10"
              >
                Already a user?
              </p>
              <button
                className="w-28 bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
                onClick={navigateLogin}
              >
                Log in
              </button>
            </div>

            <hr className="md:w-64 h-0.5 mx-auto bg-almost-white border-0 rounded md:my-10 dark:bg-gray-700 opacity-30" />
            <div className="flex flex-col items-center p-5 min-w-90 mb-10">
              <p
                className="text-center font-montserrat italic leading-tight text-almost-white
		 		md:text-2xl mb-10"
              >
                Want to join our community?
              </p>
              <button
                className="w-28 bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
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
