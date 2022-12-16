const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const db = require('../db/index')
const format = require('pg-format')

usersRouter.get('/', async (request, response) => {
  const data = await db.query('SELECT * FROM users ORDER BY id')
  response.json({ data })
})

usersRouter.post('/', async (request, response) => {
  const data = request.body
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const sanitizedEmail = data.email.toLowerCase()

  // const query = await db.query(
  //   'INSERT INTO users(username, firstname, lastname, age) VALUES ($1, $2, $3, $4) RETURNING *',
  //   [data.username, data.firstname, data.lastname, data.age]
  // )

  const results = await db.query(
    'INSERT INTO users (firstname, lastname, username, age, gender_identity, gender_interest, tags, bio, city, country, password, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *', // changed the token in the Table to null for now, before we assign an actual automatically generated token
    [
      data.firstname,
      data.lastname,
      data.username,
      data.age,
      data.gender_identity,
      data.gender_interest,
      data.tags,
      data.bio,
      data.city,
      data.country,
      hashedPassword,
      sanitizedEmail,
    ]
  )
  response.status(200).json({ results })
})

usersRouter.put('/:id/:field', async (request, response) => {
  const id = request.params.id
  const field = request.params.field
  const data = request.body

  // Using pg-format to dynamically update column securely
  // %I stands for identifier, %L is literal, %s would just be a string
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
