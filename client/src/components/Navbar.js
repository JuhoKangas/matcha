import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { logoutUser } from "../reducers/userReducer"

const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
	event.preventDefault()
	dispatch(logoutUser())
    navigate("/")
  }

  return (
    <div className="flex justify-between gap-7 p-4 bg-black ">
      {
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/flowbite@1.5.1/dist/flowbite.min.css"
          />
        </head>
      }
      <a href="/home">
        <img
          src="matcha-logo-dark.png"
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="matcha-logo"
        ></img>
      </a>

      <div className="">
        <Link
          className="text-almost-white text-base hover:text-gray-600 m-auto"
          to="/home"
        >
          Home
        </Link>
        <Link
          className="text-almost-white hover:text-gray-600 m-auto"
          to="/matches"
        >
          Matches
        </Link>
{/*         <Link
          className="text-almost-white hover:text-gray-600 m-auto"
          to="/profile"
        >
          Profile
        </Link> */}
        <Link
          className="text-almost-white hover:text-gray-600 m-auto"
          to="/settings"
        >
          Settings
        </Link>
		<Link
          className="text-almost-white hover:text-gray-600 m-auto"
          to="/profile"
        >
          {user}
        </Link>

        <div class=" inline-flex relative w-fit">
          <div class="flex items-center justify-center text-center ">
            <div>
              <button
                id="dropdownDefault"
                data-dropdown-toggle="dropdown"
                class="font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="bell"
                  class="mx-auto text-white w-5 h-5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          id="dropdown"
          class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            class="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <a
                href="#"
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="">
        <form>
          <input
            type="search"
            placeholder="Search"
            className="me-2 rounded-md"
            aria-label="Search"
          />
          <button
            className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
            onClick={"#"}
          >
            Search
          </button>
        </form>

        <button
          className="bg-gradient-to-r from-chitty-chitty to-bang-bang hover:bg-gradient-to-l text-almost-black py-2 px-4 rounded focus:outline-none focus:shadow-outline font-montserrat"
          onClick={handleLogout}
        >
          Log out
        </button>
        {/* 			<Navbar.Brand><a href="/dashboard"><img src="matcha-logo-dark.png" width="30" height="30" className="d-inline-block align-top" alt="matcha-logo"></img></a></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="m-auto d-flex align-items-center w-100">
							<LinkContainer to="/dashboard">
								<Nav.Link>Home</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/matches">
								<Nav.Link>Matches</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/profile">
								<Nav.Link>Profile</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/settings">
								<Nav.Link>Settings</Nav.Link>
							</LinkContainer>
							<NavDropdown title={<i className="fas fa-bell"></i>} menuVariant="dark" id="basic-nav-dropdown">
								<NavDropdown.Item className="dropdown-item text-wrap" target="_blank" rel="nofollow">
									<p className="small text-uppercase mb-2">21/11/2022</p>
									<p>You have a new match!</p>
								</NavDropdown.Item>
								<NavDropdown.Item className="dropdown-item text-wrap" target="_blank" rel="nofollow">
									<p className="small text-uppercase mb-2">21/11/2022</p>
									<p>You have a new match!</p>
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Item className="ms-md-auto d-none d-md-block"></Nav.Item>
							<Form className="mx-3 d-flex">
								<Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
								<Button className="col btn btn-pink-moon" onClick={"#"}>Search</Button>
							</Form>
							<Nav.Item className="mx-3 d-none d-md-block">
								<Navbar.Text className="fs-6">{user.data.user.username}</Navbar.Text>
							</Nav.Item>
							<Button size="sm" variant="secondary" onClick={logout}>
								Log out
							</Button>
						</Nav>
					</Navbar.Collapse> */}
      </div>
    </div>
  )
}

export default Navbar

{
  /*  <Nav.Item>
<span id="navbarNotificationCounter" class="badge rounded-pill badge-notification bg-danger" alt="Notifications" style={{color: "rgb(255, 255, 255) !important;"}}>2</span>
</Nav.Item> */
}
