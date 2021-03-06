const express = require('express');
const router = express.Router();
const middleware = require('./misc/middleware')
const unless = require('express-unless');

middleware.authenticate.unless = unless

router.use(middleware.authenticate.unless({ path: ['/auth/signup', '/auth/all', '/api-docs/', '/api-docs', '/product/addImage'] }));

router.use('/auth', require('./api/authAPI'))

router.use('/moneyRequest', require('./api/moneyRequestAPI'))

router.use('/store', require('./api/storeAPI'))

router.use('/product', require('./api/productAPI'))

router.use('/child', require('./api/childAPI'))

router.use('/purchase', require('./api/purchaseAPI'))

router.use('/parent', require('./api/parentAPI'))

router.use('/productsInStore', require('./api/productsInStoreAPI'))

router.use('/productReview', require('./api/productReviewAPI'))


module.exports = router;

