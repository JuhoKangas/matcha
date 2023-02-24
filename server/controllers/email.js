const emailRouter = require('express').Router()
const db = require('../db/index')
const { sendEmail } = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

emailRouter.get('/get/:email', async (req, res) => {
  const email = req.params.email

  try {
    const userFound = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])

    res.status(200).json({ userFound: userFound.rowCount })
  } catch (e) {
    console.log('Error fetching email')
  }
})

emailRouter.get('/:email', async (req, res) => {
  const email = req.params.email
  try {
    const userFound = await db.query(
      'SELECT username, id FROM users WHERE email = $1',
      [email]
    )

    if (userFound.rowCount === 1) {
      // Create reset token for the user

      const token = jwt.sign(email, process.env.SECRET)

      const updateToken = await db.query(
        'UPDATE users SET token = $1 WHERE id = $2',
        [token, userFound.rows[0].id]
      )

      if (updateToken.rowCount === 1) {
        sendEmail('reset', email, token, 0, 0)
      } else {
        throw 'Something went wrong'
      }

      res.status(200).json({ userFound })
    } else {
      res.status(200).json({ error: 'User not found' })
    }
  } catch (e) {
    console.log(e)
    res.status(200).json({ error: 'something went wrong, please try again' })
  }
})

emailRouter.get('/token/:token', async (req, res) => {
  const token = req.params.token
  const tokenFound = await db.query(
    'SELECT username, id FROM users WHERE token = $1',
    [token]
  )

  if (tokenFound.rowCount === 1) {
    res.status(200).json({ tokenFound })
  } else {
    res.status(200).json({ error: 'invalid token' })
  }
})

emailRouter.post('/password', async (req, res) => {
  const { password, id, token } = req.body
  try {
    const encryptedPassword = await bcrypt.hash(password, 10)

    const response = await db.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [encryptedPassword, id]
    )

    const usedToken = await db.query('SELECT * FROM users WHERE token = $1', [
      token,
    ])

    if (usedToken.rowCount === 0) {
      return res.status(200).json({ error: 'token was already used' })
    }

    const resetToken = await db.query(
      'UPDATE users SET token = 0 WHERE id = $1',
      [id]
    )

    if (response.rowCount === 1 && resetToken.rowCount === 1) {
      res.status(200).json({ msg: 'Password Changed!' })
    } else {
      throw 'Something went horribly wrong'
    }
  } catch (e) {
    console.log(e)
    res.send({ error: 'something went wrong!' })
  }
})

module.exports = emailRouter
