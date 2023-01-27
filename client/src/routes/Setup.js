import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { finishSetup } from '../reducers/userReducer'
import tags from '../services/tags'
import Tag from '../components/Tag'

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
  const [dbPhotoFile, setDbPhotoFile] = useState('')

  useEffect(() => {
    tags.getAllTags().then((tags) => setAllTags(tags))
  }, [])

  console.log(user)
  const handlePhotoChange = (e) => {
    console.log(e.target.files[0].name)
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

  const setupProfile = async (e) => {
    e.preventDefault()

    const profileData = {
      genderIdentity: formData.genderIdentity,
      genderInterest: formData.genderInterest,
      bio: formData.bio,
      tags: formData.tags,
      profileImage: dbPhotoFile,
      id: user.id,
    }
    console.log('This is profile data ', profileData)

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
                  <p></p>
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
