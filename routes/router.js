const express = require('express');
const router = express.Router();

// Pages required
const homepage = require('./src/index');


// Make routes
router.use('/', homepage);

module.exports = router;
