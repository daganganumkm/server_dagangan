const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET users listing. */
router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)
router.get('/', checkAuth.isLogin, checkAuth.isAdmin, userControllers.getAll)
router.get('/:id', checkAuth.isLogin, checkAuth.isOwn, userControllers.getOne)
router.put('/:id', checkAuth.isLogin, checkAuth.isOwn, userControllers.edit)
router.delete('/:id', checkAuth.isLogin, checkAuth.isAdmin, userControllers.remove)

module.exports = router
