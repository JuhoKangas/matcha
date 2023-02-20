import axios from "axios"

const baseUrl = "http://localhost:3001/likes"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data.data.rows)
}

const createLike = (loggedInUser, userId) => {
  return axios.post(baseUrl, {loggedInUser: loggedInUser, userId: userId
	})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createLike }