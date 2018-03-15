const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {type: String, required: true},
  phone: {type: String, required: true},
  gender: String,
  birth: String,
  role: String,
  username: {type: String, required: true},
  password: {type: String, required: true}
})

const User = mongoose.model('User', userSchema)

module.exports = User