const matchesRouter = require('express').Router()
const db = require('../db/index')

matchesRouter.get('/', async (request, response) => {
  const data = await db.query('SELECT * FROM matches')
  response.json({ data })
})

matchesRouter.post('/', async (request, response) => {
  const data = request.body
  if (data.loggedInUser && data.userId) {
    try {
      const results = await db.query(
        'INSERT INTO matches (user1, user2) VALUES ($1, $2) returning *',
        [data.loggedInUser, data.userId]
      )
      response.status(201).json({ results })
    } catch (err) {
      console.log(err)
    }
  } else {
    response.status(400).json({ msg: 'bad request' })
  }
})

matchesRouter.post('/unmatch', async (request, response) => {
  const data = request.body
  if (data.loggedInUser && data.userId) {
    try {
      const results = await db.query(
        'DELETE FROM matches WHERE (user1 = $1 AND user2 = $2) OR (user2 = $1, user1 = $2) returning *',
        [data.loggedInUser, data.userId]
      )
      const deletedChat = await db.query(
        'DELETE FROM chats WHERE (matcher_user_id = $1 AND recipient_user_id = $2) OR (matcher_user_id = $2 AND recipient_user_id = $1) returning *',
        [data.loggedInUser, data.userId]
      )
      var message = ''
      if (deletedChat.rowCount > 0) {
        message = 'Unmatched and deleted chat'
      }
      response.status(201).json({ results, msg: message })
    } catch (err) {
      console.log(err)
    }
  } else {
    response.status(400).json({ msg: 'bad request' })
  }
})

module.exports = matchesRouter
