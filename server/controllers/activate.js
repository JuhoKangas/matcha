const activateRouter = require('express').Router()
const db = require('../db/index')

activateRouter.get('/:token', async (req, res) => {
  const token = req.params.token
  const user = await db.query(
    'SELECT username, active, id FROM users WHERE token = $1',
    [token]
  )
  if (user.rows[0] && user.rows[0].active === 0) {
    const updateDb = await db.query(
      'UPDATE users SET active = 1 WHERE token = $1',
      [token]
    )
    if (updateDb.rowCount > 0) {
      await db.query('UPDATE users set token = 0 WHERE id = $1', [
        user.rows[0].id,
      ])
      res.send(
        `<h1>Hey ${user.rows[0].username}! Your account is now activated</h1><br/><p>Go back to <a href="http://localhost:3000/login">login</a></p>`
      )
    } else {
      res.send('Something went wrong')
    }
  } else {
    res.send('<p>Error: Invalid token</p>')
  }
})

module.exports = activateRouter
