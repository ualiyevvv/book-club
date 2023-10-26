const {Room} = require("../models/models");
const uuid = require('uuid');
const RoomDto = require('../dtos/roomDto');
const ApiError = require('../error/ApiError');
class RoomService {


    async create(name, tg_group_id, userId, end_date) {
        const roomHash = uuid.v4();
        const room = await Room.create({name, tg_group_id, userId, end_date, roomHash})

        const roomDto = new RoomDto(room)

        return {
            room: roomDto
        }
    }

    async getOne(roomHash) {
        const room = await Room.findOne({where: {roomHash}});

        if (!room) {
            throw ApiError.badRequest(`Room with this room hash ${roomHash} does not exist`)
        }

        return {
            room: new RoomDto(room)
        }
    }
    async getOneInside(roomHash) {
        const room = await Room.findOne({where: {roomHash}});

        if (!room) {
            throw ApiError.badRequest(`Room with this room hash ${roomHash} does not exist`)
        }

        return room;
    }

    async getRoomId(roomHash) {
        const room = await Room.findOne({where: {roomHash}});

        if (!room) {
            throw ApiError.badRequest(`Room with this room hash ${roomHash} does not exist`)
        }

        return room.id
    }

    async getOneById(roomId) {
        const room = await Room.findOne({where: {roomId}});

        if (!room) {
            throw ApiError.badRequest(`Room with this room hash ${roomId} does not exist`)
        }

        return {
            room: new RoomDto(room)
        }
    }

    async getAllRooms() {
        // наверно нужно все записи перезаписать через room dto ?? понятное дело что только админ может получить все записи, но у Админа может быть разный уровень привилегий, не стоит отдавать данные все подряд
        // !!не только админы, например при выводе всех записей на главное страницы, например новости, все румы и т.п
        return await Room.findAll({
            order: [['end_date', 'DESC']],
        });
    }


}

module.exports = new RoomService();