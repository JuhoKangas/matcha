import axios from "axios"

const baseUrl = "http://localhost:3001/messages"

const sendMessage = (message) => {
  return axios.post(baseUrl, message)
}

const updateChatLastMessage = (message) => {
	return axios.put(baseUrl, message)
}

const getChatMessages = (selectedChatId) => {
  return axios.get(baseUrl, {params: {selectedChatId: selectedChatId}})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { sendMessage, getChatMessages, updateChatLastMessage }