const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('express-async-errors')
const usersRouter = require('express').Router()
const db = require('../db/index')
const format = require('pg-format')

usersRouter.get('/', async (request, response) => {
  const data = await db.query('SELECT * FROM users')
  response.status(200).send({ msg: data.rows })
})

usersRouter.post('/', async (request, response) => {
  const data = request.body
  const query = await db.query(
    'INSERT INTO users(username, firstname, lastname, age) VALUES ($1, $2, $3, $4) RETURNING *',
    [data.username, data.firstname, data.lastname, data.age]
  )
  response.status(200).send(query.rows[0])
})

usersRouter.put('/:id/:field', async (request, response) => {
  const id = request.params.id
  const field = request.params.field
  const data = request.body

  // Using pg-format to dynamically update column securely
  const query = await db.query(
    format(
      'UPDATE users SET %I = %L WHERE id = %L RETURNING *',
      field,
      data[field],
      id
    )
  )
  response.status(200).send(query.rows[0])
})

usersRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const query = await db.query('DELETE FROM users WHERE id = $1', [id])
  response.status(204).end()
})

module.exports = usersRouter
