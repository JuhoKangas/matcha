const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const db = require('./db/index')

const server = http.createServer(app)

/* const { Server } = require("socket.io");
const io = new Server(server); */

const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
})

// check the socket connection form client
io.on('connection', (socket) => {
	socket.on('join-room', (userId) => {
		socket.join(userId)
	})
	// send message only to users who are in the current chat
	socket.on('send-message', (message) => {
		io.to(message.user1).to(message.user2).emit('receive-message', message)
	})

	socket.on('clear-unread-messages', (data) => {
		io.to(data.user1).to(data.user2).emit('unread-messages-cleared', data)
	})

	socket.on('notification', (data) => {
		console.log('ONE IN SERVER')
		try {
			db.query('INSERT INTO notifications (sender, recipient, message) VALUES ($1, $2, $3)', [data.user1, data.user2, data.content])
		} catch (err) {
			console.log(err)
		}
		data.type === 1 && io.emit('show-notification', data)
		data.type === 2 && io.emit('show-msg-notification', data)
	})
})

const PORT = config.PORT || 3001

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
