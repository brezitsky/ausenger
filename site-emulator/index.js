/*******************************************************************************
*********************** емуляція серверної логіки ******************************
*******************************************************************************/
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const querystring = require('querystring');
const objectMerge = require('object-merge');

// створюєм тестовий сервер
const app = express();

// тестовий сервер бере звідси статичні файли
app.use(express.static('site-emulator/site'));

// сервер парсить запити типу application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// сервер парсить запити типу application/json
app.use(bodyParser.json());

//сервер слухає вхідні POST-запити на урл '/auth'
app.post('/auth', function (req, res) {

	// вхідні параметри запиту, який надіслав бот на сервер
	let body = req.body;

	/*
	На цьому місці відпрацьовує сервер. Він якось обробляє вхідні дані, дивиться,
	чи є такий юзер в системі чи ше щось тіпа того. Коротше кажучи, виконує ЯКІСЬ
	логічні дії і видає результат.
	*/
	function someServerLogic() {
		// TODO: реалізувати ЯКІСЬ дії сервера

		// сервена логіка повертає параметри запиту
		return body;
	}

	res.send(JSON.stringify(someServerLogic()));
});

// запускаєм сервер і слухаєм порт
app.listen(98, function () {
	console.log('Приклад застосунку, який прослуховує 98-ий порт!');
});

/*******************************************************************************
******************* кінець емуляції серверної логіки ***************************
*******************************************************************************/

/**
@param {Object || Undefined} params - параметри запиту
@param {Function} callback - функція, яка відпрацює після запиту
*/
function authRequest(params, callback) {

	let requestParams = {
		host: 'localhost',
		method: 'post',
		path: '/auth',
		port: 98,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	let request = http.request(requestParams, (res) => {
		res.setEncoding('utf8');

		let output = '';

		// клеїть відповідь від сервера (чанки)
		res.on('data', (chunk) => {
			output += chunk;
		});

		/*
		після того, як всі дані отримані і склеєні, викликає функцію (яка передана
		в аргумент) і передає їй відповідь від сервера у вигляді масиву
		*/
		res.on('end', () => {
			callback(JSON.parse(output));
		});
	})

	// відправка запиту на сайт
	request.write(JSON.stringify(params));

	request.end();
}


const TelegramBot = require('node-telegram-bot-api');
const token = '545750196:AAGtPP3eNi7uKfF7dRPc2ycwuytsExLtp10';
const getTime = new Date();

//time when program was started
console.log("\nBot has been started at " + getTime);
const bot = new TelegramBot(token, {polling: true});

// bot.onText(/\/start/g, msg => {
//
// })

bot.onText(/\/start/, msg => {
	//const msg_data = [`${msg.chat.id}`, `${msg.chat.first_name}`, `${msg.chat.last_name}`, `${msg.chat.username}`];
	const chatId = msg.chat.id;
	console.log(msg);
		bot.sendMessage(chatId, 'You allowed this bot to message you when you logged on site.')
})

bot.on('message', msg => {
	console.log(msg);
})

	// for (let i = 0; i < msg_data.length; i++)
	// user_data[i] = msg_data[i];

	// let authData = {
	// 	id: msg.chat.id,
	// 	first_name: msg.chat.first_name,
	// 	last_name: msg.chat.last_name,
	// 	username: msg.chat.username
	// };

// 	authRequest(authData, data => {
// 		bot.sendMessage(chatId, `ID: ${data.id}\nName: ${data.first_name} ${data.last_name}\nUsername: ${data.username}`);
// 	});
//
// 	if(msg.text == 'Close keyboard'){
// 		bot.sendMessage(chatId, 'Closing keyboard', {
// 			reply_markup: {
// 				remove_keyboard: true
// 			}
// 		})
// 	}
// 	else if(msg.text == 'Get inline keyboard') {
// 		bot.sendMessage(chatId, 'Inline Keyboard', {
// 			reply_markup: {
// 				inline_keyboard: [
// 					[
// 						{
// 							text: 'First inline',
// 							callback_data: 'first_inline'
// 						}
// 					],
// 					[
// 						{
// 							text: 'Second inline',
// 							callback_data: 'second_inline'
// 						}
// 					]
// 				]
// 			}
// 		})
// 	}
// 	else {
// 		bot.sendMessage(chatId, 'Keyboard', {
// 			reply_markup: {
// 				keyboard: [
// 					[{
// 						text: 'Get location',
// 						request_location: true
// 					}],
// 					[{
// 						text: 'Get contact',
// 						request_contact: true
// 					}],
// 					['Get inline keyboard', 'Close keyboard']
// 				]
// 			}
// 		});
// 	}
// });

// bot.on('callback_query', query => {
// 	bot.answerCallbackQuery(query.id, `${query.data}`)
// })

// bot.on('inline_query', query => {
// 	const array = ['https://www.google.com/', 'https://www.wikipedia.org/', 'https://wikileaks.org/',
// 	'https://core.telegram.org', 'https://telegram.org/'];
// 	const result = [];
// 	for(let i = 0; i < 5; i++)
// 	{
// 		result.push({
// 			type: 'article',
// 			id: i.toString(),
// 			title: 'Title ' + i,
// 			input_message_content: {
// 				message_text: (i + 1).toString(),
// 				disable_web_page_preview: false
// 			},
// 			url: array[i].toString()
// 		});
// 	}
//
// 	bot.answerInlineQuery(query.id, result, {
// 		cached_time: 0
// 	})
// })
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
