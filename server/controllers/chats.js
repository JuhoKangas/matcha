const chatsRouter = require('express').Router()
const db = require('../db/index')

chatsRouter.get('/', async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM chats WHERE matcher_user_id = $1 OR recipient_user_id = $2 ORDER BY updated_at DESC', [req.query.userId, req.query.userId])
		const chatInfo = result.rows
		res.status(200).json({ 
			status: 'success',
			chats: chatInfo
		})
	} catch (err) {
    console.log(err)
  }
})

chatsRouter.post('/', async (req, res) => {
  try {
    const data = req.body
    const result = await db.query(
      'INSERT INTO chats (matcher_user_id, matcher_user_img, matcher_user_username, recipient_user_id, recipient_user_img, recipient_user_username) VALUES ($1, $2, $3, $4) returning *', // changed the token in the Table to null for now, before we assign an actual automatically generated token
      [
        data.loggedUserId,
				data.loggedUserImg,
				data.loggedUserUsername,
        data.recipientId,
				data.recipientImg,
				data.recipientUsername
      ]
    )
    res.status(201).json({ 
			status: 'success',
			result 
		})
  } catch (err) {
    console.log(err)
  }
})

chatsRouter.get('/selected', async (req, res) => {
	try {
		const result = await db.query('SELECT * FROM chats WHERE id = $1', [req.query.openedChatId])
		const chatInfo = result.rows[0]
		res.status(200).json({ 
			status: 'success',
			chats: chatInfo
		})
	} catch (err) {
    console.log(err)
  }
})

module.exports = chatsRouter