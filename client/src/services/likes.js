import axios from 'axios'

const baseUrl = 'http://localhost:3001/likes'
const unlikeUrl = 'http://localhost:3001/likes/unlike'
const unlikedByUrl = 'http://localhost:3001/likes/unlikedby'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data.data.rows)
}

const createLike = (loggedInUser, userId) => {
  return axios.post(baseUrl, { loggedInUser: loggedInUser, userId: userId })
}

const getAllUnlikes = () => {
  const request = axios.get(unlikeUrl)
  return request.then((res) => res.data.data.rows)
}

const createUnlike = (loggedInUser, userId) => {
  return axios.post(unlikeUrl, {
    loggedInUser: loggedInUser,
    userId: userId,
  })
}

const isUnlikedBy = (loggedInUserId, userId) => {
  return axios
    .post(unlikedByUrl, {
      loggedInUserId: loggedInUserId,
      userId: userId,
    })
    .then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createLike, getAllUnlikes, createUnlike, isUnlikedBy }
