const nodemailer = require('nodemailer')
const validator = require('validator')

// Function to send an email
exports.sendEmail = (req, res) => {
    const { name, email, message } = req.body
    const errors = [];

    // Validate input
    if (!validator.isEmail(email)) {
        errors.push('Please provide a valid email address');
    }

    if (name.length > 80) {
        errors.push('Name should not exceed 80 characters');
    }

    if (message.length > 4000) {
        errors.push('Message should not exceed 4000 characters');
    }

    // Return in case of errors
    if (errors.length > 0) {
        return res.status(400).json({ errors });
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
        to: process.env.REACT_APP_OUTLOOK_EMAIL,
        subject: `Portfolio Contact ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send('Error while sending the email')
        } else {
            res.send('Email sent successfully')
        }
    })
}