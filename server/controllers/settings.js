const settingsRouter = require("express").Router()
const db = require("../db/index")
const bcrypt = require("bcrypt")
const { authenticateJWT } = require("../utils/middleware")

settingsRouter.put("/", async (req, res) => {
  const formData = req.body
  let hashedPassword = ""
  if (formData.password !== "") {
    hashedPassword = await bcrypt.hash(formData.password, 10)
  }
  const sanitizedEmail = formData.email.toLowerCase()

  try {
    const results =
      hashedPassword !== ""
        ? await db.query(
            "UPDATE users SET firstname = $1, lastname = $2, username = $3, age = $4, gender_identity = $5, gender_interest = $6, bio = $7, city = $8, country = $9, password = $10, email = $11 WHERE id = $12 returning *",
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
              formData.id,
            ]
          )
        : await db.query(
            "UPDATE users SET firstname = $1, lastname = $2, username = $3, age = $4, gender_identity = $5, gender_interest = $6, bio = $7, city = $8, country = $9, email = $10 WHERE id = $11 returning *",
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
              formData.id,
            ]
          )

    console.log(results)
    res.status(200).json({
      status: "success",
      data: {
        user: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = settingsRouter
