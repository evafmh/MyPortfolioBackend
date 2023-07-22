const nodemailer = require('nodemailer')
const validator = require('validator')

// Function to send an email
exports.sendEmail = (req, res) => {
    console.log(req.body)
    const { name, email, message } = req.body

    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Message:', message)

    //Validate input

    if (!validator.isEmail(email)) {
        return res
            .status(400)
            .json({ error: 'Please provide a valid email address' })
    }

    if (name.length > 80) {
        return res
            .status(400)
            .json({ error: 'Name should not exceed 80 characters' })
    }

    if (message.length > 4000) {
        return res
            .status(400)
            .json({ error: 'Message should not exceed 4000 characters' })
    }

    // Configuration for Nodemailer to send the email
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASSWORD,
        },
    })

    // Email options
    const mailOptions = {
        from: process.env.OUTLOOK_EMAIL,
        to: 'eva.famechon@outlook.com',
        subject: `Portfolio Contact ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error while sending the email')
        } else {
            console.log('Email sent: ' + info.response)
            res.send('Email sent successfully')
        }
    })
}