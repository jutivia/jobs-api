const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcryptjs = require("bcryptjs");


const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ token:user.generateToken(), user: { name: user.getName() } })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Kindly provide an email and password")
    }
    const user = await User.findOne({ email })
    if (!user) throw new UnauthenticatedError('User Not Found');

    const matched = await user.comparePassword(password);
    if (!matched) throw new UnauthenticatedError("Email - Password mismatch");
      res
        .status(StatusCodes.OK)
        .json({ token: user.generateToken(), user: { name: user.getName() } });
}


module.exports = {register, login}