import { createSlice } from "@reduxjs/toolkit"
import messageService from "../services/messages"

const messageSlice = createSlice({
  name: "messages",
  initialState: {
		messages: [],
		newMessage: ""
	},
  reducers: {
    setMessages(state, action) {
      return (state.messages = action.payload)
    },
		setNewMessage(state, action) {
      return (state.newMessage = action.payload)
    },
  },
})

export const messageSend = (text, userId, chatId) => {
  return async (dispatch) => {
    const sentMessage = await messageService.sendMessage(text, userId, chatId)
		if (sentMessage.status === 200)
		{
    	dispatch(setNewMessage(sentMessage.data))
			setNewMessage("")
		}
  }
}

export const getAllMessages = () => {
  return async (dispatch) => {
    const allMessages = await messageService.getChatMessages()
    dispatch(setMessages(allMessages.data))
  }
}

export const { setMessages, setNewMessage } = messageSlice.actions

export default messageSlice.reducer