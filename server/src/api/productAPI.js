const express = require('express');
const router = express.Router();
const productsSRV = require('../services/productsSRV')

router.get('/', function (req, res) {
    var products = productsSRV.getAll(); 
    res.send("all products:" + products);

});

router.get('/:productID', function (req, res) {
    var products = productsSRV.getByID(req.params.productID);
    res.send(products);
});

module.exports = router;