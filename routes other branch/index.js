const tipRoutes = require('./tips');
const userRoutes = require('./users');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/tips', tipRoutes);
  app.use('/users', userRoutes);
  app.get('/about', (req, res) => {
    res.sendFile(path.resolve('static/about.html'));
  });

  app.use('*', (req, res) => {
    res.redirect('/home');
  });
};

module.exports = constructorMethod;
