const {Level, Vote} = require("../models/models");
const LevelDto = require('../dtos/levelDto');
const ApiError = require('../error/ApiError');
class LevelService {

    async create(name, description, min_points, level_score) {
        // const voteCheck = await Level.findOne({where:})
        // if (voteCheck) {
        //     throw ApiError.badRequest(`The same vote with ${userId, offerId, roomId}`)
        // }

        const level = await Level.create({name, description, min_points, level_score})

        return {
            level: new LevelDto(level)
        }
    }

    // TODO обновление данных сущности level (update)

    async getLevelById(levelId) {
        const level = await Level.findOne({where: {id:levelId}})
        if (!level) {
            throw ApiError.badRequest(`Level with this levelId ${levelId} does not exists`)
        }

        return {
            level: new LevelDto(level)
        }
    }

    async getAllLevels() {
        return await Level.findAll();
    }


}

module.exports = new LevelService();