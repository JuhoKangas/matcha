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
      console.log('message was not sent, status: ', response.status)
      toast.error('Sending message failed.')
    }
  }
}

export const getAllMessages = (selectedChatId) => {
  return async (dispatch) => {
    console.log('In get all mesgs in reducer')
    const response = await messageService.getChatMessages(selectedChatId)
    console.log('response from geting all chat messages', response)
    if (response.status === 200) {
      console.log('Response data messages is this', response.data.messages)
      const finalMessages = response.data.messages
      dispatch(setMessages(finalMessages))
    } else console.log('loading messages failed, status: ', response.status)
  }
}

export const { setMessages, setNewMessage } = messageSlice.actions

export default messageSlice.reducer
