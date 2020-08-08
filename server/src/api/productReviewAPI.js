const express = require('express');
const router = express.Router();
const productReviewSRV = require('../services/productReviewSRV')
const middleware = require('../misc/middleware')

/**
 * add product review
 * @route post /productReview
 * @group productReview api
 * @param {string} product.body.required - product's uid
 * @param {string} rating.body.required - rating
 * @param {string} comment.body - comment
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', middleware.isUserParent, function (req, res) {
    productReviewSRV.addReview(req, res);
});

/**
 * get product reviews
 * @route get /productReview
 * @group productReview api
 * @param {string} productId.url.required - product's uid
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/:productId', function (req, res) {
    productReviewSRV.getByProductId(req.params.productId).then(review => {
        return res.send(review);
    });
});

module.exports = router;