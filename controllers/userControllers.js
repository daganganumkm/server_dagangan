const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  getAll: async(req, res) => {
    console.log('masuk')
    try {
      let users = await User.find()
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  getOne: async(req, res) => {
    try {
      let user = await User.findById(req.params.id)
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
      var token = jwt.sign({ id: userSignup._id }, process.env.SECRET_TOKEN)
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

        var token = jwt.sign({ id: userLogin._id }, process.env.SECRET_TOKEN)
        res.send({ auth: true, token })
      })
    } catch (error) {
      res.status(401).send({auth: false, message: 'username not found'})
    }
  },
  edit: async(req, res) => {
    try {
      let userEdit = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
      res.send({status: 'edit data success', userEdit})
    } catch (error) {
      res.status(500).send(error)
    }
  },
  remove: async(req, res) => {
    try {
      let userRemove = await User.findByIdAndRemove(req.params.id)
      res.send({status: 'remove success', userRemove})
    } catch (error) {
      res.status(500).send(error)
    }
  }
}