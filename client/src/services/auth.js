import axios from 'axios'

const checkToken = () => {
  return axios
    .get('http://localhost:3001/auth', { withCredentials: true })
    .then((res) => res.data)
}

const authUser = (userId) => {
  return axios
    .get(`http://localhost:3001/users/${userId}`)
    .then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { checkToken, authUser }
