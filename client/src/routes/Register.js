import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getIP } from "../utils/getIP"
import toast from "react-hot-toast"

const Register = () => {
  const navigate = useNavigate()

  const [confirmPassword, setConfirmPassword] = useState()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    age: "",
    genderIdentity: "other",
    genderInterest: "everyone",
    city: "",
    country: "",
    password: "",
    email: "",
    bio: "",
  })

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      if (formData.password !== confirmPassword) {
        toast.error("Passwords do not match!")
        return
      }

      const response = await axios.post("http://localhost:3001/users", {
        firstname: formData.firstName,
        lastname: formData.lastName,
        username: formData.userName,
        age: formData.age,
        genderIdentity: formData.genderIdentity,
        genderInterest: formData.genderInterest,
        city: formData.city,
        country: formData.country,
        password: formData.password,
        email: formData.email,
        ip: await getIP(),
      })

      if (response.status === 201) {
        navigate("/home")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20 mb-10">
          Create an account
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className=" bg-almost-black shadow-sm rounded px-10 pt-10 pb-8"
        >
          <div className="flex flex-col md:flex-row md:space-x-20">
            <div className="w-80">
              <div className="mb-4">
                <label
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="userName"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="userName"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <div className="mb-4">
                  <label
                    className="block font-montserrat font-medium mb-2 text-almost-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1
										mb-10
										font-montserrat
										block
										w-full
										rounded-md
										border-gray-300
										shadow-sm
										text-gray-700
										focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="passowrd"
                  name="password"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="password"
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="password-check"
                  name="password-check"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="w-80">
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                >
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="">
                <label
                  htmlFor="gender-identity"
                  className="block font-montserrat font-medium mb-4 text-almost-white"
                >
                  Gender
                  <div className="flex justify-start mb-10">
                    <label htmlFor="male-gender-identity">
                      <input
                        type="radio"
                        id="male-gender-identity"
                        name="genderIdentity"
                        value="male"
                        className="hidden peer"
                        checked={formData.genderIdentity === "male"}
                        onChange={handleChange}
                      />
                      <div className="peer-checked:border-bang-bang font-montserrat mt-2 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
                        Male
                      </div>
                    </label>
                    <label htmlFor="female-gender-identity">
                      <input
                        type="radio"
                        id="female-gender-identity"
                        name="genderIdentity"
                        value="female"
                        className="hidden peer"
                        checked={formData.genderIdentity === "female"}
                        onChange={handleChange}
                      />
                      <div className="peer-checked:border-bang-bang font-montserrat mt-2 text-almost-white mr-5 ml-5 border-solid border-2 border-almost-white rounded-md p-2">
                        Female
                      </div>
                    </label>
                    <label htmlFor="other-gender-identity">
                      <input
                        type="radio"
                        id="other-gender-identity"
                        name="genderIdentity"
                        value="other"
                        className="hidden peer"
                        checked={formData.genderIdentity === "other"}
                        onChange={handleChange}
                      />
                      <div className="peer-checked:border-bang-bang font-montserrat mt-2 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
                        Other
                      </div>
                    </label>
                  </div>
                </label>
              </div>

              <div className="mb-4">
                <label
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className="mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="">
                <label
                  htmlFor="gender-interest"
                  className="block font-montserrat font-medium mb-2 text-almost-white"
                >
                  Show Me
                </label>
                <div className="flex justify-start mb-10">
                  <label htmlFor="male-gender-interest">
                    <input
                      type="radio"
                      id="male-gender-interest"
                      name="genderInterest"
                      value="male"
                      className="hidden peer"
                      checked={formData.genderInterest === "male"}
                      onChange={handleChange}
                    />
                    <div className="peer-checked:border-bang-bang font-montserrat mb-12 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
                      Men
                    </div>
                  </label>
                  <label htmlFor="female-gender-interest">
                    <input
                      type="radio"
                      id="female-gender-interest"
                      name="genderInterest"
                      value="female"
                      className="hidden peer"
                      checked={formData.genderInterest === "female"}
                      onChange={handleChange}
                    />
                    <div className="peer-checked:border-bang-bang font-montserrat mb-12 mr-5 ml-5 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
                      Women
                    </div>
                  </label>
                  <label htmlFor="everyone-gender-interest">
                    <input
                      type="radio"
                      id="everyone-gender-interest"
                      name="genderInterest"
                      value="everyone"
                      className="hidden peer"
                      checked={formData.genderInterest === "everyone"}
                      onChange={handleChange}
                    />
                    <div className="peer-checked:border-bang-bang font-montserrat mb-12 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
                      Everyone
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label
              className="block font-montserrat font-medium mb-2 text-almost-white"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea 
              type="text"
              id="bio"
              name="bio"
              className="mt-1
				mb-10
				font-montserrat
				block
				w-full
				rounded-md
				border-gray-300
				shadow-sm
				text-gray-700
				focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20
				resize-y"
              value={formData.bio}
              onChange={handleChange}
              required>
			  </textarea>
          </div>
          <div className="flex items-center justify-center">
            <input
              className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l py-3 px-5 mt-10 mb-10 rounded focus:outline-none focus:shadow-outline font-montserrat font-semibold text-2xl"
              type="submit"
              value="Register"
            />
          </div>

          <hr />
        </form>
      </div>
      <div className="flex items-center justify-center mb-5">
        <a
          className="inline-block align-baseline font-bold text-sm text-chitty-chitty hover:text-blue-800"
          href="/login"
        >
          Already have an account? Log in!
        </a>
      </div>
    </div>
  )
}

export default Register
