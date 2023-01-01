import axios from "axios"

const baseUrl = "http://localhost:3001/messages"

const sendMessage = (message) => {
  const request = axios.post(baseUrl, message)
  return request.then((res) => res.data)
}

const getChatMessages = (chatId) => {
  const request = axios.get(baseUrl, chatId) 
  return request.then((res) => res.data)
}

export default { sendMessage, getChatMessages }