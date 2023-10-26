const {Router} = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/login',
    body('email').isEmail(),
    UserController.login
)
router.post('/registration',
    body('email').isEmail(),
    // body('password').isLength({min: 3, max: 32}),
    UserController.registration
)
router.post('/check-code',
    body('email').isEmail(),
    UserController.checkCode
)
router.post('/update/:userId',
    body('name').isString(),
    UserController.update
)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

// TODO Admin middleware
router.get('/', roleMiddleware(["ADMIN"]), UserController.getUsers)

module.exports = router
