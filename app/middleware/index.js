const { validationResult } = require('express-validator')

const end = ( req, res, next ) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(403).json(errors)
    }
    next()
}

module.exports = { end }