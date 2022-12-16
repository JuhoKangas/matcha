const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../db/index')

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await db.query('SELECT * FROM users WHERE email = $1', email)
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token, username: user.username, id: user.id })
})

// Todo: add test for using the authenticateJWT as middleware

module.exports = loginRouter
