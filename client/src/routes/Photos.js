import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { uploadPhoto, deletePhoto } from '../reducers/userReducer'

const Photos = ({ user }) => {
  const dispatch = useDispatch()
  const [file, setFile] = useState('')
  const [dbPhotoFile, setDbPhotoFile] = useState('')
  const [photoToDelete, setPhotoToDelete] = useState('')

  const handleChange = (e) => {
    console.log(e.target.files)
    setFile(URL.createObjectURL(e.target.files[0]))
    setDbPhotoFile(e.target.files[0].name)
  }

  const choosePicToDelete = (photo) => {
    console.log(photo)
    setPhotoToDelete(photo)
  }

  const deletePicture = (e) => {
    e.preventDefault()
    console.log('This photo will be deleted', photoToDelete)

    if (photoToDelete === '') toast.error('Please select a photo to delete.')
    else {
      const deleteChosenPic = {
        userId: user.id,
        photoName: photoToDelete,
      }
      dispatch(deletePhoto(deleteChosenPic))
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (dbPhotoFile === '') {
      toast.error('Please select a photo.')
    } else {
      const userPhoto = {
        userId: user.id,
        photo: dbPhotoFile,
      }

      if (user.photos.length < 4) {
        dispatch(uploadPhoto(userPhoto))
        setFile('')
      } else toast.error('You have already uploaded four photos.')
    }
  }

  return (
    <div>
      <h2 className='text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20'>
        ✨ Add A New Image ✨
      </h2>
      <h2 className='text-center font-montserrat italic leading-tight text-almost-white text-xl mt-10 mb-10'>
        You can add up to 4 images
      </h2>
      <form onSubmit={handleUpload}>
        <div className='flex flex-col items-center justify-center gap-12 md:mb-0 mb-10'>
          {file ? (
            <img
              src={file}
              alt=''
              className='object-cover h-96 w-96 border border-almost-white'
            />
          ) : (
            ''
          )}

          <input type='file' onChange={handleChange} />
          <div className='flex items-center justify-center'>
            <input
              className='bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l py-3 px-5 mt-10 mb-28 rounded focus:outline-none focus:shadow-outline font-montserrat font-semibold text-2xl'
              type='submit'
              value='Upload'
            />
          </div>
        </div>
      </form>
      <h2 className='text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20'>
        ✨ Your Images ✨
      </h2>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center h-96 p-2 mt-10 gap-10 mb-10'>
          {user.photos.map((photo) => (
            <img
              src={require(`../assets/img/${photo.photo}`)}
              alt=''
              className='object-cover h-96 w-96 border border-almost-white hover:cursor-pointer rounded-lg hover:border-bang-bang hover:border-4'
              onClick={() => choosePicToDelete(photo.photo)}
            />
          ))}
        </div>
        <button
          className='flex items-center justify-center bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l py-3 px-5 mt-5 mb-10 rounded focus:outline-none focus:shadow-outline font-montserrat text-lg'
          onClick={deletePicture}
        >
          Delete chosen photo
        </button>
      </div>
    </div>
  )
}

export default Photos
