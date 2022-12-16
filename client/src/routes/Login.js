import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'

const Login = ({ setToken }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const login = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
      const response = await axios.post('http://localhost:3005/login', {
        email,
        password,
      })
      event.target.email.value = ''
      event.target.password.value = ''

      if (response.status === 201) {
        dispatch(initializeUser(response.data.user.id))
        console.log(`login submit user id: ${user.id}`)
        navigate('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="gradient-custom">
      <h1 className="text-light landing-heading">Log in to your account</h1>
      <section className="vh-100">
        <div className="container py-6 h-50">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>
                  <form onSubmit={login}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="col btn btn-purple-moon btn-lg"
                        type="submit"
                        value="Login"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
