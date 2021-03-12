const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: true,
}));

router.use(bodyParser.urlencoded({
  extended: true,
}));
// Pages required
const homepage = require('./src/index');
const carousel = require('./src/carousel');

// Make routes
router.use('/', homepage);
router.use('/', carousel);


module.exports = router;
