import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
		setSingleUser(state, action) {
      return action.payload
    },
  },
})

export const { setUsers, setSingleUser } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

/* export const otherUserProfile = (userId) => {
	return async (dispatch) => {
    const user = await userService.getOne(userId)
    dispatch(setSingleUser(user))
  }
} */

export default usersSlice.reducer
