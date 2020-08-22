const express = require('express');
const router = express.Router();
const productsSRV = require('../services/productsSRV')
const multer = require("multer");
const middleware = require('../misc/middleware')

const storage = multer.diskStorage({
    destination: "../../client/public/new-images/",
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000000},
}).single("myImage");

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
    productsSRV.getByCategory(req).then(doc => {
       return res.send(doc);
    });
});

/**
* get top 10 recommended items for child
* @route get /product/recommended
* @group product api
* @returns {object} 200 
* @returns {Error}  default - Unexpected error
*/
router.get('/recommended', middleware.isUserChild, function (req, res) {
    productsSRV.getTopTenRecommended(req);
    return res.send("ok");
});


router.post('/addProduct', function (req, res) {
    productsSRV.addProduct(req, res);
});

router.post('/addImage', function (req, res) {
    upload(req, res, (err) => {
        /*Now do where ever you want to do*/
        if(err) {
            console.log(err);
        } else {
            return res.send(200).end()
        }
    });
});

module.exports = router;