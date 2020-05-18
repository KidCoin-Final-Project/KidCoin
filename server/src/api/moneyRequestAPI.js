const express = require('express');
const router = express.Router();
const moneyTransferSRV = require('../services/moneyRequestSRV')

router.post('/childRequest', function (req, res) {
    moneyTransferSRV.newRequest(req, res);
});

module.exports = router;