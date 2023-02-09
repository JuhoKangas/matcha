const db = require('../db/index')
const createUsersRouter = require('express').Router()
const userData = require('../utils/userData')
const bcrypt = require('bcrypt')

const getRandomNumber = (ceil) => {
  return Math.floor(Math.random() * ceil)
}

const getRandomMaleName = () => {
  const firstName =
    userData.maleFirstName[getRandomNumber(userData.maleFirstName.length)]
  return firstName
}

const getRandomFemaleName = () => {
  const firstName =
    userData.femaleFirstName[getRandomNumber(userData.femaleFirstName.length)]
  return firstName
}

const getRandomLastName = () => {
  const lastname = userData.lastName[getRandomNumber(userData.lastName.length)]
  return lastname
}

const getTags = () => {
  const tags = []
  while (tags.length < 5) {
    tags.push(userData.tags[getRandomNumber(userData.tags.length)])
  }
  return tags
}

const randomSign = (number) => {
  return Math.random() < 0.5 ? number * -1 : number
}

const gpsDeviation = () => {
  // 0.2 is around 22.2km of deviation
  return Math.random() * 0.2
}

const getLocation = () => {
  const index = getRandomNumber(userData.cities.length)
  const coord = userData.coordinates[index].split(' ')
  const location = {
    city: userData.cities[index],
    latitude: Number(coord[0]) + randomSign(gpsDeviation()),
    longitude: Number(coord[1]) + randomSign(gpsDeviation()),
  }
  return location
}

const getGenderinterest = (sex) => {
  const number = Math.random() // 0 - 1
  if (sex === 'male') {
    if (number < 0.6) {
      return 'female'
    } else if (number >= 0.6 && number < 0.8) {
      return 'male'
    } else {
      return 'everyone'
    }
  } else if (sex === 'female') {
    if (number < 0.6) {
      return 'male'
    } else if (number >= 0.6 && number < 0.8) {
      return 'female'
    } else {
      return 'everyone'
    }
  } else {
    if (number < 0.3) {
      return 'male'
    } else if (number >= 0.3 && number < 0.6) {
      return 'female'
    } else {
      return 'everyone'
    }
  }
}

const getRandomMale = async (index) => {
  const username = userData.usernames[index]
  const password = await bcrypt.hash('password', 10)
  const location = getLocation()
  const genderIdentity = Math.random() < 0.8 ? 'male' : 'other'

  const user = {
    username: username,
    firstName: getRandomMaleName(),
    lastName: getRandomLastName(),
    email: `${username}@example.com`,
    password: password,
    age: getRandomNumber(30) + 18,
    gender_identity: genderIdentity,
    gender_interest: getGenderinterest(genderIdentity),
    tags: getTags(),
    bio: "Life is a rollercoaster and I'm too short to ride",
    city: location.city,
    latitude: location.latitude,
    longitude: location.longitude,
    country: 'Finland',
    fame: getRandomNumber(100),
    profile_picture:
      userData.malePictures[
        getRandomNumber(userData.malePictures.length - 1) + 1
      ],
  }

  return user
}

const getRandomFemale = async (index) => {
  const username = userData.usernames[index]
  const password = await bcrypt.hash('password', 10)
  const location = getLocation()
  const genderIdentity = Math.random() < 0.8 ? 'female' : 'other'

  const user = {
    username: username,
    firstName: getRandomFemaleName(),
    lastName: getRandomLastName(),
    email: `${username}@example.com`,
    password: password,
    age: getRandomNumber(30) + 18,
    gender_identity: genderIdentity,
    gender_interest: getGenderinterest(genderIdentity),
    tags: getTags(),
    bio: "Life is a rollercoaster and I'm too short to ride",
    city: location.city,
    latitude: location.latitude,
    longitude: location.longitude,
    country: 'Finland',
    fame: getRandomNumber(100),
    profile_picture:
      userData.femalePictures[
        getRandomNumber(userData.femalePictures.length - 1) + 1
      ],
  }

  return user
}

createUsersRouter.get('/', async (req, res) => {
  for (const tag of userData.tags) {
    db.query('INSERT INTO tags (tagname) VALUES ($1) ON CONFLICT DO NOTHING', [
      tag,
    ])
  }

  for (let i = 0; i < userData.usernames.length; i++) {
    if (i < 250) {
      const user = await getRandomMale(i)
      db.query(
        `INSERT INTO users (username, firstname, lastname, email, password, age, gender_identity, gender_interest, tags, bio, city, country, fame, latitude, longitude, profile_picture)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [
          user.username,
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.age,
          user.gender_identity,
          user.gender_interest,
          user.tags,
          user.bio,
          user.city,
          user.country,
          user.fame,
          user.latitude,
          user.longitude,
          user.profile_picture,
        ]
      )
    } else {
      const user = await getRandomFemale(i)
      db.query(
        `INSERT INTO users (username, firstname, lastname, email, password, age, gender_identity, gender_interest, tags, bio, city, country, fame, latitude, longitude, profile_picture)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [
          user.username,
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.age,
          user.gender_identity,
          user.gender_interest,
          user.tags,
          user.bio,
          user.city,
          user.country,
          user.fame,
          user.latitude,
          user.longitude,
          user.profile_picture,
        ]
      )
    }
  }
  res.send('users created')
})

module.exports = createUsersRouter
