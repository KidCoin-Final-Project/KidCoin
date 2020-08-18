const express = require('express');
const router = express.Router();
const productsSRV = require('../services/productsSRV')
const multer = require("multer");


const storage = multer.diskStorage({
    destination: "../pictures/",
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
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
    productsSRV.getByCategory(req.params.category).then(doc => {
       return res.send(doc);
    });
});


router.post('/addProduct', function (req, res) {
    productsSRV.addProduct(req, res);
});

router.post('/addImage', function (req, res) {
    upload(req, res, (err) => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        /*Now do where ever you want to do*/
        if(err)
            console.log(err);
    });
});

module.exports = router;