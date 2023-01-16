import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const filterSlice = createSlice({
  name: 'filters',
  initialState: [],
  reducers: {
    filterChange(state, action) {
      const filter = action.payload
      return filter
    },
    addFilter(state, action) {
      const filter = [...state, action.payload]
      return filter
    },
    removeFilter(state, action) {
      const filter = state.filter((f) => f !== action.payload)
      return filter
    },
  },
})

export const { filterChange, addFilter, removeFilter } = filterSlice.actions

export const initializeFilters = () => {
  return async (dispatch) => {
    const filters = await userService.getAllFilters()
    dispatch(filterChange(filters))
  }
}

export default filterSlice.reducer
