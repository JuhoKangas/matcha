import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { finishSetup } from '../reducers/userReducer'
import tags from '../services/tags'
import Tag from '../components/Tag'
import toast from 'react-hot-toast'
import axios from 'axios'

const Setup = ({ user }) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    genderIdentity: 'other',
    genderInterest: 'everyone',
    bio: '',
    tags: [],
  })
  const [allTags, setAllTags] = useState([])
  const [file, setFile] = useState('')
  const [formImage, setFormImage] = useState('')
  const [dbPhotoFile, setDbPhotoFile] = useState('')

  useEffect(() => {
    tags.getAllTags().then((tags) => setAllTags(tags))
  }, [])

  const handlePhotoChange = (e) => {
    console.log(e.target.files[0].name)
    setFormImage(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
    setDbPhotoFile(e.target.files[0].name)
  }

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const addTag = (tagName) => {
    const newTags = [...formData.tags, tagName]
    console.log('Added tags ', newTags)
    setFormData({
      ...formData,
      tags: newTags,
    })
  }

  const removeTag = (tagName) => {
    const newTags = formData.tags.filter((tag) => tag !== tagName)
    console.log('Removed tags', newTags)
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

  const validateForm = (formData) => {
    const errors = {}

    if (!formData.genderIdentity) {
      errors.genderIdentity = 'Please add what you identify as'
    } else if (
      formData.genderIdentity !== 'male' &&
      formData.genderIdentity !== 'female' &&
      formData.genderIdentity !== 'other'
    ) {
      errors.genderIdentity =
        'We have no idea how you managed to change that but please select what you identify as from the given options'
    }

    if (!formData.genderInterest) {
      errors.genderInterest =
        'Please tell us what would you like to see in your feed'
    } else if (
      formData.genderInterest !== 'male' &&
      formData.genderInterest !== 'female' &&
      formData.genderInterest !== 'everyone'
    ) {
      errors.genderIdentity =
        "We're sorry we don't provide interest in that kind"
    }

    if (formData.bio === '') {
      errors.bio = 'Please tell us in your bio about yourself'
    } else if (formData.bio.length > 420) {
      errors.bio = 'Please tell about yourself in 420 characters or less'
    }

    if (formData.tags.length < 1) {
      errors.tags =
        'Please select at least one tag so we can better match you with likeminded people'
    } else if (formData.tags.length > 5) {
      errors.tags = 'Okay cowboy chill, select up to 5 tags'
    }

    if (!formData.profilePicture) {
      errors.photo = 'Please add a photo for your profile'
    }

    return errors
  }

  const setupProfile = async (e) => {
    e.preventDefault()

    const profileData = {
      genderIdentity: formData.genderIdentity,
      genderInterest: formData.genderInterest,
      bio: formData.bio,
      tags: formData.tags,
      profilePicture: dbPhotoFile,
      id: user.id,
    }

    const uploadPhotoData = new FormData()
    uploadPhotoData.append('profile', formImage)

    axios.post('http://localhost:3001/upload', uploadPhotoData)
  

    const errors = validateForm(profileData)

    if (errors !== {}) {
      for (const error in errors) {
        toast.error(errors[error])
        return
      }
    }

    dispatch(finishSetup(profileData))
  }

  return (
    <div className='flex flex-col'>
      <div>
        <h1 className='text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20 mb-10'>
          Finish up your profile
        </h1>
      </div>
      <div className='flex justify-center items-center'>
        <form
          onSubmit={setupProfile}
          className=' bg-almost-black shadow-sm rounded px-10 pt-10 pb-8'
        >
          <div className='flex flex-col md:flex-row md:space-x-20'>
            <div className='flex flex-col justify-center w-80'>
              <div className=''>
                <label
                  htmlFor='gender-identity'
                  className='block font-montserrat font-medium mb-4 text-almost-white'
                >
                  Gender
                  <div className='flex justify-start mb-10'>
                    <label htmlFor='male-gender-identity'>
                      <input
                        type='radio'
                        id='male-gender-identity'
                        name='genderIdentity'
                        value='male'
                        className='hidden peer'
                        checked={formData.genderIdentity === 'male'}
                        onChange={handleChange}
                      />
                      <div className='peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mt-2 text-almost-white border-solid border-2 border-almost-white rounded-md p-2'>
                        Male
                      </div>
                    </label>
                    <label htmlFor='female-gender-identity'>
                      <input
                        type='radio'
                        id='female-gender-identity'
                        name='genderIdentity'
                        value='female'
                        className='hidden peer'
                        checked={formData.genderIdentity === 'female'}
                        onChange={handleChange}
                      />
                      <div className='peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mt-2 text-almost-white mr-5 ml-5 border-solid border-2 border-almost-white rounded-md p-2'>
                        Female
                      </div>
                    </label>
                    <label htmlFor='other-gender-identity'>
                      <input
                        type='radio'
                        id='other-gender-identity'
                        name='genderIdentity'
                        value='other'
                        className='hidden peer'
                        checked={formData.genderIdentity === 'other'}
                        onChange={handleChange}
                      />
                      <div className='peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mt-2 text-almost-white border-solid border-2 border-almost-white rounded-md p-2'>
                        Other
                      </div>
                    </label>
                  </div>
                </label>
              </div>

              <div className=''>
                <label
                  htmlFor='gender-interest'
                  className='block font-montserrat font-medium mb-2 text-almost-white'
                >
                  Show Me
                </label>
                <div className='flex justify-start'>
                  <label htmlFor='male-gender-interest'>
                    <input
                      type='radio'
                      id='male-gender-interest'
                      name='genderInterest'
                      value='male'
                      className='hidden peer'
                      checked={formData.genderInterest === 'male'}
                      onChange={handleChange}
                    />
                    <div className='peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mb-12 text-almost-white border-solid border-2 border-almost-white rounded-md p-2'>
                      Men
                    </div>
                  </label>
                  <label htmlFor='female-gender-interest'>
                    <input
                      type='radio'
                      id='female-gender-interest'
                      name='genderInterest'
                      value='female'
                      className='hidden peer'
                      checked={formData.genderInterest === 'female'}
                      onChange={handleChange}
                    />
                    <div className='peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mb-12 mr-5 ml-5 text-almost-white border-solid border-2 border-almost-white rounded-md p-2'>
                      Women
                    </div>
                  </label>
                  <label htmlFor='everyone-gender-interest'>
                    <input
                      type='radio'
                      id='everyone-gender-interest'
                      name='genderInterest'
                      value='everyone'
                      className='hidden peer'
                      checked={formData.genderInterest === 'everyone'}
                      onChange={handleChange}
                    />
                    <div className='peer-checked:border-bang-bang peer-checked:bg-bang-bang peer-checked:text-almost-black font-montserrat mb-12 text-almost-white border-solid border-2 border-almost-white rounded-md p-2'>
                      Everyone
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center w-80'>
              <h2 className='text-center font-montserrat font-bold leading-tight text-almost-white text-xl mb-10'>
                ✨ Add Your Profile Image ✨
              </h2>
              <div className='flex flex-col items-center justify-center gap-12 md:mb-0 mb-10'>
                {file ? (
                  <img
                    className='object-cover rounded-full h-60 w-60'
                    src={file}
                    alt=''
                  />
                ) : (
                  ''
                )}
                <input type='file' onChange={handlePhotoChange} />
              </div>
            </div>
          </div>
          <div className='mb-10'>
            <label
              className='block font-montserrat font-medium mb-2 text-almost-white'
              htmlFor='tags'
            >
              Tags
            </label>
            <div className='flex flex-wrap gap-2 my-3 justify-center'>
              {allTags.map((tag) => (
                <Tag key={tag.id} tagName={tag.tagname} onClick={handleTag} />
              ))}
            </div>
          </div>
          <div>
            <label
              className='block font-montserrat font-medium mb-2 text-almost-white'
              htmlFor='bio'
            >
              Bio
            </label>
            <textarea
              type='text'
              id='bio'
              name='bio'
              className='mt-1
				mb-10
				font-montserrat
				block
				w-full
				rounded-md
				border-gray-300
				shadow-sm
				text-gray-700
				focus:border-chitty-chitty focus:ring focus:ring-chitty-chitty focus:ring-opacity-20
				resize-y'
              value={formData.bio}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className='flex items-center justify-center'>
            <input
              className='bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l py-3 px-5 mt-10 mb-10 rounded focus:outline-none focus:shadow-outline font-montserrat font-semibold text-2xl'
              type='submit'
              value='Setup My Profile'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Setup
