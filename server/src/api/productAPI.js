const express = require('express');
const router = express.Router();
const productsSRV = require('../services/productsSRV')


/**
 * get all available products
 * @route get /product
 * @group product api
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function (req, res) {
    productsSRV.getAll().then(doc => {
        return res.send(doc);
    }); 
    
});

/**
 * get product details by ID
 * @route get /product/byId
 * @group product api
 * @param {string} productID.query.required - request amount
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */

router.get('/byId/:productID', function (req, res) {
    productsSRV.getByID(req.params.productID).then(doc => {
        return res.send(doc);
    }); 
});

/**
 * get all products in category
 * @route get /product/byCategory
 * @group product api
 * @param {string} category.query.required - request amount
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/byCategory/:category', function (req, res) {
    productsSRV.getByCategory(req.params.category).then(doc => {;
       return res.send(doc);
    });
});


router.post('/addProduct', function (req, res) {
    productsSRV.addProduct(req, res);
});


module.exports = router;