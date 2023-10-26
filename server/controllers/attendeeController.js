const ApiError = require('../error/ApiError')
const attendeeService = require('../services/attendeeService')
const qrcodeService = require('../services/qrcodeService')
const levelService = require('../services/levelService')
const userService = require('../services/userService')
const telegramService = require("../services/telegramService");
const voteService = require("../services/voteService");
const sequelize = require("../db");
// const {transaction} = require('sequelize')
class AttendeeController {

    async activate(req, res, next) {
        try {
            const {qrHash} = req.params;
            const userId = req.user.id;

            // console.log('\n\n\n\n',req ,'\n\n\n\n')


            const roomId = await qrcodeService.getRoomIdByQrHash(qrHash)

            // вынес за пределы транзакции т.к если внутри то запись не создается. а мне нужно чтобы создавалась т.к потом я обращаюсь за всеми аттендии юзера, а т.е эти запросы в одной транзакции то создание то не выполнилось соответственно когда я обращаюсь за все аттенди юзера то я обращаюсь за неактуальными данными
            const attendee = await attendeeService.create(roomId, userId)
            if (attendee === null) {
                return res.json({status: 'Already attend'})
            }
            await sequelize.transaction(async (t) => {
                const allAttendeesByUserId = (await attendeeService.getAllByUserId(userId)).attendees
                const levels = await levelService.getAllLevels();

                // TODO логику нового левла перенсти в levelService
                const user = (await userService.getInsideUserById(userId)).dataValues;
                const newLevel = levels.find(level => level.dataValues.min_points === allAttendeesByUserId.length)
                const oldLevel = levels.find(level => level.dataValues.id === user.levelId)
                let oldScore = 1;
                if (oldLevel) {
                    oldScore = oldLevel.dataValues.level_score
                }
                if (newLevel) {
                    const userForUpdate = await userService.getInsideUserById(userId);
                    // const updatedLevelUser = await userService.updateLevel(newLevel.dataValues.id, userId, t);
                    userForUpdate.levelId = newLevel.dataValues.id
                    userForUpdate.save()
                    console.log('\n\n\n\n\nnewLevel.dataValues.level_score',newLevel.dataValues.level_score, '\n\n\n\n\n')

                    // нужно взять все голоса у которых end date > new Date, обновить в них поле score,
                    await voteService.scoresUpToNewLevel(userId, newLevel.dataValues.level_score, newLevel.dataValues.level_score-oldScore, t)
                    // а также offer id всех этих голосов и обновить в них total_scores,
                    // т.е можно получить все offers где user голосовал и добавить к их total_scores, разницу newLevel score и oldLevel score
                    // const


                    const user = await userService.getInsideUserById(userId);
                    const tgUsername = await telegramService.getUsernameByChatId(user.tg_id)
                    await telegramService.sendMessageToGroup(`🎉 Ура 🎉 \n\nУ @${tgUsername} новый уровень - <b>${newLevel.dataValues.name}</b>. \n\n💥 Вес голоса повышается до ${newLevel.level_score}.  \n\n#levelup`)
                    // возвращать уровень или еще и пользователя? юзера возвращаем чтобы потом в контекст фронта установить свежие данные о нем,
                    // но ведь level id так важен в контекста приложения? в моем случае вроде нет. но для страницы достижений нужно знать свежий уровень
                    return res.json({level: newLevel})
                }

                return res.json({attendees_count: allAttendeesByUserId})
            })


        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    // async getAllByRoomId(req, res) {
    //     let {room_id} = req.body
    //
    //     let attendees = await Attendee.findAndCountAll({ where: {room_id} })
    //
    //     return res.json(attendees)
    // }
    //
    // async getAllByUserId(req, res) {
    //     let {user_id} = req.body
    //
    //     let attendees = await Attendee.findAndCountAll({ where: {user_id} })
    //
    //     return res.json(attendees)
    // }
    //
    //
    // async getOne(req, res) {
    //     const {id} = req.params
    //     const attendee = await Attendee.findOne(
    //         {
    //             where: {id},
    //         }
    //     )
    //
    //     return res.json(attendee)
    // }


}

module.exports = new AttendeeController()