const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const usersRouter = require('./controllers/users')
const settingsRouter = require('./controllers/settings')
const loginRouter = require('./controllers/login')
const tagsRouter = require('./controllers/tags')
const photosRouter = require('./controllers/photos')
const authRouter = require('./controllers/auth')
const createUsersRouter = require('./controllers/createUsers')

//cookies
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Modular routing
app.use('/users', usersRouter)
app.use('/settings', settingsRouter)
app.use('/login', loginRouter)
app.use('/tags', tagsRouter)
app.use('/photos', photosRouter)
app.use('/auth', authRouter)
app.use('/createusers', createUsersRouter)

app.use(middleware.authenticateJWT)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

//cookies

module.exports = app
