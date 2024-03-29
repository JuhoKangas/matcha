const messagesRouter = require('express').Router()
const db = require('../db/index')

messagesRouter.post('/', async (req, res) => {
  try {
    const data = req.body
    const result = await db.query(
      'INSERT INTO messages (text, sender, chat_id) VALUES ($1, $2, $3) returning *',
      [data.text, data.sender, data.chat]
    )
    const updateChat = await db.query(
      'UPDATE chats SET last_message_sender = $1 WHERE id = $2 returning last_message_sender',
      [data.sender, data.chat]
    )
    res.status(201).json({
      status: 'success',
      result,
    })
  } catch (err) {
    console.log(err)
  }
})

messagesRouter.put('/', async (req, res) => {
  try {
    const data = req.body
    const result = await db.query(
      'UPDATE chats SET last_message_text = $1, updated_at = CURRENT_TIMESTAMP, unread_messages = unread_messages + 1 WHERE id = $2 returning last_message_text, updated_at, unread_messages',
      [data.text, data.chat]
    )
    res.status(200).json({
      status: 'success',
      result,
    })
  } catch (err) {
    console.log(err)
  }
})

messagesRouter.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM messages WHERE chat_id = $1 ORDER BY id ASC',
      [req.query.selectedChatId]
    )
    const allMessages = result.rows
    res.status(200).json({
      status: 'success',
      messages: allMessages,
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = messagesRouter
