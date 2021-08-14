const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const bodyParser = require('body-parser');
//Configuration requires
const ConfigurationModel = require('./models/inputs.json');
const ConfigurationService = require('./services/ConfigurationService');
const ConfigurationController = require('./controllers/ConfigurationController');

//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
	ConfigurationModel
);

const ConfigurationControllerInstance = new ConfigurationController(
	ConfigurationServiceInstance
);

app.prepare().then(() => {
	const server = express();
	server.use(
		express.urlencoded({
			extended: true,
		})
	);
	server.use(express.json());
	//get configuration by path
	server.get('/configuration/:path', (req, res) => {
		const {path} = req.params;
		try {
			if (path == 'login') {
				return res.status(200).json(ConfigurationModel.login);
			} else if (path == 'register') {
				return res.status(200).json(ConfigurationModel.register);
			} else {
				return res.status(404).json({"msg": 'Invalidate path'});
			}
		} catch (error) {
			return res.json({"msg": 'An error ocurred in server'}).status(500);
		}
	});

	server.post('/:path', (req, res) => {
		try {
			if (Object.keys(req.body).length !== 0) {
				return res.status(200).json({"msg": 'data received'});
			} else {
				return res.status(400).json({"msg": 'invalid data'});
			}
		} catch (error) {
			return res.json({"msg": 'An error ocurred in server'}).status(500);
		}
	});

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
