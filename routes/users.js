const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET users listing. */
router.get('/', checkAuth.isLogin, userControllers.getAll)
router.get('/:id', checkAuth.isLogin, checkAuth.isOwn, userControllers.getOne)
router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)

module.exports = router
