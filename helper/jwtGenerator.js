const jwt = require('jsonwebtoken')

module.exports = function (userData) {
  return jwt.sign(userData, process.env.SECRET_TOKEN)
}