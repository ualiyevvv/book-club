const {Router} = require('express')
const router = new Router()
const LevelController = require('../controllers/levelController')
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/', roleMiddleware(["ADMIN"]), LevelController.create)
// TODO update
// router.post('/update/:levelId', LevelController.update)
router.get('/', roleMiddleware(["ADMIN"]), LevelController.getAll)
router.get('/:levelId', roleMiddleware(["ADMIN"]), LevelController.getOne)
// router.get('/:user_id', OfferController.getAllByRoomId)
// router.get('/:id', OfferController.getOne)

module.exports = router
