const express = require('express');
const data = require('../data');

const router = express.Router();
const tipData = require('../data/tips');

router.get('/', async (req, res) => {
    res.render('pages/tips');
});

router.get('/new', async (req, res) => {
    res.render('pages/new/createtip');
});

router.post('/new', async (req, res) => {
    const postdata = req.body;
    if(!postdata || !postdata.title || !postdata.description){
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
      res.status(500).json({error: e});
    }
    // res.send('partials/tips_item', {title: data.title, tip: data.description});

});

module.exports = router;
