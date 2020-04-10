const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.resolve('static/polls.html'));
});
  
module.exports = router;
  