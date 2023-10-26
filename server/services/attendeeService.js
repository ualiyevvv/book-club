const {Attendee} = require("../models/models");
const ApiError = require('../error/ApiError');
class AttendeeService {

    async create(roomId, userId, transaction) {

        console.log('\n\n\n\nAttendeeService\n\n\n\n')

        const attendeeCheck = await Attendee.findOne({where: {roomId, userId}})
        if (attendeeCheck) {
            return null
        }

        let attendee;
        if (transaction) {
            attendee = await Attendee.create({roomId, userId},{transaction})
        } else {
            attendee = await Attendee.create({roomId, userId})
        }


        return {
            attendee: attendee
        }
    }

    async getAllByUserId(userId) {
        const attendees = await Attendee.findAll({where: {userId}})
        if (!attendees) {
            throw ApiError.badRequest(`No attendees with this userId ${userId} does not exists`)
        }

        return {
            attendees: attendees
        }
    }



}

module.exports = new AttendeeService();