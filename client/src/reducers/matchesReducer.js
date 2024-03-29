import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import matchesService from '../services/matches'
import { createChat, initializeChats } from './chatReducer'

const matchesSlice = createSlice({
  name: 'matches',
  initialState: [],
  reducers: {
    setMatches(state, action) {
      return action.payload
    },
    addMatch(state, action) {
      const newMatches = [...state, action.payload]
      return newMatches
    },
  },
})

export const { setMatches, addMatch } = matchesSlice.actions

export const initializeMatches = () => {
  return async (dispatch) => {
    const matches = await matchesService.getAll()
    dispatch(setMatches(matches))
  }
}

export const matchUsers = (loggedInUser, user) => {
  return async (dispatch) => {
    const response = await matchesService.createMatch(loggedInUser.id, user.id)
    if (response.status === 201) {
      dispatch(addMatch(response.data.results.rows[0]))
      dispatch(createChat(loggedInUser, user))
    } else toast.error('Sorry, could not match with this user')
  }
}

export const unmatchUsers = (loggedInUser, user) => {
  return async (dispatch) => {
    const response = await matchesService.deleteMatch(loggedInUser.id, user.id)
    if (response.status === 201) {
      dispatch(initializeMatches())
      dispatch(initializeChats())
    } else toast.error('Sorry, could not unmatch this user')
  }
}

export default matchesSlice.reducer
