const {Router} = require('express')
const router = new Router()
const RoomController = require('../controllers/roomController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/', [
        body('name').isString(),
        body('tg_group_id').isString(),
        body('user_id').isNumeric(),
        // body('end_date').isDate()
    ],
    roleMiddleware(["ADMIN"]),
    RoomController.create
)
router.get('/', RoomController.getRooms)
router.get('/:roomHash', RoomController.getOne
)
// router.post('/:roomHash', RoomController.getOne)

module.exports = router
