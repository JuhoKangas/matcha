const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const db = require('../db/index')
const geoip = require('geoip-lite')

usersRouter.get('/', async (request, response) => {
  const data = await db.query(
    'SELECT id, firstname, lastname, username, age, city, country, bio, gender_identity AS "genderIdentity", gender_interest AS "genderInterest", profile_picture AS "profilePicture", latitude, longitude, active, fame, last_seen AS "lastSeen", online, tags, completed FROM users'
  )
  response.json({ data })
})

usersRouter.get('/:id', async (request, response) => {
  const data = await db.query('SELECT * FROM users WHERE id = $1', [
    request.params.id,
  ])
  const user = data.rows[0]
  response.json({
    ...user,
    profilePicture: user.profile_picture,
    //NOT SURE IF THIS AFFECTS ANYTHING... WHRE IS THIS USED >.<
    // genderIdentity: user.gender_identity,
    // genderInterest: user.gender_interest,
  })
})

usersRouter.get('/getSelectedPhotos', async (request, response) => {
	const userId = req.body
	console.log("User id is THIS", userId)
	try {
		const photosData = await db.query(
      'SELECT photo FROM photos WHERE user_id = $1',
      [userId]
    )
    const photos = photosData.rows

    res.status(200).json({
      status: 'success',
      photos: photos,
    })
	} catch (err) {
    console.log(err)
  }
})

usersRouter.get('/user/:username', async (req, res) => {
	const username = req.params.username
	try {
		const user = await db.query('SELECT username, online, firstname, lastname, fame, age, city, country, latitude, longitude FROM users WHERE username = $1', [username])
		response.status(200).json({ user })
	} catch (e) {
		console.log(e)
	}
})

usersRouter.post('/', async (request, response) => {
  const data = request.body
  if (
    data.password &&
    data.ip &&
    data.email &&
    data.firstname &&
    data.lastname &&
    data.username &&
    data.age &&
    data.city &&
    data.country
  ) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const sanitizedEmail = data.email.toLowerCase()
      const location = await geoip.lookup(data.ip)
      const latitude = location.ll[0]
      const longitude = location.ll[1]

      const results = await db.query(
        'INSERT INTO users (firstname, lastname, username, age, city, country, password, email, ip, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id, firstname, lastname, username, age, city, country, bio, gender_identity AS "genderIdentity", gender_interest AS "genderInterest", profile_picture AS "profilePicture", latitude, longitude, active, fame, last_seen AS "lastSeen", online, tags, completed', // changed the token in the Table to null for now, before we assign an actual automatically generated token
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
      response.status(201).json({ results }) //HERE
    } catch (err) {
      console.log(err)
    }
  } else {
    response.status(400).json({ msg: 'bad request' })
  }
})

usersRouter.put('/setup', async (request, response) => {
  const data = request.body
  if (
    data.genderIdentity &&
    data.genderInterest &&
    data.bio &&
    data.tags &&
    data.profilePicture &&
    data.id
  ) {
    try {
      const results = await db.query(
        "UPDATE users SET gender_identity = $1, gender_interest = $2, bio = $3, tags = $4, profile_picture = $5, completed = 'yes' WHERE id = $6 returning id, username, firstname, lastname, email, age, gender_identity, gender_interest, tags, bio, city, country, active, fame, online, latitude, longitude, profile_picture",
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
  } else {
    response.status(400).json({ err: 'bad request' })
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
