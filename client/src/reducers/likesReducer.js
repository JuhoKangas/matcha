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
  },
})

export const { setLikes } = likesSlice.actions

export const initializeLikes = () => {
  return async (dispatch) => {
    const likes = await likesService.getAll()
    dispatch(setLikes(likes))
  }
}

export const addLikes = (loggedInUserId, userId) => {
  return async (dispatch) => {
    const likes = await likesService.getAll()
    const hasLiked = likes.filter(
      (like) => like.user1 === loggedInUserId && like.user2 === userId
    )
    if (hasLiked.length === 0) {
      const response = await likesService.createLike(loggedInUserId, userId)
      if (response.status === 201) {
        console.log('Likes from BACKEND', response)
        //dispatch(setLikes(...likes, response.data.results.rows))
      }
    } else toast.error('You have already liked this user')
  }
}

export default likesSlice.reducer
