const router = require('express').Router()
const addressControllers = require('../controllers/addressControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET users addresses. */
router.get('/', checkAuth.isLogin, addressControllers.getOne)
router.post('/', checkAuth.isLogin, addressControllers.create)
router.put('/', checkAuth.isLogin, addressControllers.edit)
router.delete('/', checkAuth.isLogin, addressControllers.remove)

module.exports = router
