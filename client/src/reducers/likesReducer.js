import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import likesService from '../services/likes'
import { matchUsers } from './matchesReducer'

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

export const likeUser = (loggedInUser, userToLike) => {
  return async (dispatch) => {
    const response = await likesService.createLike(
      loggedInUser.id,
      userToLike.id
    )
    if (response.status === 201) {
      dispatch(initializeLikes())
      toast.success('Liked!')
      if (response.data.msg === 'Match') {
        dispatch(matchUsers(loggedInUser, userToLike))
      }
    } else toast.error('Sorry, could not like this user')
  }
}

export default likesSlice.reducer
