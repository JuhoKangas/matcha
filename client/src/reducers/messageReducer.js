import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import messageService from '../services/messages'

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    newMessage: '',
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload
    },
  },
})

export const messageSend = (message) => {
  return async (dispatch) => {
    const response = await messageService.sendMessage(message)
    const responseChat = await messageService.updateChatLastMessage(message)
    if (response.status === 201 && responseChat.status === 200) {
      dispatch(setNewMessage(response.data))
    } else {
      toast.error('Sending message failed.')
    }
  }
}

export const { setMessages, setNewMessage } = messageSlice.actions

export default messageSlice.reducer
