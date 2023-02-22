import axios from 'axios'

const baseUrl = 'http://localhost:3001/matches'
const unmatchUrl = 'http://localhost:3001/matches/unmatch'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data.data.rows)
}

const createMatch = (loggedInUser, userId) => {
  return axios.post(baseUrl, { loggedInUser: loggedInUser, userId: userId })
}

const deleteMatch = (loggedInUser, userId) => {
  return axios.post(unmatchUrl, { loggedInUser: loggedInUser, userId: userId })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createMatch, deleteMatch }
