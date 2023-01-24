import { createSlice } from '@reduxjs/toolkit'

const filteredUsersSlice = createSlice({
  name: 'filteredUsers',
  initialState: [],
  reducers: {
    setFilteredUsers(state, action) {
      return action.payload
    },
  },
})

export const { setFilteredUsers } = filteredUsersSlice.actions

export default filteredUsersSlice.reducer
