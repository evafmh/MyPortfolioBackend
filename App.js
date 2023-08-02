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


//Test certificat
function approveDomains(opts, certs, cb) {
  opts.domains = ['https://evafmh-backend.cyclic.cloud/']; // Remplacez "votre-domaine.com" par votre nom de domaine réel
  opts.email = "medinasia_x@hotmail.fr"; // Remplacez "votre-email@example.com" par votre adresse e-mail
  opts.agreeTos = true;
  cb(null, { options: opts, certs: certs });
}

// Importez les modules nécessaires pour Let's Encrypt
const lex = require('letsencrypt-express').create({
  // NOTE : Le serveur devrait être défini sur 'staging' lors des tests
  server: 'https://acme-v01.api.letsencrypt.org/directory',
  challenges: {
    'tls-sni-01': require('le-challenge-sni').create({ webrootPath: '~/letsencrypt/var/acme-challenges' })
  },
  challengeType: 'tls-sni-01',
  store: require('le-store-certbot').create({
    configDir: '/etc/letsencrypt',
    privkeyPath: ':configDir/live/:hostname/privkey.pem',
    fullchainPath: ':configDir/live/:hostname/fullchain.pem',
    certPath: ':configDir/live/:hostname/cert.pem',
    chainPath: ':configDir/live/:hostname/chain.pem',
    workDir: '/var/lib/letsencrypt',
    logsDir: '/var/log/letsencrypt',
    webrootPath: '~/letsencrypt/srv/www/:hostname/.well-known/acme-challenge',
    debug: false
  }),
  approveDomains: approveDomains // Assurez-vous de définir correctement cette fonction
});

// Configuration pour Let's Encrypt - gère acme-challenge et redirige vers HTTPS
require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
  console.log("Listening for ACME http-01 challenges on", this.address());
});

// Démarrer le serveur HTTPS en utilisant Let's Encrypt
require('https').createServer(lex.httpsOptions, app).listen(443, function () {
  console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});

module.exports = app
