const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const querystring = require('querystring');
//const token = '536012378:AAGyTAsny5Llqg4SF5--iICStKmlb-d0IrQ';
const token = '545750196:AAGtPP3eNi7uKfF7dRPc2ycwuytsExLtp10';
//const token = '530694020:AAHpJUFS9Lk9Gim9RYo8B-q-SrsDagmCVjo';
const getTime = new Date();

//time when program was started
console.log("\nBot has been started at " + getTime);

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.static('site-emulator/site'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/auth', function (req, res) {
	console.log(req.body);
	res.send(JSON.stringify(req.body));
	// res.end('test response');
});

app.listen(98, function () {
	console.log('Приклад застосунку, який прослуховує 98-ий порт!');
});

const user_data = [];


bot.on('message', msg => {

	const msg_data = [`${msg.chat.id}`, `${msg.chat.first_name}`, `${msg.chat.last_name}`, `${msg.chat.username}`];
	const chatId = msg.chat.id;
	console.log(msg);

	for (let i = 0; i < msg_data.length; i++)
	user_data[i] = msg_data[i];

	let request = http.request({
		host: 'localhost',
		method: 'post',
		path: '/auth',
		port: 98,
		headers: {
			'Content-Type': 'application/json'
		}
	}, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

		res.setEncoding('utf8');

		let output = '';

		res.on('data', (chunk) => {
			// console.log(`BODY: ${chunk}`);
			output += chunk;
		});

		res.on('end', () => {
			console.log('No more data in response.');
			let a = JSON.parse(output);

			bot.sendMessage(chatId, `${a.id} - ${a.first_name}`);
		});
	})


	// відправка запиту на сайт
	request.write(JSON.stringify({
		id: msg.chat.id,
		first_name: msg.chat.first_name
	}));

	request.end();

	if(msg.text == 'Close keyboard'){
		bot.sendMessage(chatId, 'Closing keyboard', {
			reply_markup: {
				remove_keyboard: true
			}
		})
	}
	else if(msg.text == 'Get inline keyboard') {
		bot.sendMessage(chatId, 'Inline Keyboard', {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'First inline',
							callback_data: 'first_inline'
						}
					],
					[
						{
							text: 'Second inline',
							callback_data: 'second_inline'
						}
					]
				]
			}
		})
	}
	else {
		bot.sendMessage(chatId, 'Keyboard', {
			reply_markup: {
				keyboard: [
					[{
						text: 'Get location',
						request_location: true
					}],
					[{
						text: 'Get contact',
						request_contact: true
					}],
					['Get inline keyboard', 'Close keyboard']
				]
			}
		});
		for(var i = 0; i < user_data.length; i++)
		{

			console.log(user_data[i]);
		}
	}
});

bot.on('callback_query', query => {
	bot.answerCallbackQuery(query.id, `${query.data}`)
})

bot.on('inline_query', query => {
	const array = ['https://www.google.com/', 'https://www.wikipedia.org/', 'https://wikileaks.org/',
	'https://core.telegram.org', 'https://telegram.org/'];
	const result = [];
	for(let i = 0; i < 5; i++)
	{
		result.push({
			type: 'article',
			id: i.toString(),
			title: 'Title ' + i,
			input_message_content: {
				message_text: (i + 1).toString(),
				disable_web_page_preview: false
			},
			url: array[i].toString()
		});
	}

	bot.answerInlineQuery(query.id, result, {
		cached_time: 0
	})
})
// bot.onText(/^\/keyboard$/g, (msg) => {
// 	const chatId = msg.chat.id;
// 	console.log(msg);
// 	var keyboard = {
// 		reply_markup: JSON.stringify({
// 			keyboard: [
// 				['Uno'],
// 				['Dos'],
// 				['Tres'],
// 				['Cuatro']
// 			]
// 		})
// 	};
// 	console.log(keyboard);
//
// 	// send a message to the chat acknowledging receipt of their message
// 	bot.sendMessage(chatId, 'hello world', keyboard);
// });
