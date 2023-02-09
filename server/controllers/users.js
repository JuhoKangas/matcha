const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const db = require('../db/index')
const geoip = require('geoip-lite')

usersRouter.get('/', async (request, response) => {
  const data = await db.query('SELECT * FROM users ORDER BY id')
  response.json({ data })
})

usersRouter.get('/getOne', async (request, response) => {
	try {
		const data = await db.query(
			'SELECT username, age, gender_identity, gender_interest, bio, tags, city, country, fame, profile_picture FROM users WHERE id = $1',
			[request.query.userId]
		)

		const userInfo = data.rows[0]

		res.status(200).json({
      status: 'success',
      result,
      userInfo: userInfo,
    })
	} catch (err) {
    console.log(err)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const data = request.body
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const sanitizedEmail = data.email.toLowerCase()
    const location = await geoip.lookup(data.ip)
    const latitude = location.ll[0]
    const longitude = location.ll[1]

    const results = await db.query(
      'INSERT INTO users (firstname, lastname, username, age, city, country, password, email, ip, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *', // changed the token in the Table to null for now, before we assign an actual automatically generated token
      [
        data.firstname,
        data.lastname,
        data.username,
        data.age,
        data.city,
        data.country,
        hashedPassword,
        sanitizedEmail,
        data.ip,
        latitude,
        longitude,
      ]
    )
    response.status(201).json({ results })
  } catch (err) {
    console.log(err)
  }
})

usersRouter.put('/setup', async (request, response) => {
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
})

module.exports = usersRouter
