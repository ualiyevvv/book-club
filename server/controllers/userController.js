const ApiError = require("../error/ApiError")
const userService = require('../services/userService')
const {validationResult} = require('express-validator')

const secretKey = process.env.SECRET_KEY; // Замените на ваш секретный ключ
class UserController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }
            const {email} = req.body;
            const userData = await userService.registration(email);

            // res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }


    async checkCode(req, res, next) {
        try {
            const {email, code} = req.body;
            const userData = await userService.checkCode(email, code);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }
            const {email} = req.body;
            const userData = await userService.login(email);

            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token)
        } catch (e) {
            next(e)
        }

    }

    async refresh(req, res, next) {
        try {
            // console.log(req.cookies)
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch (e) {
            next(e)
        }

    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch(e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch(e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation errors', errors.array()))
            }
            const {userId} = req.params
            const {name} = req.body
            const userData = await userService.update(name, parseInt(userId));

            return res.json(userData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new UserController()