const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  stock: String,
  description: String,
  price: {type: String, required: true},
  weight: {type: String, required: true},
  image: String,
  date: String,
  categoryId: String,
  storeId: String,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product