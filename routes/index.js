const pollsRoutes = require('./polls');
const tipsRoutes = require('./tips');
const whattodoRoutes = require('./whattodo');
const path = require('path');

const constructorMethod = (app) => {
    //app.use('/polls', pollsRoutes);
    //app.use('/tips', tipsRoutes);
    //app.use('/whattodo', whattodoRoutes);
	app.get('/', (req, res) => {
		res.sendFile(path.resolve('static/home.html'));
    });
    app.get('/tips', (req, res) => {
		res.sendFile(path.resolve('static/tips.html'));
    });
    app.get('/whattodo', (req, res) => {
		res.sendFile(path.resolve('static/whattodo.html'));
    });
    app.get('/polls', (req, res) => {
		res.sendFile(path.resolve('static/polls.html'));
	});

	app.use('*', (req, res) => {
		res.sendFile(path.resolve('static/home.html'));
	});
};

module.exports = constructorMethod;
