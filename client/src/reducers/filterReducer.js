import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const filterSlice = createSlice({
  name: 'filters',
  initialState: ['none', 'two'],
  reducers: {
    filterChange(state, action) {
      const filter = action.payload
      return filter
    },
  },
})

export const { filterChange } = filterSlice.actions

export const initializeFilters = () => {
  return async (dispatch) => {
    const filters = await userService.getAllFilters()
    dispatch(filterChange(filters))
  }
}

export default filterSlice.reducer
