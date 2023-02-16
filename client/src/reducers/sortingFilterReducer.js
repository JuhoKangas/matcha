import { createSlice } from '@reduxjs/toolkit'

const sortingFilterSlice = createSlice({
  name: 'sortingFilters',
  initialState: 'Distance',
  reducers: {
    setSortingFilter(state, action) {
      const sortingFilter = action.payload
      return sortingFilter
    },
  },
})

export const { setSortingFilter } = sortingFilterSlice.actions

export default sortingFilterSlice.reducer
