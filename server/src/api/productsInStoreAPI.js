const express = require('express');
const router = express.Router();
const productsInStoreSRV = require('../services/productsInStoreSRV')
const middleware = require('../misc/middleware')

/**
 * get product price in store
 * @route get /productsInStore/getPricebyID
 * @group productsInStore api
 * @param {string} storeId.query.required 
 * @param {string} productId.query.required 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */

router.get('/getPricebyID', function (req, res) {
    productsInStoreSRV.getByPrice(req.query.storeId, req.query.productId).then(doc => {
        return res.send(doc);
    });
});

/**
 * get all products in store
 * @route get /productsInStore/getStoreProducts
 * @group productsInStore api
 * @param {string} storeId.query.required 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */

router.get('/getStoreProducts', function (req, res) {
    productsInStoreSRV.getByStoreId(req.query.storeId).then(doc => {
        return res.send(doc);
    });
});

/**
 * add product to store
 * @route post /productsInStore
 * @group productsInStore api
 * @param {string} storeId.query.required 
 * @param {string} productId.query.required 
 * @param {string} price.query.required 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', function (req, res) {
    productsInStoreSRV.addProduct(req.query.storeId, req.query.productId, req.query.price).then(doc => {
        return res.send(doc);
    });;
});



module.exports = router;