const router = require('express').Router()
const sellerControllers = require('../controllers/sellerControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET sellers listing. */
router.post('/signup', sellerControllers.signup)
router.post('/login', sellerControllers.login)
router.get('/', checkAuth.isLogin, checkAuth.isAdmin, sellerControllers.getAll)
router.get('/me', checkAuth.isLogin, sellerControllers.getOne)
router.put('/', checkAuth.isLogin, sellerControllers.edit)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAdmin, sellerControllers.remove)

module.exports = router