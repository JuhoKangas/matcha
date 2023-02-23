const photosRouter = require('express').Router()
const db = require('../db/index')
const { v4: uuidv4 } = require('uuid')

photosRouter.get('/:id', async (req, res) => {
  const userId = req.params.id

  const photos = await db.query('SELECT * FROM photos WHERE user_id = $1', [
    userId,
  ])

  console.log(photos)

  res.status(200).json({ photos: photos })
})

photosRouter.post('/', async (req, res) => {
  const userPhoto = req.body
  console.log(userPhoto)

  /* 	const photoName = uuidv4()
	const finalPhotoName = `${photoName}.jpg` */
  try {
    const result = await db.query(
      'INSERT INTO photos (user_id, photo) VALUES ($1, $2) returning *',
      [userPhoto.userId, userPhoto.photo]
    )

    const photosData = await db.query(
      'SELECT photo FROM photos WHERE user_id = $1',
      [userPhoto.userId]
    )
    const photos = photosData.rows

    res.status(200).json({
      status: 'success',
      result,
      photos: photos,
    })
  } catch (err) {
    console.log(err)
  }
})

photosRouter.post('/delete', async (req, res) => {
  const photoName = req.body

  try {
    const result = await db.query(
      'DELETE FROM photos WHERE photo = $1 returning *',
      [photoName.photoName]
    )

    const photosData = await db.query(
      'SELECT photo FROM photos WHERE user_id = $1',
      [photoName.userId]
    )
    const photos = photosData.rows

    res.status(200).json({
      status: 'success',
      photos: photos,
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = photosRouter
