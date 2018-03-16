const Address = require('../models/userAddressModel')

module.exports = {
  getOne: async(req, res) => {
    try {
      let userAddress = await Address.findOne({userId: req.userLogin.id})
      res.send(userAddress)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  create: async(req, res) => {
    try {
      req.body.userId = req.userLogin.id
      let createAddress = await Address.create(req.body)
      res.send(createAddress)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  edit: async(req, res) => {
    try {
      let editAddress = await Address.findOneAndUpdate({userId: req.userLogin.id}, req.body, {new: true})
      res.send({status: 'user address edited', editAddress})      
    } catch (error) {
      res.status(500).send(error)
    }
  },
  remove: async(req, res) => {
    try {
      let removeAddress = await Address.findOneAndRemove({userId: req.userLogin.id})
      res.send({status: 'user address removed', removeAddress})      
    } catch (error) {
      res.status(500).send(error)
    }
  }
}