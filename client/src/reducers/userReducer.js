import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userSlice = createSlice({
  name: "user",
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

export const loginUser = (email, password, coordinates) => {
  console.log("in reducer.")
  return async (dispatch) => {
    console.log("in reducer async.")
    const response = await userService.checkUser(email, password, coordinates)
    console.log("in reducer response", response)
    console.log("in reducer response status", response.status)
    if (response.status === 200) {
      dispatch(setUser(response.data))
      console.log("in reducer res data ", response.data)
    } else console.log('loginUser failed, status: ', response.status)
  }
}

export const logoutUser = () => {
	return async (dispatch) => {
	  const response = await userService.logout()
	  if (response.status === 200) {
		console.log("response data after logout: ", response.data)
		dispatch(setUser(response.data))
	  } else console.log('logoutUser failed, status: ', response.status)
	}
  }

export default userSlice.reducer
