const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db/index')
const geoip = require('geoip-lite')

loginRouter.post('/check', async (req, res) => {
  const { username, password } = req.body

  const data = await db.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  const user = data.rows[0]

  if (!user) {
    return res.status(200).json({
      error: 'invalid username or password',
    })
  }

  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    return res.status(200).json({
      error: 'invalid username or password',
    })
  }

  if (user.active === 0) {
    return res.status(200).json({
      error: 'Email is not yet activated',
    })
  }

  return res.status(200).json({ msg: 'user found' })
})

loginRouter.post('/', async (req, res) => {
  const { username, password, coordinates, userIP } = req.body

  const data = await db.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  const user = data.rows[0]

  if (!user) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const photosData = await db.query(
    'SELECT photo FROM photos WHERE user_id = $1',
    [user.id]
  )
  const photos = photosData.rows

  if (coordinates) {
    const updatedCoordinates = await db.query(
      'UPDATE users SET latitude = $1, longitude = $2 WHERE id = $3 RETURNING latitude, longitude',
      [coordinates.lat, coordinates.lon, user.id]
    )
    console.log('coordinates updated to:', updatedCoordinates.rows[0])
  } else {
    const location = geoip.lookup(userIP)
    const updatedCoordinates = await db.query(
      'UPDATE users SET latitude = $1, longitude = $2 WHERE id = $3 RETURNING latitude, longitude',
      [location.ll[0], location.ll[1], user.id]
    )
    console.log('coordinates updated to:', updatedCoordinates.rows[0])
  }

  db.query('UPDATE users SET online = 1, token = 0 WHERE username = $1', [
    username,
  ])
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .cookie('authorization', token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      sameSite: 'none',
      secure: true,
    })
    .send({
      ...user,
      genderIdentity: user.gender_identity,
      genderInterest: user.gender_interest,
      profilePicture: user.profile_picture,
      photos: photos,
      password: '',
    })
})

module.exports = loginRouter
