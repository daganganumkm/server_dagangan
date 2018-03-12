const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
  getAll: async(req, res) => {
    try {
      let users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    };
  },
  getOne: async(req, res) => {
    try {
      let user = await User.findById(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);      
    }
  },
  signup: async(req, res) => {
    try {
      let hashedPasswd = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPasswd;
      let userSignup = await User.create(req.body);
      res.send(userSignup);
    } catch (error) {
      res.send(error);
    }
  },
  login: async(req, res) => {
    try {
      let userLogin = await User.find({username: req.body.username});
      
    } catch (error) {
      
    }
  }
};