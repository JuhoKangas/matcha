const photosRouter = require('express').Router()
const db = require('../db/index')
const { v4: uuidv4 } = require('uuid');

photosRouter.post('/', async (req, res) => {
  const userPhoto = req.body
	const photoName = uuidv4()
	const finalPhotoName = `${photoName}.jpg`
  try {
    const result = await db.query(
      'INSERT INTO photos (user_id, photo) VALUES ($1, $2) returning *',
      [userPhoto.userId, finalPhotoName]
    )

    res.status(200).json({
      status: 'success',
      result,
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = photosRouter
