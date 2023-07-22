const express = require('express')
const router = express.Router()
const mailController = require('../Controllers/mailController')

// Route pour envoyer l'email
router.post('/sendEmail', mailController.sendEmail)

module.exports = router