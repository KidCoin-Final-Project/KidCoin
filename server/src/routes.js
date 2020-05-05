const express = require('express');
const router = express.Router();
const middleware = require('./utils/middleware')

router.use(middleware.authenticate)

router.use('/product', require('./api/productAPI'))

router.use('/child', require('./api/childAPI'))

module.exports = router;

