import axios from 'axios'

const baseUrl = 'http://localhost:3001/users'
const loginUrl = 'http://localhost:3001/login'
const logoutUrl = 'http://localhost:3001/users/logout'
const settingsUrl = 'http://localhost:3001/settings'
const setupUrl = 'http://localhost:3001/users/setup'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data.data.rows)
}

const create = (newUser) => {
  return axios.post(baseUrl, newUser)
}

const setup = (profileData) => {
  return axios.put(setupUrl, profileData, { withCredentials: true })
}

const checkUser = (email, password, coordinates) => {
  return axios.post(
    loginUrl,
    {
      email,
      password,
      coordinates,
    },
    { withCredentials: true }
  )
}

const update = (updatedUserInfo) => {
  return axios.put(settingsUrl, updatedUserInfo, { withCredentials: true })
}

const logout = () => {
  return axios.post(logoutUrl, {}, { withCredentials: true })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, checkUser, logout, update, setup }
