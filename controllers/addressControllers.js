const Address = require('../models/addressModel')

module.exports = {
  getOne: async(req, res) => {
    // get user logged in address data from database
    try {
      let userAddress = await Address.findOne({user_id: req.userLogin.id})
      res.send(userAddress)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  create: async(req, res) => {
    // create new address data
    try {
      req.body.user_id = req.userLogin.id
      let createAddress = await Address.create(req.body)
      res.send(createAddress)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  edit: async(req, res) => {
    // edit user address data 
    try {
      let editAddress = await Address.findOneAndUpdate({user_id: req.userLogin.id}, req.body, {new: true})
      res.send({status: 'user address edited', editAddress})      
    } catch (error) {
      res.status(500).send(error)
    }
  },
  remove: async(req, res) => {
    // remove user address data
    try {
      let removeAddress = await Address.findOneAndRemove({user_id: req.userLogin.id})
      res.send({status: 'user address removed', removeAddress})      
    } catch (error) {
      res.status(500).send(error)
    }
  }
}