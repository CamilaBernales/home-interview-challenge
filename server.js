const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const connectDB = require('./db');
//Configuration requires
const ConfigurationModel = require('./models/inputs.json');
const ConfigurationService = require('./services/ConfigurationService');
const ConfigurationController = require('./controllers/ConfigurationController');
const User = require('./models/User');
const bcryptjs = require('bcryptjs');
//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
	ConfigurationModel
);

const ConfigurationControllerInstance = new ConfigurationController(
	ConfigurationServiceInstance
);
const validatePass = (pass) => {
	if (!pass) {
		return res.status(403).json({
			msg: 'Email or password invalid.',
		});
	} else {
		return res.json({
			msg: 'Welcome.',
		});
	}
};

app.prepare().then(() => {
	const server = express();
	connectDB();
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
				return res.status(404).json({msg: 'Invalidate path'});
			}
		} catch (error) {
			return res.json({msg: 'An error ocurred in server'}).status(500);
		}
	});

	server.post('/:path', async (req, res) => {
		const {path} = req.params;
		try {
			if (Object.keys(req.body).length !== 0) {
				let {username, password} = req.body;
				let user = await User.findOne({ username });
				if(!user) return res.status(404).json({
					msg: 'User not found.',
				});
				if (path === 'register') {
					if (user) {
						return res.status(400).json({msg: 'Username alredy in use'});
					} else {
						user = new User(req.body);
						const salt = await bcryptjs.genSalt(10);
						user.password = await bcryptjs.hash(password, salt);
						await user.save();
						return res.status(200).json({msg: 'data received'});
					}
				} else {
					const validPass = await bcryptjs.compare(password, user.password);
					validatePass(validPass);
				}
			} else {
				return res.status(400).json({msg: 'invalid data'});
			}
		} catch (error) {
			return res.json({msg: 'An error ocurred in server'}).status(500);
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
