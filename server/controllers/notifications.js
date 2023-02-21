const notificationsRouter = require('express').Router()
const db = require('../db/index')

notificationsRouter.get('/', async (req, res) => {
	const data = req.query
	try {
		const result = await db.query('SELECT * FROM notifications WHERE recipient = $1', [data.loggedInUser])
		const allNotifications = result.rows
		res.status(200).json({
			status: 'success',
			notifications: allNotifications
		})
	} catch (err) {
		console.log(err)
	}
})

module.exports = notificationsRouter