const {Router} = require('express')
const router = new Router()
const QrcodeController = require('../controllers/qrcodeController')
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', roleMiddleware(["ADMIN"]), QrcodeController.create)
router.get('/:roomHash', roleMiddleware(["ADMIN"]), QrcodeController.getOneByRoom)
// router.get('/:room_id', VoteController.)
// router.get('/:user_id', OfferController.getAllByRoomId)
// router.get('/:id', OfferController.getOne)

module.exports = router
