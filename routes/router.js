const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: true,
}));

// Pages required
const homepage = require('./src/index');
const carousel = require('./src/carousel');
const offline = require('./src/offline');

// Make routes
router.use('/', homepage);
router.use('/', carousel);
router.use('/', offline);


module.exports = router;
