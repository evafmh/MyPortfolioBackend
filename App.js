const express = require('express')
const mailRoutes = require('./Routes/mail')

const app = express()

// Traitement des requêtes et réponses
app.use(express.json())

// Éviter les problèmes de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
})

// Route pour envoyer l'e-mail
app.use('/api', mailRoutes)

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site !')
})

module.exports = app
