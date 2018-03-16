const router = require('express').Router()
const userAddressControllers = require('../controllers/userAddressControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET users addresses. */
router.get('/', checkAuth.isLogin, checkAuth.isOwn, userAddressControllers.getOne)
router.post('/', userAddressControllers.create)
router.put('/:userId', checkAuth.isLogin, checkAuth.isOwn, userAddressControllers.edit)
router.delete('/:userId', checkAuth.isLogin, checkAuth.isOwn, userAddressControllers.remove)

module.exports = router
