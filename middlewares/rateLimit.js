const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: 'Too many attempts, please try again in a few minutes.',
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many attempts, please try again in a few minutes.',
        })
    },
})

module.exports = limiter
