import axios from 'axios'

const getUserPhotos = (id) => {
  return axios.get(`http://localhost:3001/photos/${id}`).then((res) => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUserPhotos }
