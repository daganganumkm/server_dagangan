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
      console.log(req.body)
      // let createAddress = await Address.create(req.body)
      // res.send(createAddress)
    } catch (error) {
      res.status(500).send(error)
    }
  },
  edit: async(req, res) => {

  },
  remove: async(req, res) => {

  }
}