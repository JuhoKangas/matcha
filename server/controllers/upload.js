const uploadRouter = require('express').Router()
const { upload } = require('../utils/uploadPhoto')

uploadRouter.post('/', upload.single('profile'), async (req, res) => {
  res.json({ filename: req.file.filename })
})

module.exports = uploadRouter
