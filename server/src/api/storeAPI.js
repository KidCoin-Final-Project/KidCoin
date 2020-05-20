const express = require('express');
const router = express.Router();
const storeSRV = require('../services/storeSRV')

router.get('/byName', function (req, res) {
    storeSRV.getByName(req, res).then(store => {
        return res.send(store);
    });
});
router.get('/byLocation', function (req, res) {
    storeSRV.getBylocation(req, res).then(store => {
        return res.send(store);
    });
});

router.post('/', function (req, res) {
    storeSRV.addStore(req, res);
});

module.exports = router;