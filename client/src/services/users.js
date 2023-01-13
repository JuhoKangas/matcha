import axios from 'axios'

const baseUrl = 'http://localhost:3001/users'
const loginUrl = 'http://localhost:3001/login'
const logoutUrl = 'http://localhost:3001/logout'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

// TODO: fix request to get proper list of all tags available
const getAllFilters = () => {
  // const request = axios.get(baseUrl)
  // return request.then((res) => res.data)
  const TODO = [
    'stars',
    'cars',
    'photography',
    'climbing',
    'cats',
    'dogs',
    'food',
  ]
  return TODO
}

const create = (newUser) => {
  const request = axios.post(baseUrl, newUser)
  return request.then((res) => res.data)
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

const logout = () => {
  return axios.post(logoutUrl)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, checkUser, logout, getAllFilters }
