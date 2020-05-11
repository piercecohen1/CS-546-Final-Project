const pollsRoutes = require('./polls');
const tipsRoutes = require('./tips');
const whattodoRoutes = require('./whattodo');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/polls', pollsRoutes);
  app.use('/tips', tipsRoutes);
  app.use('/whattodo', whattodoRoutes);

	app.get('/', (req, res) => {
		res.render('pages/login', {error: false});
  });

	app.use('*', (req, res) => {
		res.render('pages/login', {error: false});
	});
};

module.exports = constructorMethod;
