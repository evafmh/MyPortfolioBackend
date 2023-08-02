const express = require('express')
const mailRouter = require('./Routes/mail')
const cors = require('cors'); // Import the cors package

const app = express()

// Add cors middleware to allow requests from the frontend domain
app.use(cors({
  origin: 'https://evafmh.github.io/MyPortfolio',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Permissions-Policy'],
}));

// Traitement des requêtes et réponses
app.use(express.json())

// // Éviter les problèmes de CORS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//     )
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//     )
//     next()
// })

// Route pour envoyer l'e-mail
app.use('/api', mailRouter)

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site !')
})

module.exports = app
