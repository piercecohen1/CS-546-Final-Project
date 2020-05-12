const express = require('express');
const session = require('express-session');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bcrypt = require('bcryptjs');

app.use(
	session({
		name: 'Session',
		secret: 'secret',
		saveUninitialized: true,
		resave: false
	})
);

app.use('/logout', (req, res, next) => {
	if (!req.session.AuthCookie) {
		res.render('pages/login');
	} else {
		next();
	}
});

app.use('/tips', (req, res, next) => {
	if (!req.session.AuthCookie) {
		res.render('pages/login');
	} else {
		next();
	}
});

app.use('/polls', (req, res, next) => {
	if (!req.session.AuthCookie) {
		res.render('pages/login');
	} else {
		next();
	}
});

app.use('/whattodo', (req, res, next) => {
	if (!req.session.AuthCookie) {
		res.render('pages/login');
	} else {
		next();
	}
});

app.use('/home', (req, res, next) => {
	if (!req.session.AuthCookie) {
		res.render('pages/login');
	} else {
		next();
	}
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
