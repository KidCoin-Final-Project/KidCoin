const express = require('express');
const router = express.Router();
const transactionSRV = require('../services/transactionSRV')

router.get('/child/:childID', function (req, res) {
    transactionSRV.getChildTransactions(req.params.childID).then(child => {
        return res.send(child);
    });
});

router.get('/store/:storeID', function (req, res) {
    transactionSRV.getStoreTransactions(req.params.storeID).then(store => {
        return res.send(store);
    });
});



module.exports = router;