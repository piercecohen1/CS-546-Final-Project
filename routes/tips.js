const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/tips');
});

router.post('/', async (req, res) => {
    const data = req.body;
    if(!data || !data.title || !data.description){
        res.status(400).render('pages/tips', {error: true});
    }else{
        res.status(400).render('partials/tips_item', {title: data.title, tip: data.description});
    }
});
  
module.exports = router;
  