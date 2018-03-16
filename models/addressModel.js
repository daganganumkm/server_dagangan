const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
  street: {type: String, required: true},
  subDistrict: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zipcode: {type: String, required: true},
  country: {type: String, required: true},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', index: {unique: true}},
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address