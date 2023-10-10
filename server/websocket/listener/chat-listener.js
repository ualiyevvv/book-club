const messageService = require("../../services/chat/message/message-service");
const logger = require('../../log/logger')('chat-listener');
module.exports = socket => {
    const messageService = require('../../services/chat/message/message-service');
    const notificationService = require('../../services/chat/notification/notification-service');

    socket.on('send-message', async (message, files) => {
        const { user } = socket.request;
        logger.log({message});
        await messageService.sendMessage(message, files, user);
    })

    socket.on('delete-notifications', async (notification_ids) => {
        const { user } = socket.request;

        console.log('delete-notifications', {notification_ids});
        await notificationService.deleteNotifications(notification_ids, user);
    })
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/