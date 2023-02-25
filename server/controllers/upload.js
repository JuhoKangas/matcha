const uploadRouter = require('express').Router()
const { upload } = require('../utils/uploadPhoto')

uploadRouter.post('/', upload.single('profile'), async (req, res) => {
  if (!req.file) {
    res.status(200).json({ error: 'Wrong filetype' })
  } else {
    res.status(200).json({ filename: req.file.filename })
  }
})

module.exports = uploadRouter
