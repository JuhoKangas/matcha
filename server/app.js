const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const settingsRouter = require('./controllers/settings')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Modular routing
app.use('/users', usersRouter)
app.use('/settings', settingsRouter)
app.use('/login', loginRouter)

app.use(middleware.authenticateJWT)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
