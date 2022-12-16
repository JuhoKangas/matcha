import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { initializeUser } from "../reducers/userReducer"

const Login = ({ setToken }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  const login = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      })
      event.target.email.value = ""
      event.target.password.value = ""

      if (response.status === 201) {
        dispatch(initializeUser(response.data.user.id))
        console.log(`login submit user id: ${user.id}`)
        navigate("/home")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="">
      <h1 className="">Log in to your account</h1>

      <h3 className="">Login Form</h3>
      <form onSubmit={login}>
        <div className="">
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1
			block
			w-full
			rounded-md
			border-gray-300
			shadow-sm
			focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          <label className="" htmlFor="email">
            Email
          </label>
        </div>

        <div className="">
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1
			block
			w-full
			rounded-md
			border-gray-300
			shadow-sm
			focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          <label className="" htmlFor="password">
            Password
          </label>
        </div>

        <div className="">
          <input className="btn-purple-moon " type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
}

export default Login
