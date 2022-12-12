import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-center gap-7 p-4 bg-slate-400 text-gray-900 ">
      <Link className="hover:text-gray-600" to="/">
        Home
      </Link>
      <Link className="hover:text-gray-600" to="/register">
        Register
      </Link>
      <Link className="hover:text-gray-600" to="/login">
        Login
      </Link>
    </div>
  )
}

export default Navbar
