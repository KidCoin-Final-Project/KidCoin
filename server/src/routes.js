const express = require('express');
const router = express.Router();
const middleware = require('./misc/middleware')
const unless = require('express-unless');

middleware.authenticate.unless = unless

router.use(middleware.authenticate.unless({ path: ['/auth/signup', '/api-docs/'] }));

router.use('/auth', require('./api/authAPI'))

router.use('/store', require('./api/storeAPI'))

router.use('/moneyTransfer', require('./api/moneyTransferAPI'))

router.use('/product', require('./api/productAPI'))

router.use('/child', require('./api/childAPI'))

router.use('/transaction', require('./api/transactionAPI'))

router.use('/parent', require('./api/parentAPI'))


module.exports = router;

