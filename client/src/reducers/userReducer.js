import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return (state = action.payload)
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = (userId) => {
  return async (dispatch) => {
    const user = await userService.getUser(userId)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
