const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

loginRouter.get('/', (request, response) => {
  response.status(200).send({ msg: 'hello' })
})

module.exports = loginRouter
