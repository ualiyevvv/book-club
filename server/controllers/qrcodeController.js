const {Qrcode} = require('../models/models')
const ApiError = require('../error/ApiError')
const crypto = require('crypto');
const qrcodeService = require('../services/qrcodeService')
const roomService = require('../services/roomService')
class QrcodeController {

    async create(req, res, next) {
        try {
            let {roomHash} = req.body

            const roomId = await roomService.getRoomId(roomHash)

            const qrcodeData = await qrcodeService.create(roomId)

            return res.json(qrcodeData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    // get last active qr code by room
    async getOneByRoom(req, res) {
        let {roomHash} = req.params

        console.log('\n\n\n',roomHash,'\n\n\n')
        const roomId = await roomService.getRoomId(roomHash)

        const qrcodeData = await qrcodeService.getQrcodeByRoomId(roomId)

        return res.json(qrcodeData)
    }


}

module.exports = new QrcodeController()