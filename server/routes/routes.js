const {Router} = require('express')
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router()
const attendeeRouter = require('./attendeeRouter')
const levelRouter = require('./levelRouter')
const offerRouter = require('./offerRouter')
const qrcodeRouter = require('./qrcodeRouter')
const roomRouter = require('./roomRouter')
const voteRouter = require('./voteRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/vote', voteRouter)
router.use('/room', roomRouter)
router.use('/offer', offerRouter)
router.use('/qrcode', authMiddleware, qrcodeRouter)
router.use('/attendee', authMiddleware, attendeeRouter)
router.use('/level', authMiddleware, levelRouter)

module.exports = router
