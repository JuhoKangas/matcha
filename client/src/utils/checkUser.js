import axios from 'axios'

export const checkUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3001/login/check', {
      username: username,
      password: password,
    })
    if (response.data.error) {
      return false
    } else {
      return true
    }
  } catch (e) {}
}
