const {User, VerfCodes} = require("../models/models");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const crypto = require('crypto');
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize')
class UserService {

    generateSixDigitCode() {
        const min = 100000; // Минимальное значение (включительно)
        const max = 999999; // Максимальное значение (включительно)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async sendCode(email) {
        const verificationCode = this.generateSixDigitCode()
        const user = await User.findOne({email})
        if (!user) {
            throw ApiError.badRequest(`User with this email ${email} does not exists`);
        }
        const oldCode = await VerfCodes.findOne({where: {email, isActive: true}})
        if (oldCode) {
            oldCode.isActive = false;
            oldCode.save()
        }
        // const user = await User.create({email})
        const code = await VerfCodes.create({email, code: verificationCode})

        await mailService.sendActivationMail(email, verificationCode);
    }


    // обновлять поля которые мне нужны в отдельных функциях или же в одной передавая те поля которые обновляю
    async updateLevel(levelId, id, transaction) {
        const user = await User.findOne({where: {id}})
        if (!user) {
            throw ApiError.badRequest(`User with userId ${id} not found`);
        }

        let updatedUser;
        // понять что возвращает user.update(), ведь это не User.update() понять в чем разница между ними
        // if (transaction) {
            updatedUser = await user.update({ levelId }, { transaction });
        // } else {
        //     updatedUser = await user.update({ levelId });
        // }
        if (!updatedUser || updatedUser[0] === 0) {
            throw ApiError.badRequest(`Up to date user name for this userId ${id} does not saved`)
        }

        return {
            user: new UserDto(updatedUser[1])
        }

    }

    async update(name, id) {
        const user = await User.findOne({where: {id}})
        if (!user) {
            throw ApiError.badRequest(`User with userId ${id} not found`);
        }
        user.name = name
        if (!user.save()) {
            throw ApiError.badRequest(`Up to date user name for this userId ${id} does not saved`)
        }
        return {
            user: new UserDto(user)
        }
    }
    async checkCode(email, code) {
        const verfVode = await VerfCodes.findOne({where: {email, code, isActive: true}})

        if (!verfVode) {
            throw ApiError.badRequest('Cannot find your attempt');
        }
        verfVode.isActive = false;
        verfVode.save();
        const user = await User.findOne({where: {email}})
        user.email_confirmed = new Date();
        user.save()

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto})

        // тут насколько критично вытващить id пользователя из модели user или userDto ??
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async registration(email) {
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            throw ApiError.badRequest(`User with this email ${email} already exists`);
        }

        // const hashPassword = await bcrypt.hash(password, 3)
        // const activationLink = uuid.v4();
        // Генерируем случайные байты
        const randomBytes = crypto.randomBytes(20); // 16 байтов = 128 бит
        // Преобразуем байты в шестнадцатеричную строку (хэш)
        const randomHash = randomBytes.toString('hex');

        const user = await User.create({email, password: randomHash})

        this.sendCode(email)

        return {
             status: 'code sent'
        }
    }

    async login(email) {
        const candidate = await User.findOne({where: {email}});
        if (!candidate) {
            // Генерируем случайные байты
            const randomBytes = crypto.randomBytes(20); // 16 байтов = 128 бит
            // Преобразуем байты в шестнадцатеричную строку (хэш)
            const randomHash = randomBytes.toString('hex');
            const user = await User.create({email, password: randomHash})
            // throw ApiError.badRequest(`User with this email ${email} does not exist`)
        }
        // const isPassEquals = await bcrypt.compare(password, user.password);
        // if (!isPassEquals) {
        //     throw ApiError.badRequest('Incorrect password');
        // }

        this.sendCode(email)

        // const userDto = new UserDto(user);
        // const tokens = tokenService.generateToken({...userDto});
        // // тут насколько критично вытващить id пользователя из модели user или userDto ??
        // await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            status: 'code sent'
        }
    }

    async activate(activationLink) {
        const user  = await User.findOne({where: {activationLink}})
        if (!user) {
            throw ApiError.badRequest('Incorrect activation code')
        }
        user.isActivated = true
        await user.save();
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedRequest();
        }
        // console.log(refreshToken)

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        // console.log('\n\n\n',userData)
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedRequest()
        }
        const user = await User.findOne({where: userData.id})
        if (!user) {
            throw ApiError.badRequest('User does not exist')
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        // тут насколько критично вытващить id пользователя из модели user или userDto ??
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async getUserById(userId) {
        const user = await User.findOne({where:{id:userId}})
        if (!user) {
            throw ApiError.badRequest(`User with this id ${userId} does not exist`)
        }

        return new UserDto(user);
    }
    async getInsideUserById(userId) {
        const user = await User.findOne({where:{id:userId}})
        if (!user) {
            throw ApiError.badRequest(`User with this id ${userId} does not exist`)
        }

        return user;
    }

    async confirmTelegramAccount(tgStarthash, tgId, chatId) {
        // try {
        if (!tgStarthash) {
            return 'undefined start hash'
        }

        const candidate = await User.findOne({
            where:{
                [Op.or]: [
                    { tg_id: tgId.toString() },
                    { tg_chat_id: chatId.toString() }
                ]
            }
        })
        if (candidate) {
            return 'user with this tg_id is already exist'
        }

        const user = await User.findOne({where:{password:tgStarthash}})
        if (!user) {
            return 'user for not found'
        }
        // if (tgId) {
        //     return 'tg already confirmed. if it is error, text to @mitxp'
        // }
        // console.log('\n\n\n\ telegram id',tgId)
        user.tg_id = tgId;
        user.chat_id = chatId;
        user.tg_confirmed = new Date();
        user.password = null;
        user.save()

        return 'account confirmed'

        // } catch (e) {
        //     throw ApiError.badRequest(`Smth wrong by confirming tg acc`)
        // }

    }


}

module.exports = new UserService();