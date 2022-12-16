import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
// import { useSelector } from 'react-redux'

const Landing = () => {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate('/login')
  }

  const navigateSignup = () => {
    navigate('/register')
  }

  return (
    <div
      className="page-holder align-items-center py-4 bg-gray-100 vh-100 landing-bg"
      style={{ background: 'black' }}
    >
      <div className="container">
        <h1 className="text-light landing-heading">
          Find your perfect match with us!
        </h1>
        <div className="row align-items-center">
          <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary">
            <div style={{ padding: '10px' }}>
              <button
                className="col btn btn-purple-moon btn-lg"
                onClick={navigateLogin}
              >
                Log in
              </button>
            </div>
            <div style={{ padding: '10px' }}>
              <button
                className="col btn btn-pink-moon btn-lg"
                onClick={navigateSignup}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary">
            <img
              className="img-landing img-fluid mb-4"
              width="350"
              height="350"
              src="matcha-logo-dark.png"
              alt="matcha-logo"
              style={{ transform: 'rotate(10deg)' }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
