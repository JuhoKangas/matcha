const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const settingsRouter = require('./controllers/settings')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Modular routing
app.use('/users', usersRouter)
app.use('/settings', settingsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
