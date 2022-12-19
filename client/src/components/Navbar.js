import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { useCookies } from "react-cookie"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["user"])

  const logout = () => {
    removeCookie("UserId", cookies.UserId)
    removeCookie("AuthToken", cookies.AuthToken)
    navigate("/")
  }

  return (
    <div className="flex justify-start gap-7 p-4 bg-black ">
      <a href="/home">
        <img
          src="matcha-logo-dark.png"
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="matcha-logo"
        ></img>
      </a>

      <Link
        className="text-almost-white text-base hover:text-gray-600 m-auto"
        to="/"
      >
        Home
      </Link>
      <Link
        className="text-almost-white hover:text-gray-600 m-auto"
        to="/matches"
      >
        Matches
      </Link>
      <Link
        className="text-almost-white hover:text-gray-600 m-auto"
        to="/profile"
      >
        Profile
      </Link>
      <Link
        className="text-almost-white hover:text-gray-600 m-auto"
        to="/settings"
      >
        Settings
      </Link>

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
        onClick={logout}
      >
        Log out
      </button>
      {/* 					<Navbar.Brand><a href="/dashboard"><img src="matcha-logo-dark.png" width="30" height="30" className="d-inline-block align-top" alt="matcha-logo"></img></a></Navbar.Brand>
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
  )
}

export default Navbar

{
  /* <Nav.Item>
<span id="navbarNotificationCounter" class="badge rounded-pill badge-notification bg-danger" alt="Notifications" style={{color: "rgb(255, 255, 255) !important;"}}>2</span>
</Nav.Item> */
}
