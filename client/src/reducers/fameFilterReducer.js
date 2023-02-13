import { createSlice } from '@reduxjs/toolkit'

const fameFilterSlice = createSlice({
  name: 'fameFilters',
  initialState: [0, 100],
  reducers: {
    fameFilterChange(state, action) {
      const fameFilter = action.payload
      return fameFilter
    },
  },
})

export const { fameFilterChange } = fameFilterSlice.actions

export default fameFilterSlice.reducer
