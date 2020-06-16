const express = require('express');
const router = express.Router();
const purchaseSRV = require('../services/purchaseSRV')
const middleware = require('../misc/middleware')
const utils = require('../misc/utils')

router.get('/byChild/:childID', function (req, res) {
    purchaseSRV.getChildPurchases(req.params.childID).then(child => {
        return res.send(child);
    });
});

router.get('/byOwner/', middleware.isUserOwner, function (req, res) {
    purchaseSRV.getStorePurchases(req).then(store => {
        return res.send(store);
    });
});


router.get('/totalRevenue/', middleware.isUserOwner, function (req, res) {
    purchaseSRV.totalRevenue(req).then(revenue => {
        return res.send(revenue);
    });
});




router.get('/new/', middleware.isUserChild, function (req, res) {
    purchaseSRV.getStorePurchases(req).then(store => {
        return res.send(store);
    });
});



module.exports = router;