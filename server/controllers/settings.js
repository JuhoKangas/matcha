const settingsRouter = require('express').Router()
const db = require('../db/index')
const bcrypt = require('bcrypt')
const { authenticateJWT } = require('../utils/middleware')

settingsRouter.put('/', async (req, res) => {
  const formData = req.body
  let hashedPassword = ''
  if (formData.password !== '') {
    hashedPassword = await bcrypt.hash(formData.password, 10)
  }
  const sanitizedEmail = formData.email.toLowerCase()

  try {
    const results =
      hashedPassword !== ''
        ? await db.query(
            'UPDATE users SET firstname = $1, lastname = $2, username = $3, age = $4, gender_identity = $5, gender_interest = $6, bio = $7, city = $8, country = $9, password = $10, email = $11, profile_picture = $12 WHERE id = $13 returning *',
            [
              formData.firstname,
              formData.lastname,
              formData.username,
              formData.age,
              formData.genderIdentity,
              formData.genderInterest,
              formData.bio,
              formData.city,
              formData.country,
              hashedPassword,
              sanitizedEmail,
              formData.profilePicture,
              formData.id,
            ]
          )
        : await db.query(
            'UPDATE users SET firstname = $1, lastname = $2, username = $3, age = $4, gender_identity = $5, gender_interest = $6, bio = $7, city = $8, country = $9, email = $10, profile_picture = $11 WHERE id = $12 returning *',
            [
              formData.firstname,
              formData.lastname,
              formData.username,
              formData.age,
              formData.genderIdentity,
              formData.genderInterest,
              formData.bio,
              formData.city,
              formData.country,
              sanitizedEmail,
              formData.profilePicture,
              formData.id,
            ]
          )

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: results.rows[0].id,
          firstname: results.rows[0].firstname,
          lastname: results.rows[0].lastname,
          username: results.rows[0].username,
          age: results.rows[0].age,
          genderIdentity: results.rows[0].gender_identity,
          genderInterest: results.rows[0].gender_interest,
          bio: results.rows[0].bio,
          city: results.rows[0].city,
          country: results.rows[0].country,
          email: results.rows[0].email,
          profilePicture: results.rows[0].profile_picture,
        },
        //results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = settingsRouter
