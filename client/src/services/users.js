import axios from 'axios'

const baseUrl = 'http://localhost:3001/users'
const loginUrl = 'http://localhost:3001/login'
const logoutUrl = 'http://localhost:3001/users/logout'
const settingsUrl = 'http://localhost:3001/settings'
const setupUrl = 'http://localhost:3001/users/setup'
const uploadUrl = 'http://localhost:3001/photos'
const deleteUrl = 'http://localhost:3001/photos/delete'
const getSelectedUserPhotosUrl = 'http://localhost:3001/users/getSelectedPhotos'
const uploadPicUrl = 'http://localhost:3001/upload'

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

const uploadPhoto = (imageData) => {
  return axios.post(uploadPicUrl, imageData)
}

const checkUser = (username, password, coordinates, userIP) => {
  return axios.post(
    loginUrl,
    {
      username,
      password,
      coordinates,
      userIP,
    },
    { withCredentials: true }
  )
}

const update = (updatedUserInfo) => {
  return axios.put(settingsUrl, updatedUserInfo, { withCredentials: true })
}

const upload = (userPhoto) => {
  return axios.post(uploadUrl, userPhoto, { withCredentials: true })
}

const deletePhoto = (deleteUserPhoto) => {
  return axios.post(deleteUrl, deleteUserPhoto, { withCredentials: true })
}

const getUserByUsername = (username) => {
  return axios.get(`${baseUrl}/user/${username}`, { withCredentials: true })
}

const getSelectedUserPhotos = (selectedUserId) => {
  return axios.get(getSelectedUserPhotosUrl, selectedUserId, {
    withCredentials: true,
  })
}

const logout = (userId) => {
  return axios.post(logoutUrl, { userId: userId }, { withCredentials: true })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  checkUser,
  logout,
  update,
  getUserByUsername,
  setup,
  upload,
  getSelectedUserPhotos,
  deletePhoto,
  uploadPhoto,
}
