/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const orderDto = require('../../dtos/order-dto');
const asyncOrderDto = require('../../dtos/async/order-dto');
const ApiError = require("../../exceptions/ApiError");
const {User} = require("../../models/models-manager");

const logger = require('../../log/logger')('order-observer');


async function notify(method, modelName, orderDoc){
    const io = require('../../websocket/socket-io').io;

    const { User } = require('../../models/models-manager');

    const userId = orderDoc.customer;
    if(!userId){
        throw ApiError.ServerError('Order Observer Error. Order must have a customer');
    }

    const dto = await asyncOrderDto(orderDoc);

    // Должны отправить уведомление о создании или удалении админам и пользователям, имеющим отношение к order
    const admins = await User.find({ role: 'admin' });
    admins.map(admin => {
        if(admin.id == userId){
            return;
        }
        io.to(String(admin.id)).emit(`/${method}/${modelName}`, dto);
    });

    // самому заказчику отправляем
    io.to(String(userId)).emit(`/${method}/${modelName}`, dto);
}


module.exports = function(schema) {

    schema.post('save', async function(orderDoc, next){
        const modelName = (this.constructor.modelName).toLowerCase(); // Можно было бы и просто 'order' написать, а не так
        try{
            await notify('save', modelName, orderDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

    schema.post('findOneAndDelete', async function(orderDoc, next){
        const modelName = (orderDoc.constructor.modelName).toLowerCase(); // Можно было бы и просто 'order' написать, а не так
        try{
            await notify('delete', modelName, orderDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

};