const notificationsRouter = require('express').Router()
const db = require('../db/index')

notificationsRouter.get('/', async (req, res) => {
	let seen = 't'
	const data = req.query
	try {
		const result = await db.query('SELECT * FROM notifications WHERE recipient = $1 ORDER BY id DESC', [data.loggedInUser])
		const update = await db.query('UPDATE notifications SET seen = $1 WHERE recipient = $2', [seen, data.loggedInUser])
		const allNotifications = result.rows
		res.status(200).json({
			status: 'success',
			notifications: allNotifications
		})
	} catch (err) {
		console.log(err)
	}
})

notificationsRouter.get('/unread', async (req, res) => {
	let seen = 'f'
	const data = req.query
	try {
		const result = await db.query('SELECT * FROM notifications WHERE recipient = $1 AND seen = $2', [data.loggedInUser, seen])
		const allUnreadNotifications = result.rows
		res.status(200).json({
			status: 'success',
			unreadNotifications: allUnreadNotifications
		})
	} catch (err) {
		console.log(err)
	}
})

module.exports = notificationsRouter