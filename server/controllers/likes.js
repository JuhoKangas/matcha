const likesRouter = require('express').Router()
const db = require('../db/index')

likesRouter.get('/', async (request, response) => {
  const data = await db.query('SELECT * FROM likes')
  response.json({ data })
})

likesRouter.post('/', async (request, response) => {
  const data = request.body
  if (data.loggedInUser && data.userId) {
    try {
      const results = await db.query(
        'INSERT INTO likes (user1, user2) VALUES ($1, $2) returning *',
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

module.exports = likesRouter
