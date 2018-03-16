const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET users listing. */
router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)
router.get('/', checkAuth.isLogin, checkAuth.isAdmin, userControllers.getAll)
router.get('/me', checkAuth.isLogin, userControllers.getOne)
router.put('/', checkAuth.isLogin, userControllers.edit)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAdmin, userControllers.remove)

module.exports = router
