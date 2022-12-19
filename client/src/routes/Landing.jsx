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
    <div className="flex flex-col bg-black">
      <h1 className="text-center font-montserrat font-style: italic leading-tight text-4xl mt-20 mb-10 text-white">
        Find your perfect match with us!
      </h1>
      <div className="flex justify-center items-between">
        <div className="">
          <div style={{ padding: "10px" }}>
            <button
              className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
              onClick={navigateLogin}
            >
              Log in
            </button>
          </div>
          <div style={{ padding: "10px" }}>
            <button
              className="bg-gradient-to-l to-purple-400 from-purple-600 hover:bg-gradient-to-r text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
              onClick={navigateSignup}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="">
          <img
            className=""
            width="350"
            height="350"
            src="matcha-logo-dark.png"
            alt="matcha-logo"
            style={{ transform: "rotate(10deg)" }}
          ></img>
        </div>
      </div>
    </div>
  )
}

export default Landing
