import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getIP } from '../utils/getIP'
import toast from 'react-hot-toast'
import { registerUser } from '../reducers/userReducer'
import emailService from '../services/email'
import userService from '../services/users'

const Register = () => {
  const dispatch = useDispatch()

  const [confirmPassword, setConfirmPassword] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    age: '',
    city: '',
    country: '',
    password: '',
    email: '',
  })
  const [registrationLinkSent, setRegistrationLinkSent] = useState(false)

  const validateForm = async (formData) => {
    const errors = {}

    if (!formData.firstName) {
      errors.firstName = 'Please add first name'
    } else if (formData.firstName.length > 1000) {
      errors.firstName =
        "Your first name can't realistically be over 1000 characters"
    }

    if (!formData.lastName) {
      errors.lastName = 'Please add last name'
    } else if (formData.lastName.length > 1000) {
      errors.lastName =
        "Your last name can't realistically be over 1000 characters"
    }

    if (!formData.userName) {
      errors.userName = 'Please add username'
    } else if (formData.userName.length > 60) {
      errors.userName =
        "Your username can't be over 60 characters. It's just arbitary limit that I came up with, in fact our database would handle usernames up to 1000 characters but it would probably break the styling of the page so we just gonna have it like this now."
    } else {
      const findUserByUsername = await userService.getUserByUsername(
        formData.userName
      )
      if (findUserByUsername.data.user.rowCount > 0) {
        errors.username = 'Username is already taken'
      }
    }

    if (!formData.age) {
      errors.age = 'Please add your age'
    } else if (formData.age > 122) {
      errors.age = "Unfortunately we don't accept dating at over 122"
    } else if (formData.age < 18) {
      errors.age = 'You have to be over 18 to use this application'
    } else if (isNaN(formData.age)) {
      errors.age = "That's not a number, this is a number: '23'"
    }

    if (!formData.city) {
      errors.city = 'Please add your city'
    }

    if (!formData.country) {
      errors.country = 'Please add your country'
    }

    if (!formData.password) {
      errors.password = 'Please add password'
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)
    ) {
      errors.password =
        'Password must be at least 8 characters and contain only letters and numbers'
    }

    if (!formData.email) {
      errors.email = 'Please add your email'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = 'Please add proper email'
    } else {
      const userExists = await emailService.getUserByEmail(formData.email)
      if (userExists.userFound) {
        errors.email = 'Email already in use'
      }
    }

    return errors
  }

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
    if (formData.password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    const errors = await validateForm(formData)

    if (errors !== {}) {
      for (const error in errors) {
        toast.error(errors[error])
        return
      }
    }

    const newUser = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      username: formData.userName,
      age: formData.age,
      city: formData.city,
      country: formData.country,
      password: formData.password,
      email: formData.email,
      ip: await getIP(),
    }

    dispatch(registerUser(newUser))

    setRegistrationLinkSent(true)
  }

  if (registrationLinkSent) {
    return (
      <div className='flex flex-col gap-5 justify-center items-center h-screen'>
        <p className='text-xl text-gray-500'>{'<img />'}</p>
        <h1 className='text-3xl text-white'>The link has been sent</h1>
        <p className='text-l text-gray-500'>
          Please follow the instructions on the email to finish setting up your
          profile
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <div>
        <h1 className='text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20 mb-10'>
          Create an account
        </h1>
      </div>
      <div className='flex justify-center items-center'>
        <form
          onSubmit={handleRegister}
          className=' bg-almost-black shadow-sm rounded px-10 pt-10 pb-8'
        >
          <div className='flex flex-col md:flex-row md:space-x-20'>
            <div className='w-80'>
              <div className='mb-4'>
                <label
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                  htmlFor='userName'
                >
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  name='userName'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-4'>
                <label
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-4'>
                <label
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                  htmlFor='password'
                >
                  Repeat Password
                </label>
                <input
                  type='password'
                  id='password-check'
                  name='password-check'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className='mb-4'>
                <label
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                  htmlFor='firstName'
                >
                  First Name
                </label>
                <input
                  type='text'
                  id='first-name'
                  name='firstName'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-4'>
                <label
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                  htmlFor='lastName'
                >
                  Last Name
                </label>
                <input
                  type='text'
                  id='last-name'
                  name='lastName'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='w-80'>
              <div>
                <div className='mb-4'>
                  <label
                    className='block font-montserrat font-medium mb-2 text-almost-white'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='mt-1
										mb-10
										font-montserrat
										block
										w-full
										rounded-md
										border-gray-300
										shadow-sm
										text-gray-700
										focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='age'
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                >
                  Age
                </label>
                <input
                  type='text'
                  id='age'
                  name='age'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-4'>
                <label
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                  htmlFor='city'
                >
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-4'>
                <label
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                  htmlFor='country'
                >
                  Country
                </label>
                <input
                  type='text'
                  name='country'
                  className='mt-1
									mb-10
									font-montserrat
									block
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20'
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <input
              className='bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l py-3 px-5 mt-10 mb-10 rounded focus:outline-none focus:shadow-outline font-montserrat font-semibold text-2xl'
              type='submit'
              value='Register'
            />
          </div>

          <hr />
        </form>
      </div>
      <div className='flex items-center justify-center mb-5'>
        <a
          className='inline-block align-baseline font-bold text-sm text-chitty-chitty hover:text-blue-800'
          href='/login'
        >
          Already have an account? Log in!
        </a>
      </div>
    </div>
  )
}

export default Register
