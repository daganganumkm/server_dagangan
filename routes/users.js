const router = require('express').Router();
const userControllers = require('../controllers/userControllers');

/* GET users listing. */
router.get('/', userControllers.getAll);
router.get('/:id', userControllers.getOne);
router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router;
