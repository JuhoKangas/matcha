const likesRouter = require('express').Router()
const db = require('../db/index')

likesRouter.get('/', async (request, response) => {
  const data = await db.query('SELECT * FROM likes')
  response.json({ data })
})

likesRouter.post('/', async (request, response) => {
  const data = request.body
  if (data.loggedInUser && data.userId) {
    var message = ''
    try {
      const unliked = await db.query(
        'SELECT * FROM unlikes WHERE (user1 = $1 AND user2 = $2) OR (user2 = $1 AND user1 = $2)',
        [data.loggedInUser, data.userId]
      )
      if (unliked.rowCount > 0) {
        message = 'Cannot like'
        response.status(200).json({ unliked, msg: message })
      } else {
        const results = await db.query(
          'INSERT INTO likes (user1, user2) VALUES ($1, $2) returning *',
          [data.loggedInUser, data.userId]
        )
        await db.query(
          'UPDATE users SET fame = (fame+1) WHERE (id = $1 AND fame < 100)',
          [data.userId]
        )
        const otherUserLiked = await db.query(
          'SELECT * FROM likes WHERE user1 = $1 AND user2 = $2',
          [data.userId, data.loggedInUser]
        )

        if (otherUserLiked.rowCount > 0) {
          message = 'Match'
        } else {
          message = 'Like'
        }
        response.status(201).json({ results, msg: message })
      }
    } catch (err) {
      console.log(err)
    }
  } else {
    response.status(400).json({ msg: 'bad request' })
  }
})

likesRouter.get('/unlike', async (request, response) => {
  const data = await db.query('SELECT * FROM unlikes')
  response.json({ data })
})

likesRouter.post('/unlike', async (request, response) => {
  const data = request.body
  if (data.loggedInUser && data.userId) {
    var message = ''
    try {
      const unliked = await db.query(
        'SELECT * FROM unlikes WHERE (user1 = $1 AND user2 = $2) OR (user2 = $1 AND user1 = $2)',
        [data.loggedInUser, data.userId]
      )
      if (unliked.rowCount > 0) {
        message = 'Cannot unlike'
        response.status(200).json({ unliked, msg: message })
      } else {
        const results = await db.query(
          'INSERT INTO unlikes (user1, user2) VALUES ($1, $2) returning *',
          [data.loggedInUser, data.userId]
        )
        const deletedLike = await db.query(
          'DELETE FROM likes WHERE user1 = $1 AND user2 = $2 returning *',
          [data.loggedInUser, data.userId]
        )
        await db.query(
          'UPDATE users SET fame = (fame-1) WHERE (id = $1 AND fame > 0)',
          [data.userId]
        )
        if (deletedLike.rowCount > 0) {
          message = 'Unmatch'
        } else {
          message = 'Unlike'
        }
        response.status(201).json({ results, msg: message })
      }
    } catch (err) {
      console.log(err)
    }
  } else {
    response.status(400).json({ msg: 'bad request' })
  }
})

likesRouter.post('/unlikedby', async (request, response) => {
  const data = request.body
  const res = await db.query(
    'SELECT * FROM unlikes WHERE (user1 = $1) AND (user2 = $2)',
    [data.userId, data.loggedInUserId]
  )
  response.json({ data: res.rowCount })
})

module.exports = likesRouter
