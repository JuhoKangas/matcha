const settingsRouter = require('express').Router()
const db = require('../db/index')
const bcrypt = require('bcrypt')

settingsRouter.put('/', async (req, res) => {
  const formData = req.body.formData
  const hashedPassword = await bcrypt.hash(formData.password, 10)
  const sanitizedEmail = formData.email.toLowerCase()

  try {
    const results = await db.query(
      'UPDATE users SET firstname = $1, lastname = $2, username = $3, age = $4, gender_identity = $5, gender_interest = $6, bio = $7, city = $8, country = $9, password = $10, email = $11 WHERE id = $12 returning *',
      [
        formData.first_name,
        formData.last_name,
        formData.user_name,
        formData.age,
        formData.gender_identity,
        formData.gender_interest,
        formData.bio,
        formData.city,
        formData.country,
        hashedPassword,
        sanitizedEmail,
        formData.id,
      ]
    )
    console.log(results)
    res.status(200).json({
      status: 'success',
      data: {
        user: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = settingsRouter
