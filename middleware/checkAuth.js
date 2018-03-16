const jwt = require('jsonwebtoken')

module.exports = {
  isLogin: (req, res, next) => {
    jwt.verify(req.headers.access_token, process.env.SECRET_TOKEN, function(err, decoded) {
      if(err) return res.status(401).send({auth: false, message: 'access denied!!'})
      
      req.userLogin = decoded
      console.log(req.userLogin)
      next()
    })
  },
  isAdmin: (req, res, next) => {
    if(req.userLogin.role !== 'admin') return res.status(401).send({auth: false, message: 'access denied!!'})
    next()
  },
  isOwn: (req, res, next) => {
    if(req.params.id === req.userLogin.id) return next()
    res.status(401).send({auth: false, message: 'access denied!!'})    
  }
}