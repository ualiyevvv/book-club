const {Vote, Offer} = require('../models/models')
const ApiError = require('../error/ApiError')
const {validationResult} = require("express-validator");
const voteService = require('../services/voteService')
const offerService = require('../services/offerService')
const levelService = require('../services/levelService')
const userService = require('../services/userService')
const roomService = require('../services/roomService')
const telegramService = require('../services/telegramService')
class VoteController {

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }
            let {roomHash, userId, offerId } = req.body
            // console.log(`\n\n\n${roomHash},${userId}, ${req.user.level_id}\n\n\n`)
            // console.log(`\n\n${typeof req.user.level_id}\n\n`)
            const room = await roomService.getOneInside(roomHash)
            if (new Date() > new Date(room.end_date)) {
                return next(ApiError.badRequest('Room is closed', errors.array()))
            }

            let score = 1;
            const user = await userService.getInsideUserById(userId);
            // что вернет ORM если доставать по null айди, вроде ошибку --- ДА. ВЕРНЕТ ОШИБКУ
            if (user.levelId) {
                const level = await levelService.getLevelById(user.levelId)
                score = level.level.level_score;
            }

            const vote = await voteService.create(userId,room.id,offerId,score, room.end_date);
            const votes = (await voteService.getVotesByOffer(offerId)).votes
            if (vote === 1) {
                score = -score
            }
            const updatedOffer = await offerService.updateScoresByOffer(offerId, score)

            // TODO что возвращать на фронт ???
            // const offer = await offerService.getOneOffer(offerId)
            const offer = updatedOffer.offer;
            const tgUsername = await telegramService.getUsernameByChatId(user.tg_id)
            if (vote !== 1) {
                await telegramService.sendMessageToGroup(`👀 <b>@${tgUsername}</b> проголосовал(-а) за книгу «${JSON.parse(offer.info).title}» 👀 \n\nАвторы: ${(JSON.parse(offer.info).authors).map(author => `${author}, `)}\n\nБаллов +${score} \n\nВсего баллов за эту книгу: ${offer.total_scores} \n\n#голосование`)
            } else {
                await telegramService.sendMessageToGroup(`👀 <b>@${tgUsername}</b> отменил(-а) голос за книгу «${JSON.parse(offer.info).title}» 👀 \n\nАвторы: ${(JSON.parse(offer.info).authors).map(author => `${author}, `)}\n\nБаллов ${score}  \n\nВсего баллов за эту книгу: ${offer.total_scores} \n\n#голосование`)
            }

            return res.json(votes)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getAllByRoomId(req, res) {
        let {room_id} = req.body

        let votes = await Vote.findAndCountAll({ where: {room_id} })

        return res.json(votes)
    }

    async getAllByOfferId(req, res) {
        let {offer_id} = req.body

        let votes = await Vote.findAndCountAll({ where: {offer_id} })

        return res.json(votes)
    }

    async getAllByUserId(req, res) {
        let {user_id} = req.body

        let votes = await Vote.findAndCountAll({ where: {user_id} })

        return res.json(votes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const vote = await Vote.findOne(
            {
                where: {id},
            }
        )

        return res.json(vote)
    }
}

module.exports = new VoteController()