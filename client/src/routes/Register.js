import userService from '../services/users'
import CreateUserForm from '../components/createUserForm'

const Register = (props) => {
  const submitUser = (newUser) => {
    userService.create(newUser).then((res) => console.log(res))
  }

  return (
    <div>
      <h1>Register</h1>
      <CreateUserForm handleSubmit={submitUser} />
    </div>
  )
}

export default Register
