const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authorizatiom Token not provided')
    }
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: decoded.userId, username: decoded.username };
        next()
    } catch (error) {
        throw new UnauthenticatedError("Not Authorized");
    }
}

module.exports = authenticationMiddleware;