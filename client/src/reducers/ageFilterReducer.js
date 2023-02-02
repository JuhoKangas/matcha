import { createSlice } from '@reduxjs/toolkit'

const ageFilterSlice = createSlice({
  name: 'ageFilters',
  initialState: [18, 122],
  reducers: {
    ageFilterChange(state, action) {
      const ageFilter = action.payload
      return ageFilter
    },
  },
})

export const { ageFilterChange } = ageFilterSlice.actions

export default ageFilterSlice.reducer
