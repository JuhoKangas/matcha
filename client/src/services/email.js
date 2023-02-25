import axios from 'axios'

const checkEmail = (email) => {
  return axios
    .get(`http://localhost:3001/email/${email}`)
    .then((res) => res.data)
}

const getUserByEmail = (email) => {
  return axios
    .get(`http://localhost:3001/email/get/${email}`)
    .then((res) => res.data)
}

const checkToken = (token) => {
  return axios
    .get(`http://localhost:3001/email/token/${token}`)
    .then((res) => res.data)
}

const resetPassword = (password, id, token) => {
  return axios
    .post('http://localhost:3001/email/password', {
      password: password,
      id: id,
      token: token,
    })
    .then((res) => res.data)
}

const reportAccount = (id, reportedId) => {
  axios
    .post('http://localhost:3001/email/report', {
      id: id,
      reportedId: reportedId,
    })
    .then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  checkEmail,
  checkToken,
  resetPassword,
  getUserByEmail,
  reportAccount,
}
