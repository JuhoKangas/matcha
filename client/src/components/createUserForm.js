import { useField } from '../hooks'

const CreateUserForm = (props) => {
  const username = useField('text')
  const firstName = useField('text')
  const lastName = useField('text')
  const age = useField('number')

  const submitUser = (e) => {
    e.preventDefault()

    const newUser = {
      username: username.value,
      firstname: firstName.value,
      lastname: lastName.value,
      age: age.value,
    }

    props.handleSubmit(newUser)
  }

  return (
    <form action="post" onSubmit={submitUser}>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col px-8 w-full sm:w-96">
          <label className="text-sm ml-2 mb-1" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            className="px-4 py-2 border rounded-lg border-neutral-800 outline-none focus:border-blue-700"
            {...username}
          />
        </div>
        <div className="flex flex-col px-8 w-full sm:w-96">
          <label className="text-sm ml-2 mb-1" htmlFor="firsName">
            First Name
          </label>
          <input
            name="firstName"
            className="px-4 py-2 border rounded-lg border-neutral-800 outline-none focus:border-blue-700"
            {...firstName}
          />
        </div>
        <div className="flex flex-col px-8 w-full sm:w-96">
          <label className="text-sm ml-2 mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            name="lastName"
            className="px-4 py-2 border rounded-lg border-neutral-800 outline-none focus:border-blue-700"
            {...lastName}
          />
        </div>
        <div className="flex flex-col px-8 w-full sm:w-96">
          <label className="text-sm ml-2 mb-1" htmlFor="email">
            Age
          </label>
          <input
            name="age"
            className="px-4 py-2 border rounded-lg border-neutral-800 outline-none focus:border-blue-700"
            {...age}
          />
        </div>
        <button
          className="px-4 py-2 bg-slate-600 text-white rounded-xl hover:bg-slate-500"
          type="submit"
        >
          submit
        </button>
      </div>
    </form>
  )
}

export default CreateUserForm
