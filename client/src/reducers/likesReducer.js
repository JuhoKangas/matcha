import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import likesService from '../services/likes'
import { matchUsers } from './matchesReducer'
import { initializeUnlikes } from './unlikesReducer'
import { initializeUsers } from './usersReducer'

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

export const likeUser = (loggedInUser, userToLike, socket) => {
  return async (dispatch) => {
    const response = await likesService.createLike(
      loggedInUser.id,
      userToLike.id
    )
    if (response.status === 201) {
      dispatch(initializeLikes())
      dispatch(initializeUsers(loggedInUser))
      toast.success('Liked!')
      if (response.data.msg === 'Match') {
        dispatch(matchUsers(loggedInUser, userToLike))
        socket.emit('notification', {
          user1: loggedInUser.id,
          user2: userToLike.id,
          content: `${loggedInUser.username} matched with you.`,
          type: 1,
        })
      }
    } else {
      dispatch(initializeUnlikes())
    }
  }
}

export default likesSlice.reducer
