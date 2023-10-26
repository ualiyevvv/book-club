const TelegramBot = require('node-telegram-bot-api');
const userService = require('./userService')

class TelegramService {

    groupId = -1001875541217;

    constructor() {
        this.bot = new TelegramBot(process.env.TG_BOT_ID, { polling: true });

        // Обработка команды /start с параметром
        this.bot.onText(/\/start (.+)/, async (msg, match) => {
            await this.handleStartCommand(msg, match[1]);
        });

        this.bot.onText(/\/start$/, async (msg) => {
            await this.handleJustStart(msg);
        });
    }
    // Replace 'YOUR_BOT_TOKEN' with your actual bot token
    keyboardOptions = {
        reply_markup: {
            remove_keyboard: true // Этот параметр убирает клавиатуру
        }
    };


    // async checkGroupMembership(userId, chatId) {
    //     try {
    //         // Получение информации о пользователе
    //         const memberInfo = await this.bot.getChatMember(this.groupId, userId);
    //         const status = JSON.stringify(memberInfo);
    //
    //         // Проверка привилегий пользователя
    //         if (memberInfo.status === 'administrator' || memberInfo.status === 'creator') {
    //             this.bot.sendMessage(chatId, 'У вас есть привилегии в этой группе.');
    //         } else if(memberInfo.status === 'member') {
    //             this.bot.sendMessage(chatId, 'Вы участник группы');
    //         } else {
    //             this.bot.sendMessage(chatId, 'У вас нет привилегий в этой группе.');
    //         }
    //         // Отправка статуса пользователя
    //         this.bot.sendMessage(chatId, `Статус пользователя в группе: ${status}`);
    //     } catch (e) {
    //         console.log('\nTelegram BOT\n',e, '\n\n')
    //     }
    // }


    async handleJustStart(msg) {
        const chatId = msg.chat.id;
        const text = 'Привет, это бот книжного клуба @bookmateAITU. \n\nБот умеет только подтверждать аккаунты. Отправить запрос можно только после перехода с сайта. Зайдите в свой профиль аккаунта и перейдите по кнопке подтверждения. \n\nЕсли возникли вопросы, пишите @mitxp.';

        try {

            // await this.checkGroupMembership(msg.from.id, chatId)
            this.bot.sendMessage(chatId, text, this.keyboardOptions);

        } catch (e) {
            console.log('\nTelegram BOT\n',e, '\n\n')
        }

    }
    async handleStartCommand(msg, parameter) {
        try {
            const chatId = msg.chat.id;
            // что есть tg user id??? спросить у Ернара, потом изменить в случае чего
            const userId = msg.from.id; // через userId не достать username просто так, нужно через фотки

            const memberInfo = await this.bot.getChatMember(this.groupId, userId);
            if (memberInfo.status === 'left' || memberInfo.status === 'kicked') {
                this.bot.sendMessage(chatId, 'Вы должны состоять в группе @bookmateAITU. Войдите в группу и повторите попытку.');

                return
            }

            const response = await userService.confirmTelegramAccount(parameter, userId, chatId). then(
                r => {
                    if (r === 'account confirmed') {
                        this.bot.sendMessage(chatId, 'Вы подтвердили свой аккаунт на @bookmateAITU');
                    } else {
                        this.bot.sendMessage(chatId, 'Ошибка подтверждения обратитесь к @mitxp');
                    }
                }
            )
        } catch (e) {
            console.log('\nTelegram BOT\n',e, '\n\n')
        }
    }

    async sendMessageToGroup(message) {
        try {
            // test group id 1001875541217
            await this.bot.sendMessage(this.groupId, message, { parse_mode: 'HTML' });
        } catch (e) {
            console.log('\nTelegram BOT\n',e, '\n\n')
        }
    }

    async getUsernameByChatId(chatId) {
        try {
            const chat = await this.bot.getChat(chatId);
            const username = chat.username;

            if(!username) {
                return console.log(`Пользователь с chatId ${chatId} не имеет username.`);
            }

            return username;
        } catch (error) {
            console.error('Ошибка при запросе информации о чате:', error);
            return null
            // await this.bot.sendMessage(chatId, 'Произошла ошибка при запросе информации о чате.');
        }
    }


}

module.exports = new TelegramService();


// // Define the group chat ID where you want to check membership
// const groupId = -1001875541217; // Replace with your group chat ID
// let chatId;
// let userId;
//
// // Объект с настройками клавиатуры
// const keyboard = {
//     reply_markup: {
//         keyboard: [
//             [{ text: 'Подтвердить' }],
//         ],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//     },
// };
//
//
// // Обработка команды /start с параметром
// bot.onText(/\/start (.+)/, (msg, match) => {
//     chatId = msg.chat.id;
//     const parameter = match[1]; // Получаем переданный параметр
//     console.log('\n\n\n\ FROM TG telegram id ',chatId)
//
// });


// // Listener for the /start command
// bot.onText(/\/start/, (msg) => {
//     chatId = msg.chat.id;
//     userId = msg.from.id;
//
//     // bot.sendMessage(chatId, 'Test');
//     // Проверяем, если пользователь отправил команду /start
//     bot.sendMessage(chatId, 'Для продолжения, пожалуйста, нажмите "Подтвердить".' + userId, keyboard);
// });

// // Обработка команды /status
// bot.onText(/\/status/, async (msg) => {
//     chatId = msg.chat.id;
//     userId = msg.from.id;
//
//     try {
//         // Получение информации о пользователе
//         const memberInfo = await bot.getChatMember(groupId, userId);
//         const status = JSON.stringify(memberInfo);
//
//         // Проверка привилегий пользователя
//         if (memberInfo.status === 'administrator' || memberInfo.status === 'creator') {
//             bot.sendMessage(chatId, 'У вас есть привилегии в этой группе.');
//         } else {
//             bot.sendMessage(chatId, 'У вас нет привилегий в этой группе.');
//         }
//         // Отправка статуса пользователя
//         bot.sendMessage(chatId, `Статус пользователя в группе: ${status}`);
//     } catch (error) {
//         console.error('Ошибка:', error);
//         bot.sendMessage(chatId, 'Произошла ошибка при получении статуса пользователя.');
//     }
// });
//
// // Listener для кнопки "Подтвердить"
// bot.onText(/Подтвердить/, (msg) => {
//
//     // Check if the user is a member of the group
//     bot.getChatMember(groupId, userId).then((chatMember) => {
//         if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
//             // User is a member of the group, send a confirmation to the database
//             // You can implement your database logic here
//
//             bot.sendMessage(chatId, 'You are already a member of the group. Sending a confirmation to the database...');
//             // Обработка нажатия кнопки "Подтвердить"
//             bot.sendMessage(chatId, 'Вы подтверждены!');
//         } else {
//             // User is not a member of the group, ask them to join
//             bot.sendMessage(chatId, 'To continue, please join the group.');
//             // bot.sendMessage(chatId, 'Вы подтверждены!');
//         }
//     }).catch((error) => {
//         console.error('Error checking user membership:', error);
//     });
// });

// // Start listening for messages
// bot.on('message', (msg) => {
//     // Handle other messages or commands as needed
// });
