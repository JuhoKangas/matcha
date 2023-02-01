import axios from "axios"

const baseUrl = "http://localhost:3001/chats"

const getAllChats = (userId) => {
  const request = axios.get(baseUrl, userId)
  return request.then((res) => res.data)
}

const getSelectedChat = (recipientUserId) => {
  const request = axios.get(baseUrl, recipientUserId)
  return request.then((res) => res.data)
}

const updateUnreadChatMessages = (chatId) => { // in the backend, this has to do two things: set the number of unread messages in "Chat" table to 0 and set "read status" of every message in "Message table" that was unread (1) to read (0)in the respective chat
  const request = axios.post(baseUrl, chatId)
  return request.then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllChats, getSelectedChat, updateUnreadChatMessages }