const express = require('express');
const router = express.Router();
const data = require('../data');
const tipData = data.tips;
const userData = data.users;
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
router.get('/new', async (req, res) => {
  const users = await userData.getAllUsers();
  res.render('pages/newtip', { users: users });
});
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
router.get('/:id', async (req, res) => {
  try {
    const tip = await tipData.getTipById(req.params.id);
    res.render('pages/newtip', { tip: tip });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
router.get('/tag/:tag', async (req, res) => {
  const tipList = await tipData.getTipsByTag(req.params.tag);
  res.render('pages/index', { tips : tipList });
});
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
router.get('/', async (req, res) => {
  const tipList = await tipData.getAllTips();
  res.render('pages/index', { tips: tipList });
});
<<<<<<< HEAD

router.post('/', async (req, res) => {
  let tipPostData = req.body;
  let errors = [];

  if (!tipPostData.title) {
    errors.push('No title provided');
  }

  if (!tipPostData.body) {
    errors.push('No body provided');
  }

  if (!tipPostData.posterId) {
    errors.push('No poster selected');
  }

=======
router.post('/', async (req, res) => {
  let tipPostData = req.body;
  let errors = [];
  if (!tipPostData.title) {
    errors.push('No title provided');
  }
  if (!tipPostData.body) {
    errors.push('No body provided');
  }
  if (!tipPostData.posterId) {
    errors.push('No poster selected');
  }
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
  if (errors.length > 0) {
    const users = await userData.getAllUsers();
    res.render('pages/newtip', {
      errors: errors,
      hasErrors: true,
      tip: tipPostData,
      users: users
    });
    return;
  }
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
  try {
    const newTip = await tipData.addTip(
      tipPostData.title,
      tipPostData.body,
      tipPostData.tags || [],
      tipPostData.posterId
    );
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
    res.redirect(`/tips/${newTip._id}`);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
router.put('/:id', async (req, res) => {
  let updatedData = req.body;
  try {
    await tipData.getTipById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Tip not found' });
    return;
  }
  try {
    const updatedTip = await tipData.updateTip(req.params.id, updatedData);
    res.json(updatedTip);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
router.delete('/:id', async (req, res) => {
  try {
    await tipData.getTipById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Tip not found' });
    return;
  }
<<<<<<< HEAD

=======
>>>>>>> 00b225130535529a7dab2bd1087e7741f6748da4
  try {
    await tipData.removeTip(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;