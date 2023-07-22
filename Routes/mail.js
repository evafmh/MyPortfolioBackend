const express = require('express')
const mailRouter = express.Router() // Rename router to mailRouter
const mailController = require('../Controllers/mailController')
const limiter = require('../middlewares/rateLimit')

// Route for sending the email
mailRouter.post('/sendEmail', limiter, mailController.sendEmail)

module.exports = mailRouter;