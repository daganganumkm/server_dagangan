const jwt = require('jsonwebtoken')

module.exports = {
  isLogin: (req, res, next) => {
    // check user is logged in
    jwt.verify(req.headers.access_token, process.env.SECRET_TOKEN, function(err, decoded) {
      if(err) return res.status(401).send({auth: false, message: 'access denied!!'})
      req.userLogin = decoded
      next()
    })
  },
  isAdmin: (req, res, next) => {
    // check user role is 'admin'
    if(req.userLogin.role !== 'admin') return res.status(401).send({auth: false, message: 'access denied!!'})
    next()
  }
}