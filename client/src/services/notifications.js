import axios from "axios"

const baseUrl = "http://localhost:3001/notifications"
const unreadNotificationsUrl = "http://localhost:3001/notifications/unread"

const getAllNotifications = (loggedInUser) => {
  return axios.get(baseUrl, {params: {loggedInUser: loggedInUser}})
}

const getUnreadNotifications = (loggedInUser) => {
	return axios.get(unreadNotificationsUrl, {params: {loggedInUser: loggedInUser}})
}

/* const updateReadStatus = (loggedInUser) => {
	return axios.put(baseUrl, {params: {loggedInUser: loggedInUser}})
} */

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllNotifications, getUnreadNotifications }