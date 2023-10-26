const ApiError = require('../error/ApiError')
const {validationResult} = require("express-validator");
const levelService = require('../services/levelService')
class LevelController {

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }
            let {name, description, level_score, min_points } = req.body

            const levelData = await levelService.create(name, description, min_points, level_score )

            return res.json(levelData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        const levelData = await levelService.getAllLevels();

        return res.json(levelData)
    }

    async getOne(req, res, next) {
        const {levelId} = req.params

        const levelData = await levelService.getLevelById(levelId);

        return res.json(levelData)
    }



}

module.exports = new LevelController()