import { createSlice } from '@reduxjs/toolkit'
import tagsService from '../services/tags'

const tagSlice = createSlice({
  name: 'tags',
  initialState: [],
  reducers: {
    tagsChange(state, action) {
      const tags = action.payload
      return tags
    },
    addTag(state, action) {
      const tags = [...state, action.payload]
      return tags
    },
    removeTag(state, action) {
      const tags = state.filter((f) => f !== action.payload)
      return tags
    },
  },
})

export const { tagsChange, addTag, removeTag } = tagSlice.actions

export const initializeTags = () => {
  return async (dispatch) => {
    const tags = await tagsService.getAllTags()
    dispatch(tagsChange(tags))
  }
}

export default tagSlice.reducer
