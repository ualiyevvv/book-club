const ApiError = require('../error/ApiError')
const roomService = require('../services/roomService')
const offerService = require('../services/offerService')
const {validationResult} = require("express-validator");
const telegramService = require('../services/telegramService')
const userService = require('../services/userService')
class OfferController {

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }

            let {info, roomHash: roomHash, user_id: userId, comment} = req.body

            let roomId = await roomService.getRoomId(roomHash)
            let room = await roomService.getOneInside(roomHash)

            if (new Date() > new Date(room.end_date)) {
                return next(ApiError.badRequest('Room is closed', errors.array()))
            }

            const offerData = await offerService.create(info, roomId, userId, comment)

            const infoForTg = JSON.parse(info)
            const user = await userService.getInsideUserById(userId);
            const tgUsername = await telegramService.getUsernameByChatId(user.tg_id)
            await telegramService.sendMessageToGroup(`✨ <b>@${tgUsername}</b> предложил книгу ✨ ${comment && `\n\n👉 Комментируя:  <i>${comment}</i>`} \n\n📖 «${infoForTg.title}» ${infoForTg.authors && `\n\n👥 Авторы:  ${infoForTg.authors.map(author => (author + ', '))}`} ${infoForTg.pageCount && `\n\nКоличество страниц: <i>${infoForTg.pageCount}</i>`}\n\n#голосование`)

            return res.json(offerData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllByRoom(req, res, next) {
        try {
            let {roomHash} = req.params

            const roomId = await roomService.getRoomId(roomHash)

            const offerData = await offerService.getOffersByRoomId(roomId)

            return res.json(offerData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // async getOne(req, res) {
    //     const {id} = req.params
    //
    //
    //
    //     return res.json(offer)
    // }
}

module.exports = new OfferController()