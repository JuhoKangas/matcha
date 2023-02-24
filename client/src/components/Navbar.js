import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import { useNavigate, Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import notificationsService from '../services/notifications'

const Navbar = ({ socket }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(({ user }) => user)
  const [newNotification, setNewNotification] = useState(false)
  const [newMsgNotification, setNewMsgNotification] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(false)

  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Matches', href: '/matches' },
    { name: 'Photos', href: '/photos' },
    { name: 'Blocked', href: '/blocked' },
  ]

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser(loggedInUser.id))
    navigate('/')
  }

  const resetMsgNotification = (event) => {
    event.preventDefault()
    setNewMsgNotification(false)
    navigate('/chat')
  }

  const handleNotifications = () => {
    setNewNotification(false)
    setUnreadNotifications(false)
    navigate('/notifications')
  }

  const getUnreadNotifications = async () => {
    try {
      const response = await notificationsService.getUnreadNotifications(
        loggedInUser.id
      )
      if (response.status === 200) {
        if (response.data.unreadNotifications.length > 0)
          setUnreadNotifications(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUnreadNotifications()
    socket.on('show-notification', (data) => {
      if (loggedInUser.id === data.user2) {
        setNewNotification(true)
      }
    })

    socket.on('show-msg-notification', (data) => {
      if (loggedInUser.id === data.user2) {
        setNewMsgNotification(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, loggedInUser.id])

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex gap-4 mr-2">
                  <div className="relative">
                    {(newNotification || unreadNotifications) && (
                      <div className="w-4 h-4 bg-red-600 rounded-full p-1 text-xs flex items-center justify-center absolute ml-4"></div>
                    )}
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={handleNotifications}
                    >
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <Link
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={resetMsgNotification}
                  >
                    <div className="relative">
                      {newMsgNotification && (
                        <div className="w-4 h-4 bg-red-600 rounded-full p-1 text-xs flex items-center justify-center absolute ml-4"></div>
                      )}
                      <ChatBubbleLeftRightIcon className="h-6 w-6" />
                    </div>
                  </Link>

                  <p className="font-montserrat text-almost-white pt-1">
                    {loggedInUser.username}
                  </p>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      {/* USER PHOTO */}
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`http://localhost:3001/uploads/${loggedInUser.profilePicture}`}
                        alt="user profilepicture"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {() => (
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <Link
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
