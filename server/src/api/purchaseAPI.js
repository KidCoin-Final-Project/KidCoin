const express = require('express');
const router = express.Router();
const purchaseSRV = require('../services/purchaseSRV')
const middleware = require('../misc/middleware')
const utils = require('../misc/utils')

/**
 * get the child purchases by id (only for parent)
 * @route get /purchases/byChild/:childID
 * @group purchases api
 * @param {string} childID.url.required - child's uid 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/byChild/:childID', middleware.isChildOfParent, function (req, res) {
    purchaseSRV.getChildPurchases(req.params.childID).then(child => {
        return res.send(child);
    });
});

/**
 * get the store purchases by id (only for owner) - store is taken from user, user is taken from token.
 * @group purchases api
 * @param {string} childID.url.required - store's uid 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/ofStore/', middleware.isUserOwner, function (req, res) {
    purchaseSRV.getStorePurchases(req).then(store => {
        return res.send(store);
    });
});

/**
 * get the child purchases by id (only for child) - child get his/hers own purchases
 * @group purchases api
 * @param {string} childID.url.required - child's uid 
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/ofChild/', middleware.isUserChild, async function (req, res) {
    childId = await utils.getIdByToken(req.headers.authtoken)
    purchaseSRV.getChildPurchases(childId).then(child => {
        return res.send(child);
    });
});

router.get('/totalRevenue/', middleware.isUserOwner, function (req, res) {
    purchaseSRV.totalRevenue(req).then(revenue => {
        return res.send(revenue);
    });
});




router.post('/new/', middleware.isUserChild, function (req, res) {
    
});



module.exports = router;