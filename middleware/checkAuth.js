const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

module.exports = {
  isLogin: (req, res, next) => {
    jwt.verify(req.headers.access_token, process.env.SECRET_TOKEN, function(err, decoded) {
      if(err) return res.status(401).send({auth: false, message: 'access denied!!'})
      
      req.userLogin = decoded
      next()
    })
  },
  isAdmin: async(req, res, next) => {
    try {
      let user = await User.findById(req.userLogin.id)
      if(user.role !== 'admin') return res.status(401).send({auth: false, message: 'access denied!!'})
      next()
    } catch (error) {
      res.status(401).send({auth: false, message: 'access denied!!'})
    }
  },
  isOwn: async(req, res, next) => {
    if(req.params.id === req.userLogin.id) return next()
    res.status(401).send({auth: false, message: 'access denied!!'})    
  }
}