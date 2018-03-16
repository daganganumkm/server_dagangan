const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellerSchema = new Schema({
  store_name: String,
  email: String,
  owner_name: String,
  phone: String,
  username: String,
  password: String
})

const User = mongoose.model('User', sellerSchema)

module.exports = User