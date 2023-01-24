import { createSlice } from '@reduxjs/toolkit'

const tagFilterSlice = createSlice({
  name: 'tagFilters',
  initialState: [],
  reducers: {
    tagFilterChange(state, action) {
      const tagFilter = action.payload
      return tagFilter
    },
    addTagFilter(state, action) {
      const tagFilter = [...state, action.payload]
      return tagFilter
    },
    removeTagFilter(state, action) {
      const tagFilter = state.filter((f) => f !== action.payload)
      return tagFilter
    },
  },
})

export const { tagFilterChange, addTagFilter, removeTagFilter } =
  tagFilterSlice.actions

export default tagFilterSlice.reducer
