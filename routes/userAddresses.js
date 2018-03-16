const router = require('express').Router()
const userAddressControllers = require('../controllers/userAddressControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET users addresses. */
router.get('/', checkAuth.isLogin, userAddressControllers.getOne)
router.post('/', checkAuth.isLogin, userAddressControllers.create)
router.put('/', checkAuth.isLogin, userAddressControllers.edit)
router.delete('/', checkAuth.isLogin, userAddressControllers.remove)

module.exports = router
