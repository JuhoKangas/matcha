import axios from "axios"

const baseUrl = "http://localhost:3001/users"
const loginUrl = "http://localhost:3001/login"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const create = (newUser) => {
  const request = axios.post(baseUrl, newUser)
  return request.then((res) => res.data)
}

const checkUser = (email, password) => {
  return axios.post(
    loginUrl,
    {
      email,
      password,
    },
    { withCredentials: true }
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, checkUser }
