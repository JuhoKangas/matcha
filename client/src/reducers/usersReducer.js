import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { getDistanceKm } from '../utils/getDistanceKm'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = (loggedInUser) => {
  return async (dispatch) => {
    const users = await userService.getAll()
    const usersExceptLoggedIn = users.filter(
      (user) => user.id !== loggedInUser.id
    )
    const usersWithLocation = usersExceptLoggedIn.map((user) => {
      return {
        ...user,
        distance: getDistanceKm(
          loggedInUser.latitude,
          loggedInUser.longitude,
          user.latitude,
          user.longitude
        ),
      }
    })
    dispatch(setUsers(usersWithLocation))
  }
}

export default usersSlice.reducer
