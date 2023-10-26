const {Router} = require('express')
const router = new Router()
const VoteController = require('../controllers/voteController')
const {body} = require("express-validator");
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', [
        body('userId').isNumeric(),
        body('offerId').isNumeric(),
        body('roomHash').isString(),
    ],
    authMiddleware,
    VoteController.create
)
router.get('/:offer_id', VoteController.getAllByOfferId)
// router.get('/:room_id', VoteController.)
// router.get('/:user_id', OfferController.getAllByRoomId)
// router.get('/:id', OfferController.getOne)

module.exports = router
