const express = require('express');
const router = express.Router();
const middleware = require('./utils/middleware')
const unless = require('express-unless');

middleware.authenticate.unless = unless
 
router.use(middleware.authenticate.unless({ path: ['/auth/signup'] }));

router.use('/auth', require('./api/authAPI'))

router.use('/product', require('./api/productAPI'))

router.use('/child', require('./api/childAPI'))

module.exports = router;

