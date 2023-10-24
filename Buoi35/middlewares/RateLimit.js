const rateLimit = require('express-rate-limit');
module.exports = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    handler: function (req, res) {
            res.status(429).send({
                status: 500,
                message: 'Too many requests!',
            });
    },

});