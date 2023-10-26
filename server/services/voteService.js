const {Offer, Vote} = require("../models/models");
const VoteDto = require('../dtos/voteDto');
const ApiError = require('../error/ApiError');
const { Op, LOCK} = require("sequelize");
class VoteService {

    async create(userId, roomId, offerId, score, end_date) {
        const voteCheck = await Vote.findOne({where:{offerId, roomId, userId}})
        if (voteCheck) {
            await voteCheck.destroy()
            console.log(`\n\n ${voteCheck} \n\n`)
            return 1
            // throw ApiError.badRequest(`The same vote with ${userId} ${offerId} ${roomId}`)
        }

        const vote = await Vote.create({userId, roomId, offerId, score, end_date})

        const voteDto = new VoteDto(vote)

        return {
            vote: voteDto
        }
    }

    async scoresUpToNewLevel(userId, newScore, scoresDifference, transaction) {
        try {
            await Vote.update({score: newScore},{
                where: {
                    end_date: {
                        [Op.gt]: new Date()
                    },
                    userId: {
                        [Op.eq]: userId
                    }
                },
                include: Offer,
                transaction
            })

            const votes = await Vote.findAll({
                where: {
                    end_date: {
                        [Op.gt]: new Date()
                    },
                    userId: {
                        [Op.eq]: userId
                    }
                },
                include: Offer,
                transaction
            })

            console.log('\n\n\nvotes',votes,'\n\n\n')
            console.log('\n\n\noffervote',votes[0].dataValues.offer,'\n\n\n')


            // votes.map(vote => async () => {
            // votes.map(async(vote) => {
            //     {
            //         console.log('\n\n\noffervotevotevotevote',vote,'\n\n\n')
            //         const offer = vote.dataValues.offer;
            //         console.log('\n\n\noffervote',offer,'\n\n\n')
            //
            //         if (offer) {
            //             // Вычислить новое значение total_scores
            //             const updatedTotalScores = offer.dataValues.total_scores + scoresDifference;
            //
            //             // Обновить total_scores в базе данных
            //             await offer.update(
            //                 { total_scores: updatedTotalScores },
            //                 {transaction, lock: true},
            //
            //             );
            //         }
            //     }
            // })
            // Обновить поле total_scores для каждой связанной записи Offer
            await Promise.all(
                votes.map(async (vote) => {
                    console.log('\n\n\noffervotevotevotevote',vote,'\n\n\n')
                    const offer = vote.offer;
                    console.log('\n\n\noffervote',offer,'\n\n\n')
                    console.log('\n\n\nscoresDifference',scoresDifference,'\n\n\n')
                    if (offer) {
                        // Вычислить новое значение total_scores
                        const updatedTotalScores = offer.dataValues.total_scores + scoresDifference;

                        // Обновить total_scores в базе данных
                        await offer.update({ total_scores: updatedTotalScores },
                            {transaction, lock: true},);
                    }
                })
            );


            // // // Обновить поле total_scores для каждой связанной записи Offer

            // const sumScores = await Vote.sum('score', {where:{userId}})
            // console.log('\n\n\nsumScores',sumScores,'\n\n\n')
            //
            // await Offer.update({total_scores: sumScores}, {where:{}})


            return votes
        } catch (e) {
            throw ApiError.badRequest(`Error by votes update: `, e)
        }
    }

    async getVotesByOffer(offerId) {
        const votes = await Vote.findAll({where: {offerId}})
        if (!votes) {
            throw ApiError.badRequest(`Votes with this offerId ${offerId} does not exists`)
        }

        return {
            votes: votes
        }
    }

    // TODO дописать. либо удалять запись либо менять статус, так можно отслеживать действия по частым сменам голоса
    async deleteVoteByOffer(offerId) {
        const vote = await Vote.findOne({where: {offerId}})
        if (!votes) {
            throw ApiError.badRequest(`Votes with this roomId ${offerId} does not exists`)
        }

        return {
            votes: votes
        }
    }

    // async getAllRooms() {
    //     // наверно нужно все записи перезаписать через room dto ?? понятное дело что только админ может получить все записи, но у Админа может быть разный уровень привилегий, не стоит отдавать данные все подряд
    //     // !!не только админы, например при выводе всех записей на главное страницы, например новости, все румы и т.п
    //     return await Room.findAll();
    // }


}

module.exports = new VoteService();