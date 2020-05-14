const express = require('express');
const router = express.Router();
const data = require('../data');
const tipData = data.tips
const userData = data.users

router.get('/new', async (req, res) => {
    const users = await userData.getAllUsers();
    res.render('tips/new', { users: users });
});

router.get('/:id', async (req, res) => {
  try {
    const tip = await tipData.getTipById(req.params.id);
    res.render('tips/single', { tip: tip });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});



//router.get('/', async (req, res) => {
//    const tipsList = await tipData.getAllTips();
//    res.render('pages/tips', {tips: tipsList});
//});
//
//router.get('/new', async (req, res) => {
//    res.render('pages/new/createtip');
//});

router.post('/new', async (req, res) => {
    const postdata = req.body;
    if(!postdata || !postdata.title || !postdata.description){
        console.log("ERROR");
        res.status(400).render('pages/tips', {error: true});
    }
    try{
      const {title, description} = postdata;
      const newTip = await tipData.addTip(
        title,
        description
      );

      res.json(newTip);
      // res.redirect('/tips');
    } catch (e) {
      console.log("Caught an error");
      res.status(500).json({error: e});
    }
    // res.send('partials/tips_item', {title: data.title, tip: data.description});

});

module.exports = router;
