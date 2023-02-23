const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

authRouter.get('/', async (request, response) => {
  const authCookie = request.cookies.authorization
  if (authCookie) {
    const decryptedJwtToken = jwt.verify(authCookie, process.env.SECRET)
    response.json(decryptedJwtToken)
  }
  response.end()
})

module.exports = authRouter
