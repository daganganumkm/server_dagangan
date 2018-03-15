const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

module.exports = {
  isLogin: (req, res, next) => {
    jwt.verify(req.headers.access_token, process.env.SECRET_TOKEN, function(err, decoded) {
      if(err) {
        res.status(401).send({auth: false, message: 'access denied!!'})
      } else {
        req.userLogin = decoded
        console.log(req.userLogin)
        next()
      }
    })
  },
  isAdmin: (req, res, next) => {

  },
  isOwn: (req, res, next) => {

  }
}