import axios from "axios"

const baseUrl = "http://localhost:3001/chats"

const createNewChat = (newChat) => {
	console.log("This is new chat from card", newChat)
	return axios.post(baseUrl, newChat)
}

const getAllChats = (userId) => {
  return axios.get(baseUrl, {params: {userId: userId}})
/* 	console.log("Request from services to get all chats", request)
  return request.then((res) => res.rows) */
}

const getSelectedChat = (recipientUserId) => {
  const request = axios.get(baseUrl, recipientUserId)
  return request.then((res) => res.data)
}

const updateUnreadChatMessages = (chatId) => { // in the backend, this has to do two things: set the number of unread messages in "Chat" table to 0 and set "read status" of every message in "Message table" that was unread (1) to read (0)in the respective chat
  const request = axios.put(baseUrl, chatId)
  return request.then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllChats, getSelectedChat, updateUnreadChatMessages, createNewChat }