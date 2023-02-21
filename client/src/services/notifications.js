import axios from "axios"

const baseUrl = "http://localhost:3001/notifications"

const getAllNotifications = (loggedInUser) => {
	console.log("IN SERVICES getting loggedInUser", loggedInUser)
  return axios.get(baseUrl, {params: {loggedInUser: loggedInUser}})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllNotifications }