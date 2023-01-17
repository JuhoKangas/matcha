import axios from 'axios'

const tagsUrl = 'http://localhost:3001/tags'

const getAllTags = () => {
  const request = axios.get(tagsUrl)

  return request.then((res) => res.data.tags.rows)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllTags }
