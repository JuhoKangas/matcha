import { createSlice } from "@reduxjs/toolkit"
import chatService from "../services/chats"

const chatSlice = createSlice({
  name: "chats",
  initialState: {
		allChats: [],
		selectedChat: null
	},
  reducers: {
    setChats(state, action) {
      return (state.allChats = action.payload)
    },
		setSelectedChat(state, action) {
      return (state.selectedChat = action.payload)
    },
  },
})

export const initializeChats = (userId) => {
  return async (dispatch) => {
    const chats = await chatService.getAllChats(userId)
    dispatch(setChats(chats.data))
  }
}

export const selectOneChat = (recipientUserId) => {
  return async (dispatch) => {
    const chat = await chatService.getSelectedChat(recipientUserId)
    dispatch(setSelectedChat(chat.data))
  }
}

export const { setChats, setSelectedChat } = chatSlice.actions

export default chatSlice.reducer