const express = require('express');
const router = express.Router();
const transactionSRV = require('../services/transactionSRV')
const middleware = require('../misc/middleware')
const utils = require('../misc/utils')

router.get('/byChild/:childID', function (req, res) {
    transactionSRV.getChildTransactions(req.params.childID).then(child => {
        return res.send(child);
    });
});

router.get('/byOwner/', middleware.isUserOwner, function (req, res) {
    transactionSRV.getStoreTransactions(req).then(store => {
        return res.send(store);
    });
});



module.exports = router;