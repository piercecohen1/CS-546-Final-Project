const pollsRoutes = require('./polls');
const tipsRoutes = require('./tips');
const whattodoRoutes = require('./whattodo');
const userData = require('../data/users');
const path = require('path');
const bcrypt = require('bcryptjs');
const saltRounds = 5;

const constructorMethod = (app) => {
  	app.use('/polls', pollsRoutes);
  	app.use('/tips', tipsRoutes);
	app.use('/whattodo', whattodoRoutes);
	  
	app.post('/login', async (req, res) => {
		const data = req.body;
		if(!data || !data.username || !data.password){
			res.status(400).render('pages/login', {error: true});
		}else{
			const allUsers = await userData.getAllUsers();
			var i;
			var uname;
			for (i = 0; i < allUsers.length; i++) {
				tuser = allUsers[i];
				if (tuser.userName === data.username){
					uname = tuser;
				}else{
					uname = undefined;
				}
			}
			try{
				if(uname == undefined){
					return res.status(401).render('pages/login', {error: true});
				}
			}catch(e){
				return res.status(401).render('pages/login', {error: true});
			}
			let compare = false;
			try{
				compare = await bcrypt.compare(data.password, uname.hashedPassword);
			}catch(e){
				return res.status(401).render('pages/login', {error: true});
			}
			if(!compare){
				res.status(401).render('pages/login', {error: true});
			}else{
				req.session.user = uname;
				req.session.AuthCookie = true;
				return res.render('pages/home');
			}
		}
	});

	app.post('/signup', async (req, res) => {
		const data = req.body;
		if(!data || !data.username || !data.password){
			res.status(400).render('pages/login', {serror: true});
		}else{
			const allUsers = await userData.getAllUsers();
			var i;
			for (i = 0; i < allUsers.length; i++) {
				tuser = allUsers[i];
				if (tuser.userName == data.username){
					var uname = tuser;
				}
			}
			if(uname != undefined){
				res.status(401).render('pages/login', {serror: true});
			}else{
				const hash = await bcrypt.hash(data.password, saltRounds);
				const user = await userData.addUser(data.username, hash);
	
				req.session.user = user;
				req.session.AuthCookie = true;
				return res.render('pages/home');
			}
		}
	});

	app.get('/logout', (req, res) => {
		if(!req.session.AuthCookie){
			res.render('pages/login', {error: false});
		}else{
			const anHourAgo = new Date();
			anHourAgo.setHours(anHourAgo.getHours() - 1);
			res.clearCookie('AuthCookie');
			res.clearCookie('user');
			req.session.destroy();
			res.render('pages/logout');
		}
	});

	app.get('/delete', async (req, res) => {
		if(!req.session.AuthCookie){
			res.render('pages/login', {error: false});
		}else{
			const teuser = await userData.removeUser(req.session.user._id);
			const anHourAgo = new Date();
			anHourAgo.setHours(anHourAgo.getHours() - 1);
			res.clearCookie('AuthCookie');
			res.clearCookie('user');
			req.session.destroy();
			res.render('pages/login', {deleted: true});
		}
	});

  	app.get('/', (req, res) => {
		res.render('pages/login', {error: false});
  	});

	app.use('*', (req, res) => {
		res.render('pages/login', {error: false});
	});
};

module.exports = constructorMethod;
