const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../helper/jwtGenerator')

module.exports = {
  getAll: async(req, res) => {
    try {
      let users = await User.find()
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  getOne: async(req, res) => {
    try {
      let user = await User.findById(req.userLogin.id)
      res.send(user)
    } catch (error) {
      res.status(500).send(error)      
    }
  },
  signup: async(req, res) => {
    try {
      let hashedPasswd = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hashedPasswd
      req.body.role = req.body.role || 'customer'
      let userSignup = await User.create(req.body)
      var token = jwtGenerator({id: userSignup._id, role: userSignup.role})
      res.send({ auth: true, token })
    } catch (error) {
      res.status(500).send({ message: 'There was a problem registering the user', error })
    }
  },
  login: async(req, res) => {
    try {
      let userLogin = await User.findOne({username: req.body.username})
      bcrypt.compare(req.body.password, userLogin.password, function(err, response) {
        if(err) return res.status(401).send({auth: false, message: 'incorrect input password'})
        var token = jwtGenerator({id: userLogin._id, role: userLogin.role})
        res.send({ auth: true, token })
      })
    } catch (error) {
      res.status(401).send({auth: false, message: 'username not found'})
    }
  },
  edit: async(req, res) => {
    try {
      let userEdit = await User.findByIdAndUpdate(req.userLogin.id, req.body, {new: true})
      res.send({status: 'user data edited', userEdit})
    } catch (error) {
      res.status(500).send(error)
    }
  },
  remove: async(req, res) => {
    try {
      let userRemove = await User.findByIdAndRemove(req.params.id)
      res.send({status: 'user data removed', userRemove})
    } catch (error) {
      res.status(500).send(error)
    }
  }
}