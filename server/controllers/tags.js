const db = require('../db/index')
const tagsRouter = require('express').Router()

tagsRouter.get('/', async (req, res) => {
  try {
    const tags = await db.query('SELECT * FROM tags')
    res.status(200).json({ tags })
  } catch (err) {
    console.log(err)
  }
})

tagsRouter.post('/', async (req, res) => {
  const tag = req.body.tag
  try {
    const result = await db.query(
      'INSERT INTO tags (tagname) VALUES ($1) RETURNING *',
      [tag]
    )
    res.status(201).json({ result })
  } catch (err) {
    console.log('tag already exists')
    const result = await db.query('SELECT * FROM tags WHERE tagname = $1', [
      tag,
    ])
    res.status(200).json({ result })
  }
})

module.exports = tagsRouter
