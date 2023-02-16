const uploadRouter = require('express').Router()
const { upload } = require('../utils/uploadPhoto')

uploadRouter.post('/', upload.single('profile'), async (req, res) => {
  console.log(req.file.filename)
  res.end()
})

module.exports = uploadRouter
