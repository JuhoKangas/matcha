import { useField } from '../hooks'

const Register = (props) => {
  const username = useField('text')

  return (
    <div>
      <h1>Register</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          className="border-2 rounded border-neutral-800 ml-4 outline-none focus:border-slate-500 focus:ring focus:ring-blue-700 ring-offset-1"
          {...username}
        />
      </div>
    </div>
  )
}

export default Register
