const {Offer, User, Vote} = require("../models/models");
const uuid = require('uuid');
const OfferDto = require('../dtos/offerDto');
const ApiError = require('../error/ApiError');
const voteService = require("./voteService");
const {Op, literal} = require("sequelize");
class OfferService {

    async create(info, roomId, userId, comment) {
        const offer = await Offer.create({info, roomId, userId, comment})

        const offerDto = new OfferDto(offer)

        return {
            offer: offerDto
        }
    }

    async getOffersByRoomId(roomId) {
        const offers = await Offer.findAll({
            where: {roomId},
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Vote,
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                    // order: [['createdAt', 'ASC']],
                }
            ],
        })

        if (!offers) {
            throw ApiError.badRequest(`Offers with this roomId ${roomId} does not exists`)
        }

        return {
            offers: offers
        }
    }

    async getOneOffer(offerId) {
        const offer = await Offer.findOne({
            where: {
                id: offerId
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                Vote
            ],
        });
        if (!offer) {
            throw ApiError.badRequest(`Offer with this offerId ${offerId} does not exists`)
        }

        return {offer: offer}
    }

    async getOneInside(offerId) {
        const offer = await Offer.findOne({where: {id:offerId}});
        if (!offer) {
            throw ApiError.badRequest(`Offer with this offerId ${offerId} does not exists`)
        }

        return offer
    }

    async scoresUpToNewLevel(userId, scoresDifference) {

        try {
            const offers = await Offer.update({
                total_scores: literal(`total_scores + ${scoresDifference}`)
            },{where: {
                    end_date: {
                        [Op.gt]: new Date()
                    },
                    userId: {
                        [Op.eq]: userId
                    }
                }})

            return votes
        } catch (e) {
            throw ApiError.badRequest(`Error by votes update: `, e)
        }

    }

    async updateScoresByOffer(offerId, score) {

        console.log('\n\n\nscore',score,'\n\n\n')
        const offer = await Offer.findOne({where: {id:offerId}});
        if (!offer) {
            throw ApiError.badRequest(`Offer with this offerId ${offerId} does not exists`)
        }
        offer.total_scores += score
        if (!offer.save()) {
            throw ApiError.badRequest(`Up to date Votes count for this offer ${offerId} does not saved`)
        }


        // if (updatedOffer[0] === 1) {
        //     console.log('Поле успешно обновлено updatedOffer.');
        // } else {
        //     console.log('Поле не было обновлено. Возможно, updatedOffer с таким ID не найден.');
        // }

        return {offer: new OfferDto(offer)}
    }

    // async getAllRooms() {
    //     // наверно нужно все записи перезаписать через room dto ?? понятное дело что только админ может получить все записи, но у Админа может быть разный уровень привилегий, не стоит отдавать данные все подряд
    //     // !!не только админы, например при выводе всех записей на главное страницы, например новости, все румы и т.п
    //     return await Room.findAll();
    // }


}

module.exports = new OfferService();