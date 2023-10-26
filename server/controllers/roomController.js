const {Room} = require('../models/models')
const ApiError = require('../error/ApiError')
const {validationResult} = require("express-validator");
const roomService = require("../services/roomService");

class RoomController {

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }

            let {name, tg_group_id, user_id: userId, end_date} = req.body
            const roomData = await roomService.create(name, tg_group_id, userId, end_date);

            return res.json(roomData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // async getAll(req, res) {
    //     let {room_id, typeId, limit, page} = req.body
    //     page = page || 1
    //     limit = limit || 9
    //     let offset = page * limit - limit
    //
    //     let devices;
    //     if (!brandId && !typeId) {
    //         devices = await Device.findAndCountAll({limit, offset})
    //     }
    //     if (brandId && !typeId) {
    //         devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
    //     }
    //     if (!brandId && typeId) {
    //         devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
    //     }
    //     if (brandId && typeId) {
    //         devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
    //     }
    //
    //     return res.json(rooms)
    // }

    async getOne(req, res, next) {
        const {roomHash} = req.params
        if (!roomHash) {
            next(ApiError.badRequest(`Room hash ${roomHash} is not valid`))
        }

        const roomData = await roomService.getOne(roomHash);

        return res.json(roomData)
    }

    async getRooms(req, res) {
        // await is require else it is {} instead []
        const rooms = await roomService.getAllRooms()

        return res.json(rooms)
    }
}

module.exports = new RoomController()