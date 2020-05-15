const dbConnection = require('../config/mongoConnection');
const users = require('../data/users');
const posts = require('../data/posts');
const tips = require('../data/tips');

async function main() {
	const db = await dbConnection();

	await db.dropDatabase();

	const pierce = await users.addUser('pierce', '$2a$05$dGezPJUuIglDyKbrWM/sOuYD8ZTEsqYm6xX2DcjFM8PKxsqwZsBcG', 'piercecohen1@gmail.com');
	const id = pierce._id;
    
    console.log(users);
    console.log(tips);
    console.log(posts);
    

	await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);

	await posts.addPost(
		'Using the seed',
		'We use the seed to have some initial data so we can just focus on servers this week',
		[],
		id
	);
    
	await posts.addPost('Using routes', 'The purpose of today is to simply look at some GET routes', [], id);

	await tips.addTip("pierce's First Post", "I'm 6 months old, I can't blog1", [], pierce._id);
	await tips.addTip(
		"pierce's Second Post",
		"I'm still 6 months old, I told you already, I can't blog1",
		[],
		pierce._id
	);

	await tips.addTip(
        "This is a tip!",
        "Made by Pierce",
        "This tip is very helpful isn't it?",
        [],
        id);
    
	await tips.addTip(
        "Here's another tip!",
        "Made by himanshu",
        "This one is the best.",
        [],
        pierce._id);

	console.log('Done seeding database');
	await db.serverConfig.close();
}

main().catch((error) => {
	console.error(error);
	return dbConnection().then((db) => {
		return db.serverConfig.close();
	});
});