const express = require('express');
const router = express.Router();
const childSRV = require('../services/childSRV')
const transactionSRV = require('../services/transactionSRV')

router.get('/:childID', function (req, res) {
    childSRV.getByID(req.params.childID).then(child => {
        return res.send(child);
    });
});

router.get('transaction/:childID', function (req, res) {
    transactionSRV.getChildTransactions(req.params.childID).then(child => {
        return res.send(child);
    });
});

module.exports = router;