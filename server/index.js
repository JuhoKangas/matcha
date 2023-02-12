const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const { Server } = require("socket.io");
const io = new Server(server);

/* const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
}) */

// check the socket connection form client
io.on('connection', (socket) => {
	console.log("Connected with socket id", socket.id)
	socket.on('join-room', (userId) => {
		console.log("user joined room", userId)
		socket.join(userId)
	})
})

const PORT = config.PORT || 3001

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
