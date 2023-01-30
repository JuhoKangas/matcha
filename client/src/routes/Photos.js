import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadPhoto } from '../reducers/userReducer'

const Photos = ({ user }) => {
  const dispatch = useDispatch()
  const [file, setFile] = useState('')
  const [dbPhotoFile, setDbPhotoFile] = useState('')

  const handleChange = (e) => {
    console.log(e.target.files)
    setFile(URL.createObjectURL(e.target.files[0]))
    setDbPhotoFile(e.target.files[0].name)
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    const userPhoto = {
      userId: user.id,
      photo: dbPhotoFile,
    }

    dispatch(uploadPhoto(userPhoto))
  }

  return (
    <div>
      <h2 className='text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20'>
        ✨ Add Your Image ✨
      </h2>
      <h2 className='text-center font-montserrat italic leading-tight text-almost-white text-xl mt-10 mb-10'>
        You can add up to 4 images
      </h2>
      <form onSubmit={handleUpload}>
        <div className='flex flex-col items-center justify-center gap-12 md:mb-0 mb-10'>
          <img
            src={file}
            alt=''
            className='object-cover h-96 w-96 border border-almost-white'
          />
          <input type='file' onChange={handleChange} />
          <div className='flex items-center justify-center'>
            <input
              className='bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l py-3 px-5 mt-10 mb-10 rounded focus:outline-none focus:shadow-outline font-montserrat font-semibold text-2xl'
              type='submit'
              value='Upload'
            />
          </div>
        </div>
      </form>
      <div className='flex items-center justify-center bg-almost-white h-96 p-2 mt-10'>
        <img
          src={require(`../assets/img/beanie.jpg`)}
          alt=''
          className='object-cover h-96 w-96 border border-almost-white'
        />
      </div>
    </div>
  )
}

export default Photos
