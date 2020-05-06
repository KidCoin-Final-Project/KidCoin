const express = require('express');
const router = express.Router();
const moneyTransferSRV = require('../services/moneyTransferSRV')

router.post('/childRequest', function (req, res) {
    moneyTransferSRV.requestMoneyFromParent(req, res);
});

module.exports = router;