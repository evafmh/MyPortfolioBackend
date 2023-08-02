const express = require('express')
const mailRouter = require('./Routes/mail')
const cors = require('cors'); // Import the cors package

const app = express()

// Add cors middleware to allow requests from the frontend domain
app.use(cors({
  origin: 'https://evafmh.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Permissions-Policy'],
}));

// Traitement des requêtes et réponses
app.use(express.json())

// Route pour envoyer l'e-mail
app.use('/api', mailRouter)

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site !')
})


module.exports = app
