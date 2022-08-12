const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please pass a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please pass an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please pass a password"],
    minlength: 6,
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
  next()
})

UserSchema.methods.getName = function () {
  return this.name
}
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { username: this.name, userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFE }
  );
  return token
};
module.exports = mongoose.model("User", UserSchema);