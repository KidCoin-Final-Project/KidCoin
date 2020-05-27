const express = require('express');
const router = express.Router();
const moneyTransferSRV = require('../services/moneyRequestSRV')
const middleware = require('../misc/middleware')

router.post('/childRequest', middleware.isUserChild, function (req, res) {
    moneyTransferSRV.newRequest(req, res);
});

router.get('/getAll', function (req, res) {
    moneyTransferSRV.allRequests(req, res);
});


module.exports = router;