const express = require('express');
const data = require('../data');

const router = express.Router();
const tipData = data.tips;

router.get('/', async (req, res) => {
    res.render('pages/tips');
});

router.get('/new', async (req, res) => {
    res.render('pages/new/createtip');
});

router.post('/', async (req, res) => {
    const data = req.body;
    if(!data || !data.title || !data.description){
        res.status(400).render('pages/tips', {error: true});
    }
    try{
      const newTip = await tipData.addPost(
        data.title,
        data.description
      );

      res.redirect('/tips');
    } catch (e) {
      res.status(500).json({error: e});
    }
    // res.send('partials/tips_item', {title: data.title, tip: data.description});

});

module.exports = router;
