const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const token = '536012378:AAGyTAsny5Llqg4SF5--iICStKmlb-d0IrQ';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.static('site-emulator/site'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/auth', function (req, res) {
	// bot.sendMessage(chatId, 'hello world', keyboard);
	res.send(JSON.stringify(req.body));
});


app.listen(98, function () {
	console.log('Приклад застосунку, який прослуховує 98-ий порт!');
});

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
