const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const sendEmail = (type, email, token, id, reportedId) => {
  let subject = ''
  let html = ''
  let to = ''
  if (type === 'activate') {
    subject = 'Matcha account activation'
    to = email
    html = `<h1>Welcome to Matcha</h1><br/><p>Click <a href="http://localhost:3001/activate/${token}">here</a> to activate your account!</p><br/><br/><br/><small>Please reply to this email, we are very lonely in the data center</small>`
  } else if (type === 'reset') {
    subject = 'Password reset'
    to = email
    html = `<h1>Your password has been reset</h1><p>Follow <a href="http://localhost:3000/reset_password?token=${token}">this link</a> to reset your password</p><br><br><p>If you did not request this, just ignore this email</p>`
  } else if (type === 'report') {
    subject = 'Reported fake account'
    to = email
    html = `<h1>A user reported a fake account</h1><p>User with id "${id}" has reported the account with id "${reportedId}" as fake.</p><br><br><p>Time to investigate.</p>`
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
