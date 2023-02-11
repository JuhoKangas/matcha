import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import toast from 'react-hot-toast'
import { setSelectedChat } from '../reducers/chatReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return (state = action.payload)
    },
    setPhotos(state, action) {
      const userPhotos = { ...state, photos: action.payload }
      return userPhotos
    },
  },
})

export const { setUser, setPhotos } = userSlice.actions

export const initializeUser = (userId) => {
  return async (dispatch) => {
    const user = await userService.getUser(userId)
    dispatch(setUser(user))
  }
}

export const loginUser = (email, password, coordinates) => {
  console.log('in reducer.')
  return async (dispatch) => {
    console.log('in reducer async.')
    const response = await userService.checkUser(email, password, coordinates)
    console.log('in reducer response', response)
    console.log('in reducer response status', response.status)
    if (response.status === 200) {
      toast.success('You are successfully logged in!')
      dispatch(setUser(response.data))
      console.log('in reducer res data ', response.data)
    } else console.log('loginUser failed, status: ', response.status)
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    const response = await userService.logout()
    if (response.status === 200) {
      console.log('response data after logout: ', response.data)
      toast.success('You have successfully logged out!')
			dispatch(setSelectedChat(null))
      dispatch(setUser(response.data))
    } else console.log('logoutUser failed, status: ', response.status)
  }
}

export const updateSettings = (updatedUserInfo) => {
  return async (dispatch) => {
    const response = await userService.update(updatedUserInfo)
    if (response.status === 200) {
      toast.success('You have successfully updated your information!')
      dispatch(setUser(response.data.data.user))
      console.log('THis is response data ', response.data.data.user)
    } else {
      console.log('update failed, status: ', response.status)
      toast.error('Error occured, information was not updated.')
    }
  }
}

export const uploadPhoto = (userPhoto) => {
  return async (dispatch) => {
    const response = await userService.upload(userPhoto)
    console.log('This is response from useReducer', response)
    if (response.status === 200) {
      toast.success('You have successfully uploaded a photo!')
      dispatch(setPhotos(response.data.photos))
      console.log(response.data.photos)
    } else {
      console.log('upload failed, status: ', response.status)
      toast.error('Error occured, your photo was not uploaded.')
    }
  }
}

export const deletePhoto = (deleteUserPhoto) => {
  return async (dispatch) => {
    const response = await userService.deletePhoto(deleteUserPhoto)
    if (response.status === 200) {
      console.log('This is response from deletePhoto in useReducer', response)
      toast.success('You have successfully deleted your photo!')
      dispatch(setPhotos(response.data.photos))
    } else {
      console.log('delete photo failed, status: ', response.status)
      toast.error('Error occured, your photo was not deleted.')
    }
  }
}

export const registerUser = (newUser) => {
  return async (dispatch) => {
    const response = await userService.create(newUser)
    if (response.status === 201) {
      toast.success('You have successfully created your account!')
      dispatch(setUser(response.data))
    } else {
      console.log('registration failed, status: ', response.status)
      toast.error('Error occured, registration failed.')
    }
  }
}

export const finishSetup = (profileData) => {
  return async (dispatch) => {
    const response = await userService.setup(profileData)
    if (response.status === 201) {
      toast.success('You have successfully set up your profile!')
    } else {
      console.log('setup failed, status: ', response.status)
      toast.error('Error occured, setup failed.')
    }
  }
}

export default userSlice.reducer
