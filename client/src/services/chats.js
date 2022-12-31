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

export default { getAllChats, getSelectedChat }