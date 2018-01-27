const TelegramBot = require('node-telegram-bot-api');
const token = '536012378:AAGyTAsny5Llqg4SF5--iICStKmlb-d0IrQ';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/keyboard$/g, (msg) => {
	const chatId = msg.chat.id;

	var keyboard = {
		reply_markup: JSON.stringify({
			keyboard: [
				['Uno'],
				['Dos'],
				['Tres'],
				['Cuatro']
			]
		})
	};

	// send a message to the chat acknowledging receipt of their message
	bot.sendMessage(chatId, 'hello world', keyboard);
});
