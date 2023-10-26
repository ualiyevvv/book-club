const {Router} = require('express')
const router = new Router()
const AttendeeController = require('../controllers/attendeeController')
const authMiddleware = require("../middleware/authMiddleware");

// router.post('/', AttendeeController.create)
router.get('/:qrHash',
    authMiddleware,
    AttendeeController.activate
)
// router.get('/:room_id', VoteController.)
// router.get('/:user_id', OfferController.getAllByRoomId)
// router.get('/:id', OfferController.getOne)

module.exports = router
