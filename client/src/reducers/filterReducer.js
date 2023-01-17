import { createSlice } from '@reduxjs/toolkit'

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

export default filterSlice.reducer
