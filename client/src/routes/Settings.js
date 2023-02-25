import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { updateSettings } from '../reducers/userReducer'
import { setSelectedChat } from '../reducers/chatReducer'
import userService from '../services/users'
import Tag from '../components/Tag'
import tags from '../services/tags'

const Settings = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialFirstname = useField('text', user.firstname)
  const initialLastname = useField('text', user.lastname)
  const initialUsername = useField('text', user.username)
  const initialEmail = useField('email', user.email)
  const initialPassword = useField('password')
  const initialAge = useField('number', user.age)
  const initialCity = useField('text', user.city)
  const initialCountry = useField('text', user.country)
  const initialBio = useField('text', user.bio)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [file, setFile] = useState('')
  const [dbPhotoFile, setDbPhotoFile] = useState(user.profilePicture)
  const [formImage, setFormImage] = useState('')
  const [pictureChanged, setPictureChanged] = useState(false)
  const [formData, setFormData] = useState({
    genderIdentity: user.genderIdentity,
    genderInterest: user.genderInterest,
    tags: [],
  })
  const [newTags, setNewTags] = useState([])

  useEffect(() => {
    dispatch(setSelectedChat(null))
    tags.getAllTags().then((tags) => setNewTags(tags))
  }, [dispatch])

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handlePhotoChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
    setDbPhotoFile(e.target.files[0].name)
    setFormImage(e.target.files[0])
    setPictureChanged(true)
  }

  const addTag = (tagName) => {
    const newTags = [...formData.tags, tagName]
    setFormData({
      ...formData,
      tags: newTags,
    })
  }

  const removeTag = (tagName) => {
    const newTags = formData.tags.filter((tag) => tag !== tagName)
    setFormData({
      ...formData,
      tags: newTags,
    })
  }

  const handleTag = (e) => {
    e.preventDefault()
    const tagName = e.target.innerText

    if (
      e.target.className ===
      'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
    ) {
      e.target.className =
        'px-2 text-white ring-1 ring-chitty-chitty rounded-xl bg-chitty-chitty w-min whitespace-nowrap text-sm cursor-pointer hover:text-chitty-chitty bg-none'
      addTag(tagName)
    } else {
      e.target.className =
        'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
      removeTag(tagName)
    }
  }

  const validateForm = async (formData) => {
    const errors = {}

    if (!formData.firstname) {
      errors.firstname = 'Please add first name'
    } else if (formData.firstname.length > 1000) {
      errors.firstname =
        "Your first name can't realistically be over 1000 characters"
    }

    if (!formData.lastname) {
      errors.lastname = 'Please add last name'
    } else if (formData.lastname.length > 1000) {
      errors.lastname =
        "Your last name can't realistically be over 1000 characters"
    }

    if (!formData.username) {
      errors.username = 'Please add username'
    } else if (formData.username.length > 60) {
      errors.username =
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

    if (formData.password) {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
        errors.password =
          'Password must be at least 8 characters and contain only letters and numbers'
      }
    }

    if (!formData.email) {
      errors.email = 'Please add your email'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = 'Please add proper email'
    }

    if (formData.tags.length < 1) {
      errors.tags =
        'Please select at least one tag so we can better match you with likeminded people'
    } else if (formData.tags.length > 5) {
      errors.tags = 'Okay cowboy chill, select up to 5 tags'
    }

    return errors
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedUserInfo = {
      id: user.id,
      firstname: initialFirstname.value,
      lastname: initialLastname.value,
      username: initialUsername.value,
      email: initialEmail.value,
      password: initialPassword.value,
      age: initialAge.value,
      genderIdentity: formData.genderIdentity,
      genderInterest: formData.genderInterest,
      city: initialCity.value,
      country: initialCountry.value,
      bio: initialBio.value,
      profilePicture: dbPhotoFile,
      tags: formData.tags,
    }

    if (updatedUserInfo.password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    const errors = await validateForm(updatedUserInfo)

    if (errors !== {}) {
      for (const error in errors) {
        toast.error(errors[error])
        return
      }
    }

    if (pictureChanged) {
      const uploadPhotoData = new FormData()
      uploadPhotoData.append('profile', formImage)

      const response = await userService.uploadPhoto(uploadPhotoData)
      dispatch(
        updateSettings({
          ...updatedUserInfo,
          profilePicture: response.data.filename,
        })
      )
    } else {
      dispatch(updateSettings(updatedUserInfo))
    }

    navigate('/profile')
  }

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20 mb-10">
          Update my information
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleUpdate}
          className="bg-almost-black shadow-sm rounded px-10 pt-10 pb-8"
        >
          <div className="flex flex-row justify-center space-x-20">
            <div className=" mb-15">
              <div className="mb-4">
                <label
                  className=" font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="userName"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  className="mt-1
									mb-10
									font-montserrat
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  {...initialUsername}
                  required
                />
              </div>

              <div>
                <div className="mb-4">
                  <label
                    className=" font-montserrat font-medium mb-2 text-almost-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="mt-1
										mb-10
										font-montserrat
										
										w-full
										rounded-md
										border-gray-300
										shadow-sm
										text-gray-700
										focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                    {...initialEmail}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className=" font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  className="mt-1
									mb-10
									font-montserrat
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  {...initialPassword}
                />
              </div>

              <div className="mb-4">
                <label
                  className=" font-montserrat font-medium mb-2 text-almost-white"
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
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  className=" font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstname"
                  className="mt-1
									mb-10
									font-montserrat
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  {...initialFirstname}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className=" font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastname"
                  className="mt-1
									mb-10
									font-montserrat
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  {...initialLastname}
                  required
                />
              </div>
            </div>

            <div className=" mb-20">
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className=" font-montserrat font-medium mb-2 text-almost-white"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  className="mt-1
									mb-10
									font-montserrat
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  {...initialAge}
                  required
                />
              </div>

              <div className="">
                <label
                  htmlFor="gender-identity"
                  className=" font-montserrat font-medium mb-4 text-almost-white"
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
                        checked={formData.genderIdentity === 'male'}
                        onChange={handleChange}
                      />
                      <div className="peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mt-2 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
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
                        checked={formData.genderIdentity === 'female'}
                        onChange={handleChange}
                      />
                      <div className="peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mt-2 text-almost-white mr-5 ml-5 border-solid border-2 border-almost-white rounded-md p-2">
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
                        checked={formData.genderIdentity === 'other'}
                        onChange={handleChange}
                      />
                      <div className="peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mt-2 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
                        Other
                      </div>
                    </label>
                  </div>
                </label>
              </div>

              <div className="mb-4">
                <label
                  className=" font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  name="city"
                  className="mt-1
									mb-10
									font-montserrat
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  {...initialCity}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className=" font-montserrat font-medium mb-2 text-almost-white"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  name="country"
                  className="mt-1
									mb-10
									font-montserrat
									
									w-full
									rounded-md
									border-gray-300
									shadow-sm
									text-gray-700
									focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20"
                  {...initialCountry}
                  required
                />
              </div>

              <div className="">
                <label
                  htmlFor="gender-interest"
                  className=" font-montserrat font-medium mb-2 text-almost-white"
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
                      checked={formData.genderInterest === 'male'}
                      onChange={handleChange}
                    />
                    <div className="peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mb-12 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
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
                      checked={formData.genderInterest === 'female'}
                      onChange={handleChange}
                    />
                    <div className="peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mb-12 mr-5 ml-5 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
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
                      checked={formData.genderInterest === 'everyone'}
                      onChange={handleChange}
                    />
                    <div className="peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mb-12 text-almost-white border-solid border-2 border-almost-white rounded-md p-2">
                      Everyone
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center ml-96 mr-96">
            <label
              className="font-montserrat font-medium mb-2 text-almost-white"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="mt-1
								mb-10
								font-montserrat
								w-full
								rounded-md
								border-gray-300
								shadow-sm
								text-gray-700
								focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20
								resize-y"
              {...initialBio}
              required
            ></textarea>
          </div>
          <div className="flex flex-col justify-center ml-96 mr-96">
            <label className="flex flex-col font-montserrat font-medium text-almost-white mb-3">
              Interests
            </label>
            <div className="flex flex-wrap justify-center font-montserrat font-medium mb-2 text-almost-white text-lg">
              {newTags.map((tag) => (
                <Tag key={tag.id} tagName={tag.tagname} onClick={handleTag} />
              ))}
            </div>
          </div>
          <div className="flex justify-start ml-96 mt-10">
            <label
              className="flex justify-center font-montserrat font-medium text-almost-white"
              htmlFor="lastname"
            >
              Profile Picture
            </label>
            <div className="flex flex-col items-center justify-center gap-12 md:mb-0 mb-10 mt-10">
              {file ? (
                <img
                  className="object-cover rounded-full h-60 w-60"
                  src={file}
                  alt=""
                />
              ) : (
                <img
                  className="object-cover rounded-full h-60 w-60"
                  src={`http://localhost:3001/uploads/${user.profilePicture}`}
                  alt=""
                />
              )}
              <input type="file" onChange={handlePhotoChange} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <input
              className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l py-3 px-5 mt-10 mb-10 rounded focus:outline-none focus:shadow-outline font-montserrat font-semibold text-2xl"
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings
