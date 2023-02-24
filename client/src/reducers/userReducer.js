import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import toast from 'react-hot-toast'
import { setSelectedChat } from '../reducers/chatReducer'
import { setLikes } from './likesReducer'
import { setUnlikes } from './unlikesReducer'
import { setMatches } from './matchesReducer'
import { setMessages } from './messageReducer'

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
  return async (dispatch) => {
    const response = await userService.checkUser(email, password, coordinates)
    if (response.status === 200) {
      toast.success('You are successfully logged in!')
      dispatch(setUser(response.data))
    } else console.log('loginUser failed, status: ', response.status)
  }
}

export const logoutUser = (userId) => {
  return async (dispatch) => {
    const response = await userService.logout(userId)
    if (response.status === 200) {
      toast.success('You have successfully logged out!')
      dispatch(setSelectedChat(null))
      dispatch(setUser(response.data))
      dispatch(setLikes([]))
      dispatch(setUnlikes([]))
      dispatch(setMatches([]))
      dispatch(setMessages([]))
    } else console.log('logoutUser failed, status: ', response.status)
  }
}

export const updateSettings = (updatedUserInfo) => {
  return async (dispatch) => {
    const response = await userService.update(updatedUserInfo)
    if (response.status === 200) {
      toast.success('You have successfully updated your information!')
      dispatch(setUser(response.data.data.user))
    } else {
      toast.error('Error occured, information was not updated.')
    }
  }
}

export const uploadPhoto = (userPhoto) => {
  return async (dispatch) => {
    const response = await userService.upload(userPhoto)
    if (response.status === 200) {
      toast.success('You have successfully uploaded a photo!')
      dispatch(setPhotos(response.data.photos))
    } else {
      toast.error('Error occured, your photo was not uploaded.')
    }
  }
}

export const deletePhoto = (deleteUserPhoto) => {
  return async (dispatch) => {
    const response = await userService.deletePhoto(deleteUserPhoto)
    if (response.status === 200) {
      toast.success('You have successfully deleted your photo!')
      dispatch(setPhotos(response.data.photos))
    } else {
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
      toast.error('Error occured, registration failed.')
    }
  }
}

export const finishSetup = (profileData) => {
  return async (dispatch) => {
    const response = await userService.setup(profileData)
    if (response.status === 201) {
      toast.success('You have successfully set up your profile!')
      dispatch(setUser(response.data.data.user))
    } else {
      toast.error('Error occured, setup failed.')
    }
  }
}

export default userSlice.reducer
