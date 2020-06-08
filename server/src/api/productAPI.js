const express = require('express');
const router = express.Router();
const productsSRV = require('../services/productsSRV')

router.get('/', function (req, res) {
    productsSRV.getAll().then(doc => {
        return res.send(doc);
    }); 
    
});

router.get('/byId/:productID', function (req, res) {
    productsSRV.getByID(req.params.productID).then(doc => {
        return res.send(doc);
    }); 
});

router.get('/byCategory/:category', function (req, res) {
    productsSRV.getByCategory(req.params.category).then(doc => {;
       return res.send(doc);
    });
});

module.exports = router;