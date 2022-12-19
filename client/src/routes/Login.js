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
    <div className="flex flex-col">
      <div>
        <h1 className="text-center font-montserrat font-bold leading-tight text-4xl mt-20 mb-10">
          Log in to your account
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <form
          onSubmit={login}
          className="bg-white shadow-sm rounded px-10 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block font-montserrat mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="mt-1
					font-montserrat
					block
					w-full
					rounded-md
					border-gray-300
					shadow-sm
					text-gray-700
					focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-20"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-montserrat" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******************"
              className="mt-1
					font-montserrat
					block
					w-full
					rounded-md
					border-gray-300
					shadow-sm
					text-gray-700
					focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-20"
              required
            />
          </div>

          <div className="flex items-center justify-center mb-5">
            <input
              className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
              type="submit"
              value="Login"
            />
          </div>
          <hr />
          <div className="flex items-center justify-center mt-5 mb-5">
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot password?
            </a>
          </div>
          <hr />
          <div className="flex items-center justify-center mt-5">
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Already have an account? Sign in!
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
