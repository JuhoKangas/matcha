const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const db = require('../db/index')

authRouter.get('/', async (request, response) => {
  const authCookie = request.cookies.authorization
  if (authCookie) {
    const decryptedJwtToken = jwt.verify(authCookie, process.env.SECRET)
    response.json(decryptedJwtToken)
  }
  response.end()
})

module.exports = authRouter
