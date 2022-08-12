const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError} = require('../errors')


const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ token:user.generateToken(), user: { name: user.getName() } })
}
const login = async (req, res) => {
    res.send('Login user')
}


module.exports = {register, login}