const http = require('http');
const path = require('path');
const fs = require('fs');



const server = http.createServer((req, res) => {
	let html = fs.readFile(path.resolve(__dirname, 'site/index.html'), (err, data) => {
		if(err) throw new Error(err);

		res.setHeader('Content-Type', 'text/html');
		res.end(data.toString());
	})
});

server.listen(98, 'localhost');
