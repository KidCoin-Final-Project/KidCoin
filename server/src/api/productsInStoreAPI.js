const express = require('express');
const router = express.Router();
const productsInStoreSRV = require('../services/productsInStoreSRV')


router.get('/getPricebyIDs', function (req, res) {
    productsInStoreSRV.getByPrice(req.query.storeId, req.query.productId).then(doc => {
        return res.send(doc);
    });
});

router.get('/getStoreProducts', function (req, res) {
    productsInStoreSRV.getByStoreId(req.query.storeId).then(doc => {
        return res.send(doc);
    });
});


/* router.get('/', function (req, res) {
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
}); */

module.exports = router;