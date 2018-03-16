const jwt = require('jsonwebtoken')

module.exports = function (userData) {
  // helper function to generate jwt sign
  return jwt.sign(userData, process.env.SECRET_TOKEN)
}