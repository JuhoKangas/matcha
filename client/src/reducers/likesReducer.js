import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import likesService from '../services/likes'

const likesSlice = createSlice({
  name: 'likes',
  initialState: [],
  reducers: {
    setLikes(state, action) {
      return action.payload
    },
    addLike(state, action) {
      const newLikes = [...state, action.payload]
      return newLikes
    },
  },
})

export const { setLikes, addLike } = likesSlice.actions

export const initializeLikes = () => {
  return async (dispatch) => {
    const likes = await likesService.getAll()
    dispatch(setLikes(likes))
  }
}

export const likeUser = (loggedInUserId, userId) => {
  return async (dispatch) => {
    const response = await likesService.createLike(loggedInUserId, userId)
    if (response.status === 201) {
      dispatch(addLike(response.data.results.rows[0]))
    } else toast.error('Sorry, could not like this user')
  }
}

export default likesSlice.reducer
