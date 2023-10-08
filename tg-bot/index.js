const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot('6645296253:AAFzHpMt1P2fzH5f1Wx3RY7Wm1TAyfz0zMg', { polling: true });

// Define the group chat ID where you want to check membership
const groupId = -4010066261; // Replace with your group chat ID
let chatId;
let userId;

// Объект с настройками клавиатуры
const keyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Подтвердить' }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};

// Listener for the /start command
bot.onText(/\/start/, (msg) => {
    chatId = msg.chat.id;
    userId = msg.from.id;

    // bot.sendMessage(chatId, 'Test');
    // Проверяем, если пользователь отправил команду /start
    bot.sendMessage(chatId, 'Для продолжения, пожалуйста, нажмите "Подтвердить".', keyboard);
});


// Listener для кнопки "Подтвердить"
bot.onText(/Подтвердить/, (msg) => {

    // Check if the user is a member of the group
    bot.getChatMember(groupId, userId).then((chatMember) => {
        if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
            // User is a member of the group, send a confirmation to the database
            // You can implement your database logic here

            bot.sendMessage(chatId, 'You are already a member of the group. Sending a confirmation to the database...');
            // Обработка нажатия кнопки "Подтвердить"
            bot.sendMessage(chatId, 'Вы подтверждены!');
        } else {
            // User is not a member of the group, ask them to join
            bot.sendMessage(chatId, 'To continue, please join the group.');
            // bot.sendMessage(chatId, 'Вы подтверждены!');
        }
    }).catch((error) => {
        console.error('Error checking user membership:', error);
    });
});

// Start listening for messages
bot.on('message', (msg) => {
    // Handle other messages or commands as needed
});
