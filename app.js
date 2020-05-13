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


// app.get('/tips', (req, res) => {
// 	const tips = [{
// 		title: 'Test tip',
// 		description: 'test desc'
// 	}]
// 	res.render('tips', {tips: tips})
// })


const bcrypt = require('bcryptjs');

const handlebarsInstance = exphbs.create({
	defaultLayout: 'main',
	// Specify helpers which are only registered on this instance.
	helpers: {
	  asJSON: (obj, spacing) => {
		if (typeof spacing === 'number') return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

		return new Handlebars.SafeString(JSON.stringify(obj));
	  }
	},
	partialsDir: ['views/partials/']
  });

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

app.use('/home', (req, res) => {
	if (!req.session.AuthCookie) {
		res.render('pages/login');
	} else {
		res.render('pages/home');
	}
});

app.get('/login', (req, res) => {
	if (!req.session.AuthCookie) {
		res.render('pages/login');
	} else {
		res.render('pages/home');
	}
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
