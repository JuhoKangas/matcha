const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const db = require('../db/index')

usersRouter.get('/', async (request, response) => {
  const data = await db.query('SELECT * FROM users')
  response.status(200).send({ msg: data.rows })
})

usersRouter.post('/', async (request, response) => {
  const data = await db.query(
    'INSERT INTO users(username, firstname, lastname, age) VALUES ($1, $2, $3, $4) RETURNING *',
    [
      request.body.username,
      request.body.firstname,
      request.body.lastname,
      request.body.age,
    ]
  )
  response.status(200).send(data)
})

module.exports = usersRouter
