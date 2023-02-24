import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import notificationsService from '../services/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

const Notifications = () => {
  const loggedInUser = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const [notifications, setNotifications] = useState([])

  const getNotifications = async () => {
    try {
      const response = await notificationsService.getAllNotifications(
        loggedInUser.id
      )
      if (response.status === 200) {
        setNotifications(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className="text-center font-montserrat font-bold leading-tight text-almost-white text-4xl m-10">
        Notifications
      </h1>
      {notifications?.notifications?.map((notification) => {
        return (
          <div
            key={notification.id}
            className="flex justify-between border border-almost-white border-opacity-30 rounded-md mb-5 mr-10 ml-10 text-almost-white p-3 mb:truncate"
          >
            <div className="text-lg font-light">{notification.message}</div>
            <div className="flex opacity-70 text-xs pt-2">
              {moment(notification.created).format('MMMM Do, h:mm:ss a')}
              <div>
                <i className="flex text-green-600 pl-2">
                  {notification.recipient === loggedInUser.id &&
                  notification.seen === true ? (
                    <FontAwesomeIcon icon={faCheckDouble} />
                  ) : (
                    <>NEW</>
                  )}
                </i>
              </div>
            </div>
          </div>
        )
      })}
      <h1 className="text-center font-montserrat font-bold leading-tight text-almost-white text-4xl m-10">
        Viewed history
      </h1>
      {notifications?.viewHistory?.map((notification) => {
        return (
          <div
            key={notification.id}
            className="flex justify-between border border-almost-white border-opacity-30 rounded-md mb-5 mr-10 ml-10 text-almost-white p-3 mb:truncate"
          >
            <div className="text-lg font-light">
              You viewed{' '}
              {users.find((u) => u.id === notification.recipient).username}'s
              profile.
            </div>
            <div className="flex opacity-70 text-xs pt-2">
              {moment(notification.created).format('MMMM Do, h:mm:ss a')}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Notifications
