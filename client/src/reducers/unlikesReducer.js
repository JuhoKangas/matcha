import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import likesService from '../services/likes'
import { initializeLikes } from './likesReducer'
import { unmatchUsers } from './matchesReducer'
import { initializeUsers } from './usersReducer'

const unlikesSlice = createSlice({
  name: 'unlikes',
  initialState: [],
  reducers: {
    setUnlikes(state, action) {
      return action.payload
    },
  },
})

export const { setUnlikes } = unlikesSlice.actions

export const initializeUnlikes = () => {
  return async (dispatch) => {
    const unlikes = await likesService.getAllUnlikes()
    dispatch(setUnlikes(unlikes))
  }
}

export const unlikeUser = (loggedInUser, userToUnlike) => {
  return async (dispatch) => {
    const response = await likesService.createUnlike(
      loggedInUser.id,
      userToUnlike.id
    )
    if (response.status === 201) {
      dispatch(initializeLikes())
      dispatch(initializeUsers(loggedInUser))
      toast.success('Sent a friendly no-no')
      if (response.data.msg === 'Unmatch') {
        dispatch(unmatchUsers(loggedInUser, userToUnlike))
      }
    }
    dispatch(initializeUnlikes())
  }
}

export default unlikesSlice.reducer
