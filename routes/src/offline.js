const express = require('express');
const router = express.Router();

router.get('/offline', (req, res) => {
  return res.render('offline.ejs');
});


module.exports = router;
