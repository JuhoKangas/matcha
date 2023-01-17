const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db/index')

loginRouter.post('/', async (req, res) => {
  const { email, password, coordinates } = req.body

  const data = await db.query('SELECT * FROM users WHERE email = $1', [email])
  const user = data.rows[0]

  if (!user) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  //comment out if manually created user (due to password not being hashed)
  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  if (coordinates) {
    const updatedCoordinates = await db.query(
      'UPDATE users SET latitude = $1, longitude = $2 WHERE id = $3 RETURNING latitude, longitude',
      [coordinates.lat, coordinates.lon, user.id]
    )
    console.log('coordinates updated to:', updatedCoordinates.rows[0])
  } else {
    console.log('coordinates not updated')
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  //res.status(200).send({ token, username: user.username, id: user.id })
  res
    .status(200)
    .cookie('authorization', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    })
    .send({ username: user.username, id: user.id })
})

module.exports = loginRouter
