const TelegramBot = require('node-telegram-bot-api');
const token = '536012378:AAGyTAsny5Llqg4SF5--iICStKmlb-d0IrQ';

console.log('Bot has been started...');
const bot = new TelegramBot(token, {

	polling: {
		interval: 300,
		autoStart: true,
		params: {
			timeout: 10
		}
	}

});

bot.onText(/^\/keyboard$/g, (msg) => {
	const chatId = msg.chat.id

	var keyboard = {
		reply_markup: JSON.stringify({
			keyboard: [
				['один'],
				['два'],
				['три'],
				['чотири']
			]
		})
	}

	// send a message to the chat acknowledging receipt of their message
	bot.sendMessage(chatId, 'hello world', keyboard);
});
bot.on('message', (msg) => {
	console.log(msg);
	if(msg.text == 'один') {
		bot.sendMessage(msg.chat.id, 'Ви ввели ' + msg.text + ', ' + msg.from.first_name);
	}
	else if(msg.text == 'два') {
		bot.sendMessage(msg.chat.id, 'Ви ввели ' + msg.text + ', ' + msg.from.first_name);
	}
	else if(msg.text == 'три') {
		bot.sendMessage(msg.chat.id, 'Ви ввели ' + msg.text + ', ' + msg.from.first_name);
	}
	else if(msg.text == 'чотири') {
		bot.sendMessage(msg.chat.id, 'Ви ввели ' + msg.text + ', ' + msg.from.first_name);
	}
	else bot.sendMessage(msg.chat.id, 'Ви ввели якусь дічь, ' + msg.from.first_name);
});
