const Seller = require('../models/sellerModel')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../helper/jwtGenerator')

module.exports = {
  getAll: async(req, res) => {
    // get all sellers data from database 'admin only'
    try {
      let sellers = await Seller.find(null, { password: 0 })
      res.send(sellers)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  getOne: async(req, res) => {
    // get seller logged in data from database 'owner only'
    try {
      let seller = await Seller.findById(req.sellerLogin.id, { password: 0 })
      res.send(seller)
    } catch (error) {
      res.status(500).send(error)      
    }
  },
  signup: async(req, res) => {
    // signup/create new seller data
    try {
      let hashedPasswd = bcrypt.hashSync(req.body.password, 10)
      req.body.password = hashedPasswd
      req.body.role = req.body.role || 'customer'
      let sellerSignup = await Seller.create(req.body)
      var token = jwtGenerator({id: sellerSignup._id, role: sellerSignup.role})
      res.send({ auth: true, token })
    } catch (error) {
      res.status(500).send({ message: 'There was a problem registering the seller', error })
    }
  },
  login: async(req, res) => {
    // login seller compare with data from database
    try {
      let sellerLogin = await Seller.findOne({username: req.body.sellername})
      bcrypt.compare(req.body.password, sellerLogin.password, function(err, response) {
        if(err) return res.status(401).send({auth: false, message: 'incorrect input password'})
        var token = jwtGenerator({id: sellerLogin._id, role: sellerLogin.role})
        res.send({ auth: true, token })
      })
    } catch (error) {
      res.status(401).send({auth: false, message: 'sellername not found'})
    }
  },
  edit: async(req, res) => {
    // edit seller data 'owner only'
    try {
      let sellerEdit = await Seller.findByIdAndUpdate(req.sellerLogin.id, req.body, {new: true})
      res.send({status: 'seller data edited', sellerEdit})
    } catch (error) {
      res.status(500).send(error)
    }
  },
  remove: async(req, res) => {
    // remove seller data 'admin only' 
    try {
      let sellerRemove = await Seller.findByIdAndRemove(req.params.id)
      res.send({status: 'seller data removed', sellerRemove})
    } catch (error) {
      res.status(500).send(error)
    }
  }
}