const {Level, Qrcode} = require("../models/models");
const LevelDto = require('../dtos/levelDto');
const ApiError = require('../error/ApiError');
const crypto = require("crypto");
const QrcodeDto = require("../dtos/qrcodeDto");
class QrcodeService {

    async create(roomId) {
        // const voteCheck = await Level.findOne({where:})
        // if (voteCheck) {
        //     throw ApiError.badRequest(`The same vote with ${userId, offerId, roomId}`)
        // }
        // const qrcodeOld = await Qrcode.findOne({where:{roomId}})

        const randomBytes = crypto.randomBytes(20);
        const randomHash = randomBytes.toString('hex');

        const qrcode = await Qrcode.create({hash:randomHash, roomId})

        return {
            qrcode: new QrcodeDto(qrcode)
        }
    }

    async getQrcodeByRoomId(roomId) {
        const qrcode = await Qrcode.findOne({where: {roomId}})
        if (!qrcode) {
            return { qrcode : null }
            // throw ApiError.badRequest(`Qrcode with this roomId ${roomId} does not exists`)
        }

        return {
            qrcode: new QrcodeDto(qrcode)
        }
    }

    async getRoomIdByQrHash(qrHash) {
        const qrcode = await Qrcode.findOne({where: {hash:qrHash}})
        if (!qrcode) {
            throw ApiError.badRequest(`Qrcode with this qrHash ${qrHash} does not exists`)
        }

        return qrcode.roomId
    }



}

module.exports = new QrcodeService();