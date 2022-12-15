import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const create = (newUser) => {
  const request = axios.post(baseUrl, newUser)
  return request.then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }
