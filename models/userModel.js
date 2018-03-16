const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {type: String, required: true, index: { unique: true }},
  phone: {type: String, required: true, index: { unique: true }},
  gender: String,
  birth: String,
  role: {type: String, required: true},
  username: {type: String, required: true, index: { unique: true }},
  password: {type: String, required: true}
})

const User = mongoose.model('User', userSchema)

module.exports = User