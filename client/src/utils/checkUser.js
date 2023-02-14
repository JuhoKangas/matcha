import axios from 'axios'

export const checkUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3001/login/check', {
      email: email,
      password: password,
    })
    if (response.data.error) {
      return false
    } else {
      return true
    }
  } catch (e) {}
}
