/*global require, process, console*/
var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request'),
	app = express(),
	port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

// error handling
app.use(function (err, req, res, next) {
	'use strict';

	console.error(err.stack);
	res.status(500).send('Erro inesperado!');
});

var sessions = [];

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

	next();
})

app.get('/', function (req, res, next) {
	return res.send('ok');
});

app.post('/search', function (req, res, next) {
	var entry = {
		from: req.body.from,
		timestamp: new Date().getTime(),
		cardDetails: req.body.cardDetails
	};

	console.log('Origem = ' + req.body.from);

	sessions.push(entry);

	// incluir filtro por coordenadas tb

	setTimeout(function () {
		var matches = [];

		console.log('Procurando por pares do = ' + req.body.from);

		for (var i = sessions.length - 1; i >= 0; i--) {
			var session = sessions[i];

			if (Math.abs(session.timestamp - entry.timestamp) < 1000) {
				if (session.from !== entry.from) {
					matches.push(session.cardDetails)
				}
			} else {
				sessions.splice(i, 1);
			}
		}

		res.send(matches);
	}, 1000);
});

app.get('/zipcode/:zipCode', function (req, res, next) {
	var zipCode = req.params.zipCode;

	if (zipCode) {
		request.get('http://correiosapi.apphb.com/cep/' + zipCode, function (error, response, body) {
			if (error) {
				console.log(error);
				return res.status(500).send(error);
			}

			return res.send(response.body);
		});
	} else {
		return res.status(404).send('CEP inválido');
	}
});

app.get('/clear', function (req, res, next) {
	userList = [];
});

app.listen(port);
console.log('>> Server started listening on port ' + port);