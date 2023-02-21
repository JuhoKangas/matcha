const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const sendEmail = (type, email, token, id, reported) => {
  let subject = ''
  let html = ''
  let to = ''
  if (type === 'activate') {
    subject = 'Matcha account activation'
    to = email
    html = `<h1>Welcome to Matcha</h1><br/><p>Click <a href="http://localhost:3001/activate/${token}">here</a> to activate your account!</p><br/><br/><br/><small>Please reply to this email, we are very lonely in the data center</small>`
  }

  const mailOptions = {
    from: 'matchateam7@gmail.com',
    to: email,
    subject: subject,
    html: html,
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent: ', info.response)
    }
  })
}

module.exports = {
  sendEmail,
}
