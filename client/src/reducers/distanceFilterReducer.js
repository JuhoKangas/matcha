import { createSlice } from '@reduxjs/toolkit'

const distanceFilterSlice = createSlice({
  name: 'distanceFilters',
  initialState: [0, 300],
  reducers: {
    distanceFilterChange(state, action) {
      const distanceFilter = action.payload
      return distanceFilter
    },
  },
})

export const { distanceFilterChange } = distanceFilterSlice.actions

export default distanceFilterSlice.reducer
