const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.resolve('static/tips.html'));
});
  
module.exports = router;
  