import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import notificationsService from '../services/notifications'

const Notifications = () => {
	const loggedInUser = useSelector(({user}) => user)
	console.log(loggedInUser)
	const [notifications, setNotifications] = useState([])

		const getNotifications = async () => {
			try {
				const response = await notificationsService.getAllNotifications(loggedInUser.id)
				if(response.status === 200) 
				console.log("RESPONSE FROM NOTIF", response.data)
					setNotifications(response.data)
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
      {notifications?.notifications?.map((notification) => {
				return (
					<div>
						{notification.message}
					</div>
				)
			})}
    </div>
  )
}

export default Notifications