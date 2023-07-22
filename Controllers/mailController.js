const nodemailer = require('nodemailer')

// Fonction pour envoyer l'email
exports.sendEmail = (req, res) => {
    const { name, email, message } = req.body

    // Configuration de Nodemailer pour envoyer le mail
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASSWORD,
        },
    })

    // Options de l'email à envoyer
    const mailOptions = {
        from: process.env.OUTLOOK_EMAIL,
        to: 'eva.famechon@outlook.com',
        subject: `Portfolio Contact ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send("Erreur lors de l'envoi de l'email")
        } else {
            console.log('Email envoyé : ' + info.response)
            res.send('Email envoyé avec succès')
        }
    })
}