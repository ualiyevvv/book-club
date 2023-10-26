const {Router} = require('express')
const router = new Router()
const OfferController = require('../controllers/offerController')
const {body} = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',  [
        body('roomHash').isString(),
        body('comment').isString(),
    ],
    authMiddleware,
    OfferController.create
)
router.get('/:roomHash', OfferController.getAllByRoom)
// router.get('/:user_id', OfferController.getAllByRoomId)
// router.get('/:id', OfferController.getOne)

module.exports = router
