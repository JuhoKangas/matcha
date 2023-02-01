const chatsRouter = require('express').Router()
const db = require('../db/index')

chatsRouter.get('/', async (req, res) => {
  const data = await db.query('SELECT * FROM chats')
  res.json({ data })
})

chatsRouter.post('/', async (req, res) => {
  try {
    const data = req.body
		console.log("This is data from backend", data)
    const result = await db.query(
      'INSERT INTO chats (logged_user, recipient_user) VALUES ($1, $2) returning *', // changed the token in the Table to null for now, before we assign an actual automatically generated token
      [
        data.loggedUserId,
        data.recipientId
      ]
    )
    res.status(201).json({ result })
  } catch (err) {
    console.log(err)
  }
})

/* usersRouter.put('/setup', async (request, response) => {
  try {
    const data = request.body
    console.log('In users controllers.')
    const results = await db.query(
      'UPDATE users SET gender_identity = $1, gender_interest = $2, bio = $3, tags = $4, profile_picture = $5 WHERE id = $6 returning id, username, firstname, lastname, email, age, gender_identity, gender_interest, tags, bio, city, country, active, fame, online, latitude, longitude, profile_picture',
      [
        data.genderIdentity,
        data.genderInterest,
        data.bio,
        data.tags,
        data.profilePicture,
        data.id,
      ]
    )
    response.status(201).json({
      status: 'success',
      data: {
        user: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

usersRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const query = await db.query('DELETE FROM users WHERE id = $1', [id])
  response.status(204).end()
})

usersRouter.post('/logout', async (request, response) => {
  response
    .clearCookie('authorization', { domain: 'localhost', path: '/' })
    .send({})
})

usersRouter.post('/tags', async (req, res) => {
  const { tagName, userId } = req.body

  try {
    const tagFromDb = await db.query('SELECT id FROM tags WHERE tagname = $1', [
      tagName,
    ])
    if (tagFromDb.rows.length > 0) {
      const result = await db.query(
        'UPDATE users SET tags = array_append(tags, $1) WHERE id = $2',
        [tagFromDb.rows[0].id, userId]
      )
      console.log(result)
    } else {
      const tagId = await db.query(
        'INSERT INTO tags (tagname) VALUES ($1) RETURNING id',
        [tagName]
      )
      const result = await db.query(
        'UPDATE users SET tags = array_append(tags, $1) WHERE id = $2',
        [tagId, userId]
      )
      console.log(result)
    }
    res.status(201).json({})
  } catch (err) {
    console.log(err)
    res.status(400).json({ err: 'bad request' })
  }
}) */

module.exports = chatsRouter