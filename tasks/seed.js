const dbConnection = require('../config/mongoConnection');
<<<<<<< HEAD
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
=======
const data = require('../data/');
const bcrypt = require('bcryptjs');
const users = data.users;
const posts = data.posts;
const tips = data.tips;

async function main() {
  const db = await dbConnection();

  await db.dropDatabase();

  const hash = await bcrypt.hash("Hill", 5);
  const patrick = await users.addUser('Patrick', hash);
  const id = patrick._id;

  await posts.addPost('Hello, class!', 'Today we are creating a blog!', [], id);

  await posts.addPost(
    'Using the seed',
    'We use the seed to have some initial data so we can just focus on servers this week',
    [],
    id
  );
  await posts.addPost(
    'Using routes',
    'The purpose of today is to simply look at some GET routes',
    [],
    id
  );

  await posts.addPost(
    'Great new post',
    'Wow this post sure is great I am glad I posted it',
    [],
    id
  );
  await posts.addPost(
    'Political post',
    'This is a hypothetical angry political post that should be deleted by the mpds',
    [],
    id
  );
  const hash2 = await bcrypt.hash("Hill2", 5);
  const aiden = await users.addUser('Aiden', hash2);
  await posts.addPost(
    "Aiden's First Post",
    "I'm 6 months old, I can't blog1",
    [],
    aiden._id
  );
  await tips.addTip(
    "Tip header",
    "Tip description",
    [],
    aiden._id
  );
  await tips.addTip(
    "Tip yup this is a tip",
    "Tip haha yeah this is a tip description",
    [],
    aiden._id
  );
  await tips.addTip(
    "third tips the charm",
    "Tip of the morning to yah",
    [],
    aiden._id
  );
  await posts.addPost(
    "Aiden's Second Post",
    "I'm still 6 months old, I told you already, I can't blog1",
    [],
    aiden._id
  );
  console.log('Done seeding database');
  await db.serverConfig.close();
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
}

main().catch((error) => {
	console.error(error);
	return dbConnection().then((db) => {
		return db.serverConfig.close();
	});
});